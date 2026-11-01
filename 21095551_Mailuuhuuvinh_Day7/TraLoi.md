# Trả lời câu hỏi bổ sung — Buổi 7 (BookStore)

MSSV: 21095551 · Họ tên: Mai Lưu Hữu Vinh

## 1. Cấu trúc điều hướng

BookDetail nằm ở Stack vì đây là màn "đi sâu" từ một tab: Stack đẩy màn mới phủ lên cả Tab Navigator nên Tab Bar bị che, đồng thời tự có header với nút ← và cử chỉ quay lại, bấm ← là về đúng tab cũ với vị trí cuộn được giữ nguyên. Nếu đặt BookDetail trong Tab thì nó thành một tab ngang hàng với Home, Danh mục...: Tab Bar vẫn hiện, không có nút ← nên người dùng chỉ chuyển qua tab khác chứ không "quay lại" được. Ngoài ra Tab chỉ có một màn Chi tiết duy nhất, không xếp chồng được nhiều lớp như Stack.

## 2. Redux

Redux Toolkit dùng Immer: `state` trong reducer thực chất là một bản nháp (draft), nên `state.items.push(...)` chỉ ghi lại thay đổi trên bản nháp. Sau khi reducer chạy xong, Immer tạo ra một state mới (phần không đổi được dùng chung), còn state gốc vẫn y nguyên. Khi bỏ `useMemo` trong `useCart`, kết quả hiển thị không đổi vì `totalQuantity` và `totalPrice` vẫn được tính đúng từ `items`. Hậu quả chỉ là hiệu năng: mỗi lần component render lại đều chạy lại `reduce`, giỏ lớn mới thấy chậm, nên `useMemo` chỉ để tối ưu chứ không quyết định đúng hay sai.

## 3. Promise.all

Nếu `getCategories()` lỗi còn `getBooks()` thành công thì `Promise.all` bị reject ngay, nên khối `catch` chạy, Home hiện `ErrorView` kèm nút Thử lại và bỏ luôn danh sách sách đã tải được. Dùng `Promise.allSettled` thì từng request có kết quả riêng: nếu sách thành công thì vẫn hiện lưới sách và chỉ thiếu hàng chip danh mục. Cái giá phải trả là phải tự xét `status` của từng kết quả, tự quyết định request nào bắt buộc (sách) và request nào chỉ là phụ (danh mục), và màn hình ở trạng thái "thành công một phần" nên người dùng không biết dữ liệu bị thiếu nếu ta không báo thêm.

## 4. Debounce

Nếu đặt `setTimeout` thẳng trong `onChangeText` thì mỗi phím gõ tạo một hẹn giờ riêng và không cái nào bị huỷ, nên gõ 10 ký tự vẫn gây 10 lần lọc (chỉ trễ đi 400 ms chứ không gộp lại). Với `useEffect`, React gọi hàm dọn dẹp `return () => clearTimeout(t)` của lần trước trước khi chạy effect mới, nên chỉ hẹn giờ của lần gõ cuối cùng được áp dụng. Hàm dọn dẹp cũng chạy khi component bị gỡ (unmount), tránh lỗi cập nhật state trên màn hình đã đóng và tránh hẹn giờ chạy muộn gây ra kết quả cũ.

## 5. Code bổ sung — sắp xếp giá tăng dần / giảm dần

Thêm một state `sort` (`"asc" | "desc" | null`) trong `HomeScreen`, và sửa đúng một chỗ trong `visibleBooks`: sau khi lọc xong thì sắp xếp trên **bản sao** để không làm đổi mảng `books` gốc. Phần giao diện là hai nút `SortBar` ("Giá tăng dần ↑", "Giá giảm dần ↓"), bấm lại nút đang chọn để bỏ sắp xếp.

```tsx
// HomeScreen.tsx
const [sort, setSort] = useState<SortOrder>(null);

const visibleBooks = useMemo(() => {
  const filtered = filterBooks(books, { keyword: effectiveKeyword, categoryId, priceRange });
  if (sort === null) return filtered; // không chọn thì giữ thứ tự gốc
  // [...filtered] tạo bản sao vì sort() làm đổi mảng tại chỗ
  return [...filtered].sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));
}, [books, effectiveKeyword, categoryId, priceRange, sort]);
```

Ảnh kết quả (Giá tăng dần: Dế Mèn 65.000 đ đứng đầu, rồi Hoàng Tử Bé 72.000 đ, Nhà Giả Kim 79.000 đ):

![Sắp xếp giá tăng dần](screenshots/07-sap-xep-gia-tang-dan.png)
