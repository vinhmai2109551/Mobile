// Bài 7: Class User có private name, kèm getter/setter.

class User {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  // getter: đọc giá trị name
  get userName(): string {
    return this.name;
  }

  // setter: gán giá trị mới cho name (có thể validate trước khi gán)
  set userName(newName: string) {
    if (newName.trim().length === 0) {
      console.log("Tên không được để trống!");
      return;
    }
    this.name = newName;
  }
}

const u1 = new User("Vinh");
console.log("Tên ban đầu:", u1.userName);
u1.userName = "Huu Vinh";
console.log("Tên sau khi đổi:", u1.userName);

export {};
