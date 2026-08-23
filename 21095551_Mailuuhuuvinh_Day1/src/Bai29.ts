// 29. Create an interface Movable with method move(). Implement it in Car and Robot.
// Bài 29: Tạo interface Movable với method move(). Hiện thực trong Car và Robot.

// Interface mô tả hành vi di chuyển chung, không quan tâm là thực thể gì
interface Movable {
  // Method move nhận vào khoảng cách cần di chuyển (đơn vị: mét), không trả về giá trị
  move(distance: number): void;
}

// Car thực thi interface Movable
class Car implements Movable {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Hiện thực riêng của Car cho method move()
  move(distance: number): void {
    console.log(`Ô tô ${this.name} lái được ${distance} mét trên đường`);
  }
}

// Robot thực thi interface Movable theo cách khác
class Robot implements Movable {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Hiện thực riêng của Robot cho method move()
  move(distance: number): void {
    console.log(`Robot ${this.name} di chuyển ${distance} mét bằng chân`);
  }
}

// Hàm dùng chung, nhận vào bất kỳ đối tượng nào thực thi Movable
// và làm cho nó di chuyển một khoảng cách nhất định
function moveObject(obj: Movable, distance: number): void {
  obj.move(distance);
}

// Tạo mảng chứa nhiều loại đối tượng khác nhau nhưng cùng tuân theo interface Movable
const movableThings: Movable[] = [new Car("Vios"), new Robot("R2D2")];

// Duyệt qua từng đối tượng và gọi hàm di chuyển chung, không cần biết nó là Car hay Robot
movableThings.forEach((thing) => moveObject(thing, 10));

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
