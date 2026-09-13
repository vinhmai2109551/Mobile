// Bài 16: Generic class Box có thể chứa bất kỳ kiểu dữ liệu nào.

class Box<T> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

const numberBox = new Box<number>(10);
const stringBox = new Box<string>("Hello");

console.log("numberBox:", numberBox.getValue());
console.log("stringBox:", stringBox.getValue());

numberBox.setValue(20);
console.log("numberBox sau khi đổi:", numberBox.getValue());

export {};
