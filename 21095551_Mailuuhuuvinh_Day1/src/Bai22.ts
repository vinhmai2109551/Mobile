// 22. Create a class Stack with push, pop, peek, isEmpty methods.
// Bài 22: Tạo class Stack với các method push, pop, peek, isEmpty.

// Stack (ngăn xếp) hoạt động theo nguyên tắc LIFO: Last In First Out
// (phần tử vào sau cùng sẽ được lấy ra đầu tiên)
class Stack<T> {
  // Mảng nội bộ lưu các phần tử trong stack
  private items: T[] = [];

  // Thêm một phần tử lên ĐỈNH stack (cuối mảng)
  push(item: T): void {
    this.items.push(item);
  }

  // Lấy và XÓA phần tử trên đỉnh stack ra khỏi stack
  // Kiểu trả về là "T | undefined" vì stack có thể rỗng, không có gì để lấy
  pop(): T | undefined {
    // pop() của mảng có sẵn sẽ tự xóa và trả về phần tử cuối cùng
    return this.items.pop();
  }

  // Xem phần tử trên đỉnh stack MÀ KHÔNG XÓA nó
  peek(): T | undefined {
    // Truy cập phần tử cuối cùng bằng chỉ số [độ dài - 1]
    return this.items[this.items.length - 1];
  }

  // Kiểm tra stack có rỗng hay không, trả về true/false
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Method phụ: lấy số lượng phần tử hiện có trong stack
  size(): number {
    return this.items.length;
  }
}

// Tạo stack chứa số nguyên
const stack = new Stack<number>();
console.log(`Stack rỗng? ${stack.isEmpty()}`);

// Thêm lần lượt 3 phần tử vào stack
stack.push(10);
stack.push(20);
stack.push(30);
console.log(`Kích thước stack: ${stack.size()}`);

// Xem phần tử trên đỉnh mà không xóa
console.log(`Phần tử trên đỉnh (peek): ${stack.peek()}`);

// Lấy và xóa phần tử trên đỉnh (30 được thêm sau cùng nên ra trước - LIFO)
console.log(`Lấy ra (pop): ${stack.pop()}`);
console.log(`Kích thước stack sau khi pop: ${stack.size()}`);

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
