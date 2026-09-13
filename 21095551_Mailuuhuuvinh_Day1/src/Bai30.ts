// Bài 30: Class School lưu danh sách Student và Teacher. Method hiển thị thông tin.

class Student {
  constructor(public name: string) {}
}

class Teacher {
  constructor(public name: string) {}
}

class School {
  private students: Student[] = [];
  private teachers: Teacher[] = [];

  addStudent(student: Student): void {
    this.students.push(student);
  }

  addTeacher(teacher: Teacher): void {
    this.teachers.push(teacher);
  }

  displayInfo(): void {
    console.log("Học sinh:", this.students.map((s) => s.name));
    console.log("Giáo viên:", this.teachers.map((t) => t.name));
  }
}

const school = new School();
school.addStudent(new Student("Vinh"));
school.addStudent(new Student("An"));
school.addTeacher(new Teacher("Cô Lan"));
school.displayInfo();

export {};
