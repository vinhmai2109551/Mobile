// 12. Define interfaces Flyable and Swimmable. Implement them in Bird and Fish classes.
// Bài 12: Định nghĩa interface Flyable và Swimmable. Thực thi chúng trong class Bird và Fish.

// Interface mô tả khả năng bay
interface Flyable {
  // Method bay, không trả về giá trị
  fly(): void;
}

// Interface mô tả khả năng bơi
interface Swimmable {
  // Method bơi, không trả về giá trị
  swim(): void;
}

// Bird chỉ thực thi (implements) Flyable vì chim chỉ biết bay
class Bird implements Flyable {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Bắt buộc phải hiện thực method fly() vì đã khai báo implements Flyable
  fly(): void {
    console.log(`${this.name} đang bay trên trời`);
  }
}

// Fish chỉ thực thi Swimmable vì cá chỉ biết bơi
class Fish implements Swimmable {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Bắt buộc phải hiện thực method swim() vì đã khai báo implements Swimmable
  swim(): void {
    console.log(`${this.name} đang bơi dưới nước`);
  }
}

// Vịt (Duck) có thể thực thi CẢ HAI interface cùng lúc, cách nhau bởi dấu phẩy
class Duck implements Flyable, Swimmable {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  fly(): void {
    console.log(`${this.name} đang bay`);
  }

  swim(): void {
    console.log(`${this.name} đang bơi`);
  }
}

// Tạo và sử dụng các đối tượng
const bird1 = new Bird("Chim sẻ");
bird1.fly();

const fish1 = new Fish("Cá vàng");
fish1.swim();

const duck1 = new Duck("Vịt con");
// Vịt có thể gọi cả 2 method vì thực thi cả 2 interface
duck1.fly();
duck1.swim();

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
