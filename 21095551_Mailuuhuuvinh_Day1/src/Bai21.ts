// 21. Create a generic Repository class with methods add(), getAll().
// Bài 21: Tạo generic class Repository với method add() và getAll().

// Repository<T> mô phỏng một "kho lưu trữ" cho bất kỳ loại dữ liệu T nào (Product, User, Book,...)
class Repository<T> {
  // Mảng nội bộ lưu trữ các phần tử kiểu T, private để bảo vệ dữ liệu bên trong
  private items: T[] = [];

  // Method thêm một phần tử kiểu T vào kho lưu trữ
  add(item: T): void {
    this.items.push(item);
  }

  // Method lấy toàn bộ danh sách phần tử hiện có
  // Trả về một BẢN SAO của mảng (dùng spread operator [...]) để tránh code bên ngoài
  // sửa trực tiếp vào mảng nội bộ items
  getAll(): T[] {
    return [...this.items];
  }

  // Method phụ: đếm số lượng phần tử hiện có
  count(): number {
    return this.items.length;
  }
}

// Ví dụ dùng Repository với kiểu dữ liệu là string
const nameRepo = new Repository<string>();
nameRepo.add("Mai Lưu Hữu Vinh");
nameRepo.add("Trần Thị B");
console.log("Danh sách tên:", nameRepo.getAll());

// Định nghĩa một kiểu dữ liệu Product đơn giản để ví dụ
interface Product {
  name: string;
  price: number;
}

// Ví dụ dùng Repository với kiểu dữ liệu là Product
const productRepo = new Repository<Product>();
productRepo.add({ name: "Bàn phím", price: 150 });
productRepo.add({ name: "Chuột", price: 80 });
console.log("Danh sách sản phẩm:", productRepo.getAll());
console.log(`Số lượng sản phẩm: ${productRepo.count()}`);

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
