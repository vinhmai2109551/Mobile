// 16. Create a generic class Box that can store any type of value.
// Bài 16: Tạo generic class Box có thể chứa bất kỳ kiểu dữ liệu nào.

// <T> là một "tham số kiểu dữ liệu" (generic type parameter), đóng vai trò như biến nhưng cho KIỂU DỮ LIỆU
// Khi sử dụng class Box, ta sẽ chỉ định T là kiểu gì (ví dụ Box<number>, Box<string>...)
class Box<T> {
  // contents có kiểu dữ liệu là T -> sẽ được xác định cụ thể khi tạo đối tượng
  private contents: T;

  constructor(value: T) {
    this.contents = value;
  }

  // Method lấy giá trị ra, kiểu trả về cũng là T
  getValue(): T {
    return this.contents;
  }

  // Method thay đổi giá trị bên trong, tham số phải cùng kiểu T
  setValue(value: T): void {
    this.contents = value;
  }
}

// Tạo Box chứa số (number) -> T được TypeScript tự suy ra (infer) là number
const numberBox = new Box<number>(123);
console.log(`Box số: ${numberBox.getValue()}`);

// Tạo Box chứa chuỗi (string) -> T là string
const stringBox = new Box<string>("Xin chào");
console.log(`Box chuỗi: ${stringBox.getValue()}`);

// Tạo Box chứa mảng số
const arrayBox = new Box<number[]>([1, 2, 3]);
console.log(`Box mảng: ${arrayBox.getValue()}`);
// Thay đổi giá trị bên trong box
arrayBox.setValue([4, 5, 6]);
console.log(`Box mảng sau khi đổi: ${arrayBox.getValue()}`);

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
