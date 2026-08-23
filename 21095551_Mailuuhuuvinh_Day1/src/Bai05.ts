// 5. Create a class BankAccount with balance. Add methods deposit() and withdraw().
// Bài 5: Tạo class BankAccount với balance. Thêm method deposit() và withdraw().

class BankAccount {
  // Số dư tài khoản, khởi tạo mặc định là 0 nếu không truyền vào
  balance: number;

  constructor(balance: number = 0) {
    this.balance = balance;
  }

  // Method nạp tiền: cộng thêm "amount" vào balance
  deposit(amount: number): void {
    // Kiểm tra số tiền nạp phải lớn hơn 0 mới hợp lệ
    if (amount <= 0) {
      console.log("Số tiền nạp phải lớn hơn 0!");
      return; // Dừng hàm nếu không hợp lệ
    }
    // Cộng tiền vào số dư hiện tại
    this.balance += amount;
    console.log(`Đã nạp ${amount}. Số dư hiện tại: ${this.balance}`);
  }

  // Method rút tiền: trừ "amount" khỏi balance nếu đủ tiền
  withdraw(amount: number): void {
    // Kiểm tra số dư có đủ để rút không
    if (amount > this.balance) {
      console.log("Số dư không đủ để rút!");
      return;
    }
    // Trừ tiền khỏi số dư hiện tại
    this.balance -= amount;
    console.log(`Đã rút ${amount}. Số dư hiện tại: ${this.balance}`);
  }
}

// Tạo tài khoản với số dư ban đầu là 100
const account = new BankAccount(100);
// Nạp thêm 50 vào tài khoản
account.deposit(50);
// Rút 30 từ tài khoản
account.withdraw(30);
// Thử rút số tiền lớn hơn số dư hiện có để kiểm tra lỗi
account.withdraw(1000);

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
