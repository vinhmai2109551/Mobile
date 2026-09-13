// Bài 20: Interface Vehicle, implement trong Car và Bike.

interface Vehicle {
  move(): void;
}

class Car implements Vehicle {
  move(): void {
    console.log("Ô tô đang chạy trên đường");
  }
}

class Bike implements Vehicle {
  move(): void {
    console.log("Xe đạp đang đạp trên đường");
  }
}

const vehicles: Vehicle[] = [new Car(), new Bike()];
vehicles.forEach((v) => v.move());

export {};
