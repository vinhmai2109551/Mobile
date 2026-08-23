// Bài 14: Tạo base class Employee. Kế thừa Manager và Developer với method riêng.

class Employee {
  // Tên nhân viên
  name: string;
  // Lương cơ bản
  salary: number;

  constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }

  // Method chung: hiển thị thông tin cơ bản của nhân viên
  displayInfo(): void {
    console.log(`Nhân viên: ${this.name} - Lương: ${this.salary}`);
  }
}

// Manager kế thừa Employee, có thêm method riêng manageTeam()
class Manager extends Employee {
  // Số lượng nhân viên dưới quyền quản lý
  teamSize: number;

  constructor(name: string, salary: number, teamSize: number) {
    // Gọi constructor cha để khởi tạo name và salary
    super(name, salary);
    this.teamSize = teamSize;
  }

  // Method riêng của Manager: quản lý nhóm
  manageTeam(): void {
    console.log(`${this.name} đang quản lý một nhóm gồm ${this.teamSize} người`);
  }
}

// Developer kế thừa Employee, có thêm method riêng writeCode()
class Developer extends Employee {
  // Ngôn ngữ lập trình sở trường
  language: string;

  constructor(name: string, salary: number, language: string) {
    super(name, salary);
    this.language = language;
  }

  // Method riêng của Developer: viết code
  writeCode(): void {
    console.log(`${this.name} đang viết code bằng ngôn ngữ ${this.language}`);
  }
}

// Tạo và sử dụng đối tượng Manager
const manager1 = new Manager("Phạm Văn E", 20000000, 5);
manager1.displayInfo(); // Kế thừa từ Employee
manager1.manageTeam(); // Method riêng của Manager

// Tạo và sử dụng đối tượng Developer
const dev1 = new Developer("Mai Lưu Hữu Vinh", 18000000, "TypeScript");
dev1.displayInfo(); // Kế thừa từ Employee
dev1.writeCode(); // Method riêng của Developer

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
