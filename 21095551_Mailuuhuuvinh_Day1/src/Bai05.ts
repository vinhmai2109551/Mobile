// Bài 5: Class BankAccount có balance. Method deposit() và withdraw().

class BankAccount {
  constructor(private balance: number = 0) {}

  deposit(amount: number): void {
    this.balance += amount;
    console.log(`Nạp ${amount}, số dư hiện tại: ${this.balance}`);
  }

  withdraw(amount: number): void {
    if (amount > this.balance) {
      console.log("Số dư không đủ!");
      return;
    }
    this.balance -= amount;
    console.log(`Rút ${amount}, số dư hiện tại: ${this.balance}`);
  }
}

const acc = new BankAccount(100);
acc.deposit(50);
acc.withdraw(30);
acc.withdraw(1000);

export {};
