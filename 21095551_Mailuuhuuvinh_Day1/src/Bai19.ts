// Bài 19: Method overriding + polymorphism với Animal và các lớp con.

class Animal {
  makeSound(): void {
    console.log("Con vật kêu...");
  }
}

class Dog extends Animal {
  // override lại method của lớp cha
  makeSound(): void {
    console.log("Gâu gâu!");
  }
}

class Cat extends Animal {
  makeSound(): void {
    console.log("Meo meo!");
  }
}

// Polymorphism: cùng khai báo kiểu Animal, nhưng gọi makeSound() sẽ chạy
// đúng phiên bản override của từng con vật thực tế bên trong mảng.
const animals: Animal[] = [new Animal(), new Dog(), new Cat()];
animals.forEach((a) => a.makeSound());

export {};
