// Bài 11: Base class Animal. Dog và Cat kế thừa, thêm method bark()/meow().

class Animal {
  constructor(public name: string) {}
}

class Dog extends Animal {
  bark(): void {
    console.log(`${this.name}: Gâu gâu!`);
  }
}

class Cat extends Animal {
  meow(): void {
    console.log(`${this.name}: Meo meo!`);
  }
}

const dog = new Dog("Milo");
const cat = new Cat("Kitty");
dog.bark();
cat.meow();

export {};
