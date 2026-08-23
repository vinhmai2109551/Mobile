// Bài 4: Tạo class Rectangle với width và height. Viết method tính diện tích và chu vi.

class Rectangle {
  // Chiều rộng hình chữ nhật
  width: number;
  // Chiều cao hình chữ nhật
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  // Method tính diện tích = rộng * cao, trả về kiểu number
  area(): number {
    return this.width * this.height;
  }

  // Method tính chu vi = 2 * (rộng + cao), trả về kiểu number
  perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

// Tạo đối tượng Rectangle với rộng = 5, cao = 3
const rect1 = new Rectangle(5, 3);
// In kết quả diện tích bằng cách gọi method area()
console.log(`Diện tích: ${rect1.area()}`);
// In kết quả chu vi bằng cách gọi method perimeter()
console.log(`Chu vi: ${rect1.perimeter()}`);

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
