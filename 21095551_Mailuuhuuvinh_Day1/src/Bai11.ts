// Bài 11: Tạo base class Animal. Kế thừa Dog và Cat với method bark() và meow().

class Animal {
  // Tên con vật, dùng chung cho mọi lớp con
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

// Dog kế thừa Animal, có thêm method riêng bark()
class Dog extends Animal {
  // Method riêng của Dog, không có trong lớp cha Animal
  bark(): void {
    console.log(`${this.name} sủa: Gâu gâu!`);
  }
}

// Cat kế thừa Animal, có thêm method riêng meow()
class Cat extends Animal {
  // Method riêng của Cat, không có trong lớp cha Animal
  meow(): void {
    console.log(`${this.name} kêu: Meo meo!`);
  }
}

// Tạo đối tượng Dog, tên được truyền qua constructor của Animal (kế thừa)
const dog1 = new Dog("Lu");
// Gọi method riêng của Dog
dog1.bark();

// Tạo đối tượng Cat
const cat1 = new Cat("Miu");
// Gọi method riêng của Cat
cat1.meow();

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
