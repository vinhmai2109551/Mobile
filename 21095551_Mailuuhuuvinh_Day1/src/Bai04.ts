// Bài 4: Class Rectangle có width, height. Method tính diện tích và chu vi.

class Rectangle {
  constructor(public width: number, public height: number) {}

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return (this.width + this.height) * 2;
  }
}

const rect = new Rectangle(5, 3);
console.log("Diện tích:", rect.area());
console.log("Chu vi:", rect.perimeter());

export {};
