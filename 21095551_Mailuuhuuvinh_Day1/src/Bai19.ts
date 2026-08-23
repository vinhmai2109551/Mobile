// 19. Demonstrate method overriding using polymorphism with Animal and subclasses.
// Bài 19: Minh họa method overriding và tính đa hình (polymorphism) với Animal và các lớp con.

class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Method makeSound() ở lớp cha, sẽ bị các lớp con GHI ĐÈ (override)
  makeSound(): void {
    console.log(`${this.name} phát ra một âm thanh nào đó`);
  }
}

// Dog ghi đè (override) lại method makeSound() của lớp cha
class Dog extends Animal {
  makeSound(): void {
    console.log(`${this.name} sủa: Gâu gâu!`);
  }
}

// Cat cũng ghi đè lại method makeSound() theo cách riêng của nó
class Cat extends Animal {
  makeSound(): void {
    console.log(`${this.name} kêu: Meo meo!`);
  }
}

// Tạo một mảng có kiểu là Animal[] nhưng chứa cả đối tượng Dog và Cat
// Đây chính là tính ĐA HÌNH: cùng một kiểu Animal nhưng hành vi thực tế khác nhau
const animals: Animal[] = [
  new Animal("Con vật không xác định"),
  new Dog("Lu"),
  new Cat("Miu"),
];

// Duyệt qua từng phần tử và gọi makeSound()
// TypeScript/JavaScript sẽ tự động gọi ĐÚNG phiên bản makeSound() của từng đối tượng thực tế
// (gọi là "dynamic dispatch" / "liên kết động") mà không cần biết trước nó là Dog hay Cat
animals.forEach((animal) => {
  animal.makeSound();
});

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
