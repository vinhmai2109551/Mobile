// Bài 25: Class Shape có static method describe().

class Shape {
  static describe(): void {
    console.log("Shape là hình học tổng quát, có diện tích và chu vi");
  }
}

// Gọi thẳng qua tên class, không cần tạo instance
Shape.describe();

export {};
