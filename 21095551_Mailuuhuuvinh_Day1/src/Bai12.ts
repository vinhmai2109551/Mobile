// Bài 12: Interface Flyable, Swimmable. Bird implement Flyable, Fish implement Swimmable.

interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

class Bird implements Flyable {
  fly(): void {
    console.log("Chim đang bay");
  }
}

class Fish implements Swimmable {
  swim(): void {
    console.log("Cá đang bơi");
  }
}

// Vịt vừa bay vừa bơi -> implement cả 2 interface cùng lúc
class Duck implements Flyable, Swimmable {
  fly(): void {
    console.log("Vịt đang bay");
  }
  swim(): void {
    console.log("Vịt đang bơi");
  }
}

new Bird().fly();
new Fish().swim();
const duck = new Duck();
duck.fly();
duck.swim();

export {};
