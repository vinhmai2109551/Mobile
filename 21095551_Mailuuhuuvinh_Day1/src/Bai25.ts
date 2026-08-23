// Bài 25: Tạo class Shape với một static method describe().

class Shape {
  // Thuộc tính instance thông thường, mỗi đối tượng Shape có giá trị riêng
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // static method: thuộc về chính CLASS Shape chứ không thuộc về từng đối tượng cụ thể
  // có thể gọi trực tiếp bằng Shape.describe() mà KHÔNG cần tạo đối tượng nào cả
  static describe(): string {
    return "Shape là một lớp mô tả các hình học có diện tích và chu vi";
  }
}

// Gọi static method trực tiếp qua tên class, không cần "new Shape()"
console.log(Shape.describe());

// Vẫn có thể tạo đối tượng Shape bình thường để dùng các thuộc tính/method khác (nếu có)
const shape1 = new Shape("Hình tròn");
console.log(`Tên hình: ${shape1.name}`);

// Lưu ý: KHÔNG THỂ gọi static method thông qua đối tượng, ví dụ shape1.describe() sẽ báo lỗi
// vì describe() chỉ tồn tại ở cấp độ class, không tồn tại ở cấp độ instance

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
