// Bài 18: Tạo static class MathUtil với các method add(), subtract(), multiply(), divide().

// TypeScript không có "static class" riêng như C#, ta mô phỏng bằng cách
// khai báo TẤT CẢ các method đều là static, và không bao giờ cần "new MathUtil()"
class MathUtil {
  // static method: gọi trực tiếp qua tên class (MathUtil.add(...)), không cần tạo đối tượng
  static add(a: number, b: number): number {
    return a + b;
  }

  static subtract(a: number, b: number): number {
    return a - b;
  }

  static multiply(a: number, b: number): number {
    return a * b;
  }

  // Method chia, cần kiểm tra chia cho 0
  static divide(a: number, b: number): number {
    // Nếu số chia bằng 0 thì ném ra lỗi (throw Error) vì không thể chia cho 0
    if (b === 0) {
      throw new Error("Không thể chia cho 0");
    }
    return a / b;
  }
}

// Gọi các method trực tiếp từ tên class, không cần "new"
console.log(`Cộng: ${MathUtil.add(10, 5)}`);
console.log(`Trừ: ${MathUtil.subtract(10, 5)}`);
console.log(`Nhân: ${MathUtil.multiply(10, 5)}`);
console.log(`Chia: ${MathUtil.divide(10, 5)}`);

// try/catch để bắt lỗi khi chia cho 0 mà không làm sập chương trình
try {
  MathUtil.divide(10, 0);
} catch (error) {
  // error có thể là kiểu unknown trong TypeScript nên cần ép kiểu hoặc kiểm tra trước khi dùng
  console.log(`Lỗi: ${(error as Error).message}`);
}

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
