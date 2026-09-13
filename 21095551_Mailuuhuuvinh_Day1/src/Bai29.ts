// Bài 29: Interface Movable có move(). Car và Robot implement.

interface Movable {
  move(): void;
}

class Car implements Movable {
  move(): void {
    console.log("Xe hơi di chuyển bằng bánh xe");
  }
}

class Robot implements Movable {
  move(): void {
    console.log("Robot di chuyển bằng chân/động cơ");
  }
}

const items: Movable[] = [new Car(), new Robot()];
items.forEach((item) => item.move());

export {};
