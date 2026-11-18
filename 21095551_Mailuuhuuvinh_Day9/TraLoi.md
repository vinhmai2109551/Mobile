# Trả lời câu hỏi bổ sung — Buổi 9

MSSV: 21095551 · Họ tên: Mai Lưu Hữu Vinh

## 1. Giá trị dẫn xuất

`errors` và `valid` được tính trực tiếp từ state vì chúng luôn là kết quả hiện tại của các ô nhập và giỏ hàng. Nếu lưu thêm bằng `useState`, state dẫn xuất có thể bị trễ hoặc không đồng bộ khi một ô nhập, tài khoản hay giỏ thay đổi.

## 2. Thứ tự gọi

Nếu gọi `clear()` trước `await createOrder()`, lỗi mạng sẽ làm giỏ bị xoá dù đơn chưa được tạo, khiến người dùng mất dữ liệu. Đặt `clear()` ngay sau khi API thành công bảo đảm chỉ xoá giỏ khi server đã nhận đơn.

## 3. PUT hay PATCH

`PUT /users/1` với chỉ `{ name, phone }` có thể thay toàn bộ bản ghi và làm mất email, mật khẩu hoặc các trường khác. `PATCH` chỉ cập nhật hai trường cần sửa nên an toàn hơn và giữ nguyên dữ liệu còn lại.

## 4. Cập nhật lạc quan

Nếu không hoàn lại `read: false` khi `markAsRead` thất bại, giao diện sẽ hiển thị đã đọc nhưng server vẫn chưa lưu, nên trạng thái sai khi tải lại. Cách này phù hợp với thao tác yêu thích hoặc đánh dấu đọc; không nên dùng cho thanh toán vì phải đợi server xác nhận trước khi xoá giỏ hay báo thành công.

## 5. Code bổ sung — lọc trạng thái đơn hàng

Màn `OrdersScreen` giữ state bộ lọc và truyền dữ liệu đã lọc cho `FlatList`:

```tsx
const [status, setStatus] = useState<OrderStatus | "all">("all");
const visibleOrders = status === "all"
  ? orders
  : orders.filter((order) => order.status === status);

<FlatList data={visibleOrders} ... />
```

Đã triển khai các nút `Tất cả`, `Chờ xác nhận`, `Đang giao`, `Hoàn tất`, `Đã huỷ` trong `OrdersScreen`; mỗi nút gọi `setStatus` tương ứng.
