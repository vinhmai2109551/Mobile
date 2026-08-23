// 13. Create an abstract class Shape with method area(). Implement Square and Circle.
// Bài 13: Tạo abstract class Shape với method area(). Hiện thực Square và Circle.

// abstract class: không thể tạo trực tiếp đối tượng từ class này (không thể "new Shape()")
// chỉ dùng để làm lớp cha cho các lớp con kế thừa
abstract class Shape {
  // abstract method: chỉ khai báo chữ ký (không có thân hàm),
  // bắt buộc MỌI lớp con kế thừa phải tự hiện thực method này
  abstract area(): number;

  // Method bình thường (không abstract) vẫn có sẵn trong lớp cha,
  // các lớp con kế thừa sẽ dùng chung method này
  describe(): void {
    // this.area() sẽ gọi đến phiên bản area() của lớp con cụ thể (Square hoặc Circle)
    console.log(`Diện tích hình là: ${this.area().toFixed(2)}`);
  }
}

// Square kế thừa Shape và BẮT BUỘC phải hiện thực method area()
class Square extends Shape {
  side: number;

  constructor(side: number) {
    // Gọi constructor lớp cha (Shape không có constructor riêng nhưng vẫn nên gọi super())
    super();
    this.side = side;
  }

  // Hiện thực area() theo công thức diện tích hình vuông = cạnh * cạnh
  area(): number {
    return this.side * this.side;
  }
}

// Circle kế thừa Shape và BẮT BUỘC phải hiện thực method area()
class Circle extends Shape {
  radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  // Hiện thực area() theo công thức diện tích hình tròn = PI * bán_kính^2
  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

// Tạo đối tượng Square và gọi describe() (dùng method chung từ lớp cha)
const square1 = new Square(4);
square1.describe();

// Tạo đối tượng Circle và gọi describe()
const circle1 = new Circle(3);
circle1.describe();

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
