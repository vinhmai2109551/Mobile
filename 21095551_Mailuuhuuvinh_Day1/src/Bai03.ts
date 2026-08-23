// Bài 3: Tạo class Car với thuộc tính brand, model, year. Viết method để hiển thị thông tin xe.

class Car {
  // Hãng xe, ví dụ: Toyota
  brand: string;
  // Đời xe/model, ví dụ: Vios
  model: string;
  // Năm sản xuất
  year: number;

  constructor(brand: string, model: string, year: number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  // Method showInfo in thông tin xe ra console
  showInfo(): void {
    console.log(`Xe: ${this.brand} ${this.model} - Năm sản xuất: ${this.year}`);
  }
}

// Tạo đối tượng Car với các thông tin cụ thể
const car1 = new Car("Toyota", "Vios", 2022);
// Gọi method showInfo() để hiển thị thông tin xe
car1.showInfo();

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
