// Bài 14: Base class Employee. Manager và Developer kế thừa, thêm method riêng.

class Employee {
  constructor(public name: string, public salary: number) {}
}

class Manager extends Employee {
  manageTeam(): void {
    console.log(`${this.name} đang quản lý đội nhóm`);
  }
}

class Developer extends Employee {
  writeCode(): void {
    console.log(`${this.name} đang viết code`);
  }
}

const manager = new Manager("Vinh", 2000);
const dev = new Developer("An", 1500);
manager.manageTeam();
dev.writeCode();

export {};
