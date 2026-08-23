// Bài 30: Tạo class School với danh sách Student và Teacher. Thêm method hiển thị thông tin.

class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// Student kế thừa Person, thêm thuộc tính grade
class Student extends Person {
  grade: number;

  constructor(name: string, age: number, grade: number) {
    super(name, age);
    this.grade = grade;
  }
}

// Teacher kế thừa Person, thêm thuộc tính subject
class Teacher extends Person {
  subject: string;

  constructor(name: string, age: number, subject: string) {
    super(name, age);
    this.subject = subject;
  }
}

class School {
  // Tên trường học
  name: string;
  // Danh sách học sinh trong trường
  students: Student[];
  // Danh sách giáo viên trong trường
  teachers: Teacher[];

  constructor(name: string) {
    this.name = name;
    // Khởi tạo 2 mảng rỗng khi tạo trường mới
    this.students = [];
    this.teachers = [];
  }

  // Method thêm một học sinh vào trường
  addStudent(student: Student): void {
    this.students.push(student);
  }

  // Method thêm một giáo viên vào trường
  addTeacher(teacher: Teacher): void {
    this.teachers.push(teacher);
  }

  // Method hiển thị toàn bộ thông tin của trường: tên trường, danh sách học sinh và giáo viên
  displayInfo(): void {
    console.log(`=== Trường: ${this.name} ===`);

    console.log("Danh sách giáo viên:");
    // Duyệt qua mảng teachers và in thông tin từng giáo viên
    this.teachers.forEach((t) => {
      console.log(`- ${t.name} (${t.age} tuổi) - Dạy môn: ${t.subject}`);
    });

    console.log("Danh sách học sinh:");
    // Duyệt qua mảng students và in thông tin từng học sinh
    this.students.forEach((s) => {
      console.log(`- ${s.name} (${s.age} tuổi) - Điểm: ${s.grade}`);
    });
  }
}

// Tạo trường học mới
const school1 = new School("THPT Nguyễn Trãi");

// Thêm giáo viên vào trường
school1.addTeacher(new Teacher("Mai Lưu Hữu Vinh", 22, "Lập trình TypeScript"));
school1.addTeacher(new Teacher("Phạm Văn H", 40, "Văn"));

// Thêm học sinh vào trường
school1.addStudent(new Student("Nguyễn Văn A", 17, 8.5));
school1.addStudent(new Student("Trần Thị B", 16, 9.0));

// Hiển thị toàn bộ thông tin của trường
school1.displayInfo();

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
