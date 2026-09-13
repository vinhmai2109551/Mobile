// Bài 1: Class Person có name, age. Viết method hiển thị thông tin.

class Person {
  constructor(public name: string, public age: number) {}

  // In thông tin ra console
  display(): void {
    console.log(`Tên: ${this.name} - Tuổi: ${this.age}`);
  }
}

const p1 = new Person("Vinh", 22);
p1.display();

export {};
