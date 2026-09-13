// Bài 23: Interface Payment có pay(amount). CashPayment và CardPayment implement.

interface Payment {
  pay(amount: number): void;
}

class CashPayment implements Payment {
  pay(amount: number): void {
    console.log(`Thanh toán ${amount} bằng tiền mặt`);
  }
}

class CardPayment implements Payment {
  pay(amount: number): void {
    console.log(`Thanh toán ${amount} bằng thẻ`);
  }
}

// Hàm nhận vào bất kỳ Payment nào -> không cần quan tâm là tiền mặt hay thẻ
function processPayment(payment: Payment, amount: number): void {
  payment.pay(amount);
}

processPayment(new CashPayment(), 100);
processPayment(new CardPayment(), 200);

export {};
