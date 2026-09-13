// Bài 10: Class Account có field public, private và readonly.

class Account {
  public username: string; // truy cập được từ mọi nơi
  private password: string; // chỉ truy cập được trong chính class này
  readonly id: number; // chỉ gán được 1 lần lúc khởi tạo, sau đó không đổi được

  constructor(id: number, username: string, password: string) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  // Vì password là private, phải qua method mới kiểm tra được từ bên ngoài
  checkPassword(input: string): boolean {
    return input === this.password;
  }
}

const acc = new Account(1, "vinh", "123456");
console.log("Username:", acc.username);
console.log("Kiểm tra mật khẩu đúng:", acc.checkPassword("123456"));
console.log("Kiểm tra mật khẩu sai:", acc.checkPassword("wrong"));
// acc.id = 2; // lỗi vì id là readonly

export {};
