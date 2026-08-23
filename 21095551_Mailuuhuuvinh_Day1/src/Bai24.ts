// 24. Create an abstract class Appliance with method turnOn(). Implement Fan and AirConditioner.
// Bài 24: Tạo abstract class Appliance với method turnOn(). Hiện thực Fan và AirConditioner.

// abstract class định nghĩa bộ khung chung cho các thiết bị điện
abstract class Appliance {
  // Tên thiết bị, dùng chung cho mọi lớp con
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // abstract method: không có thân hàm ở đây, bắt buộc lớp con phải tự hiện thực
  abstract turnOn(): void;

  // Method thường, có sẵn và dùng chung cho tất cả lớp con
  turnOff(): void {
    console.log(`${this.name} đã TẮT`);
  }
}

// Fan (Quạt) kế thừa Appliance và hiện thực riêng turnOn()
class Fan extends Appliance {
  turnOn(): void {
    console.log(`${this.name} đang BẬT: gió đang thổi`);
  }
}

// AirConditioner (Máy lạnh) kế thừa Appliance và hiện thực riêng turnOn()
class AirConditioner extends Appliance {
  // Nhiệt độ đặt cho máy lạnh
  temperature: number;

  constructor(name: string, temperature: number) {
    super(name);
    this.temperature = temperature;
  }

  turnOn(): void {
    console.log(`${this.name} đang BẬT: làm mát ở ${this.temperature} độ C`);
  }
}

// Tạo và sử dụng đối tượng Fan
const fan1 = new Fan("Quạt trần");
fan1.turnOn();
fan1.turnOff(); // Method dùng chung từ lớp cha Appliance

// Tạo và sử dụng đối tượng AirConditioner
const ac1 = new AirConditioner("Máy lạnh phòng khách", 25);
ac1.turnOn();
ac1.turnOff();
ac1.turnOn(); // Bật lại để kiểm tra nhiệt độ

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
