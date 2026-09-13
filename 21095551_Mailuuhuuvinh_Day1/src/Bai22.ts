// Bài 22: Class Stack với push, pop, peek, isEmpty.

class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  // lấy ra và xóa phần tử trên cùng
  pop(): T | undefined {
    return this.items.pop();
  }

  // xem phần tử trên cùng nhưng không xóa
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);
console.log("Peek:", stack.peek());
console.log("Pop:", stack.pop());
console.log("Peek sau khi pop:", stack.peek());
console.log("isEmpty:", stack.isEmpty());

export {};
