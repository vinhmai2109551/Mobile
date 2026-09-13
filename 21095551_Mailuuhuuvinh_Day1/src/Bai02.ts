// Bài 2: Class Student kế thừa Person, thêm grade. Method hiển thị đầy đủ thông tin.

class Person {
  constructor(public name: string, public age: number) {}
}

// Student kế thừa Person -> có sẵn name, age, thêm grade
class Student extends Person {
  constructor(name: string, age: number, public grade: string) {
    super(name, age); // gọi constructor của lớp cha
  }

  displayAll(): void {
    console.log(`Tên: ${this.name} - Tuổi: ${this.age} - Lớp: ${this.grade}`);
  }
}

const s1 = new Student("Vinh", 22, "K18");
s1.displayAll();

export {};
