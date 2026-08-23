// Bài 1: Tạo class Person với thuộc tính name và age. Viết method để hiển thị thông tin này.

class Person {
  // Thuộc tính name kiểu string, lưu tên của người
  name: string;
  // Thuộc tính age kiểu number, lưu tuổi của người
  age: number;

  // Constructor được gọi tự động khi tạo đối tượng mới bằng "new Person(...)"
  constructor(name: string, age: number) {
    // Gán giá trị tham số name vào thuộc tính name của đối tượng hiện tại (this)
    this.name = name;
    // Gán giá trị tham số age vào thuộc tính age của đối tượng hiện tại (this)
    this.age = age;
  }

  // Method displayInfo dùng để in thông tin ra console, không trả về giá trị (void)
  displayInfo(): void {
    // In ra chuỗi kết hợp tên và tuổi bằng template string (dấu backtick)
    console.log(`Tên: ${this.name} - Tuổi: ${this.age}`);
  }
}

// Tạo đối tượng p1 từ class Person với tên "Mai Lưu Hữu Vinh" và tuổi 22
const p1 = new Person("Mai Lưu Hữu Vinh", 22);
// Gọi method displayInfo() để in thông tin đối tượng p1 ra màn hình
p1.displayInfo();

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
