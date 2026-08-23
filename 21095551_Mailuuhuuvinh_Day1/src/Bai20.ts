// Bài 20: Viết interface Vehicle và hiện thực trong class Car và Bike.

// Interface mô tả hành vi chung mà mọi phương tiện phải có
interface Vehicle {
  // Tốc độ tối đa (km/h)
  maxSpeed: number;
  // Method mô tả hành động di chuyển
  move(): void;
}

// Car thực thi interface Vehicle
class Car implements Vehicle {
  // Bắt buộc phải có thuộc tính maxSpeed vì interface yêu cầu
  maxSpeed: number;

  constructor(maxSpeed: number) {
    this.maxSpeed = maxSpeed;
  }

  // Bắt buộc phải hiện thực method move()
  move(): void {
    console.log(`Ô tô đang chạy với tốc độ tối đa ${this.maxSpeed} km/h`);
  }
}

// Bike cũng thực thi interface Vehicle nhưng hiện thực khác đi
class Bike implements Vehicle {
  maxSpeed: number;

  constructor(maxSpeed: number) {
    this.maxSpeed = maxSpeed;
  }

  move(): void {
    console.log(`Xe đạp đang đi với tốc độ tối đa ${this.maxSpeed} km/h`);
  }
}

// Hàm nhận vào bất kỳ đối tượng nào thực thi Vehicle, không quan tâm đó là Car hay Bike
function testVehicle(vehicle: Vehicle): void {
  vehicle.move();
}

// Tạo đối tượng Car và Bike, cả hai đều tuân theo "hợp đồng" Vehicle
const car1 = new Car(180);
const bike1 = new Bike(25);

// Truyền cả 2 loại đối tượng vào cùng một hàm vì cùng tuân thủ interface Vehicle
testVehicle(car1);
testVehicle(bike1);

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
