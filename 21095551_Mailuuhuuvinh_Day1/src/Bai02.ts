// 2. Write a class Student extending Person with an additional attribute grade. Add a method to display all info.
// Bài 2: Viết class Student kế thừa Person, thêm thuộc tính grade. Thêm method hiển thị toàn bộ thông tin.

class Person {
  // Thuộc tính name kiểu string
  name: string;
  // Thuộc tính age kiểu number
  age: number;

  constructor(name: string, age: number) {
    // Gán tham số vào thuộc tính của đối tượng
    this.name = name;
    this.age = age;
  }

  // Method hiển thị thông tin cơ bản của Person
  displayInfo(): void {
    console.log(`Tên: ${this.name} - Tuổi: ${this.age}`);
  }
}

// class Student kế thừa (extends) từ class Person, có thêm thuộc tính grade
class Student extends Person {
  // Thuộc tính riêng của Student, lưu điểm/học lực
  grade: number;

  constructor(name: string, age: number, grade: number) {
    // Gọi constructor của class cha (Person) để khởi tạo name và age
    super(name, age);
    // Gán thêm thuộc tính grade riêng của Student
    this.grade = grade;
  }

  // Ghi đè (override) method displayInfo để hiển thị đầy đủ thông tin cả Person lẫn Student
  displayInfo(): void {
    // Gọi lại method displayInfo của lớp cha bằng từ khóa super để tái sử dụng code
    super.displayInfo();
    // In thêm thông tin điểm của Student
    console.log(`Điểm: ${this.grade}`);
  }
}

// Tạo đối tượng Student
const s1 = new Student("Mai Lưu Hữu Vinh", 22, 8.5);
// Gọi method displayInfo() đã được ghi đè, in cả tên/tuổi và điểm
s1.displayInfo();

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
