// Bài 3: Class Car có brand, model, year. Method hiển thị thông tin xe.

class Car {
  constructor(public brand: string, public model: string, public year: number) {}

  showInfo(): void {
    console.log(`${this.brand} ${this.model} (${this.year})`);
  }
}

const car1 = new Car("Toyota", "Vios", 2023);
car1.showInfo();

export {};
