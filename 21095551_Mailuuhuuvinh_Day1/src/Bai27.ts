// Bài 27: Tạo class Teacher kế thừa Person. Thêm thuộc tính subject và method introduce.

class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  displayInfo(): void {
    console.log(`Tên: ${this.name} - Tuổi: ${this.age}`);
  }
}

// Teacher kế thừa Person, thêm thuộc tính subject (môn dạy)
class Teacher extends Person {
  // Môn học mà giáo viên này giảng dạy
  subject: string;

  constructor(name: string, age: number, subject: string) {
    // Gọi constructor cha để khởi tạo name và age
    super(name, age);
    this.subject = subject;
  }

  // Method riêng của Teacher: tự giới thiệu bản thân
  introduce(): void {
    console.log(
      `Xin chào, tôi tên là ${this.name}, ${this.age} tuổi, tôi dạy môn ${this.subject}.`
    );
  }
}

// Tạo đối tượng Teacher
const teacher1 = new Teacher("Mai Lưu Hữu Vinh", 22, "Lập trình TypeScript");
// Gọi method kế thừa từ Person
teacher1.displayInfo();
// Gọi method riêng của Teacher
teacher1.introduce();

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
