// 10. Create a class Account with public, private and readonly fields.
// Bài 10: Tạo class Account với các field public, private và readonly.

class Account {
  // public: truy cập tự do cả bên trong lẫn bên ngoài class (mặc định của TypeScript nếu không ghi gì)
  public username: string;

  // private: chỉ truy cập được bên trong class Account, không thể truy cập từ bên ngoài
  private password: string;

  // readonly: chỉ có thể gán giá trị MỘT LẦN duy nhất, thường là trong constructor,
  // sau đó không thể thay đổi giá trị này nữa
  readonly accountId: string;

  constructor(username: string, password: string, accountId: string) {
    this.username = username;
    this.password = password;
    // Gán giá trị cho readonly field, chỉ được phép tại đây (lúc khởi tạo)
    this.accountId = accountId;
  }

  // Method public để kiểm tra mật khẩu mà không lộ giá trị password ra ngoài trực tiếp
  checkPassword(input: string): boolean {
    // So sánh mật khẩu nhập vào với mật khẩu private bên trong
    return input === this.password;
  }
}

// Tạo đối tượng Account
const acc = new Account("vinh21095551", "matkhau123", "ACC-001");
// Truy cập trực tiếp thuộc tính public -> hợp lệ
console.log(`Username: ${acc.username}`);
// Truy cập thuộc tính readonly để đọc -> hợp lệ (chỉ không được GÁN lại)
console.log(`Account ID: ${acc.accountId}`);
// Không thể viết acc.password vì đây là private -> sẽ báo lỗi biên dịch nếu bỏ comment dòng dưới
// console.log(acc.password);
// Kiểm tra mật khẩu thông qua method public
console.log(`Mật khẩu đúng? ${acc.checkPassword("matkhau123")}`);

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
