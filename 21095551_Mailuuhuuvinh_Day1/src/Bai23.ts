// Bài 23: Tạo interface Payment với method pay(amount). Hiện thực CashPayment và CardPayment.

// Interface mô tả hành vi thanh toán chung, không quan tâm thanh toán bằng cách nào
interface Payment {
  // Method pay nhận vào số tiền cần thanh toán, không trả về giá trị
  pay(amount: number): void;
}

// CashPayment thực thi Payment theo hình thức tiền mặt
class CashPayment implements Payment {
  pay(amount: number): void {
    console.log(`Thanh toán ${amount} bằng TIỀN MẶT`);
  }
}

// CardPayment thực thi Payment theo hình thức thẻ ngân hàng
class CardPayment implements Payment {
  // Thuộc tính riêng của CardPayment, lưu 4 số cuối của thẻ
  cardNumber: string;

  constructor(cardNumber: string) {
    this.cardNumber = cardNumber;
  }

  pay(amount: number): void {
    console.log(`Thanh toán ${amount} bằng THẺ ${this.cardNumber}`);
  }
}

// Hàm xử lý thanh toán, nhận vào BẤT KỲ đối tượng nào tuân theo interface Payment
// Đây là ví dụ về tính đa hình thông qua interface
function processPayment(payment: Payment, amount: number): void {
  payment.pay(amount);
}

// Tạo các phương thức thanh toán khác nhau
const cash = new CashPayment();
const card = new CardPayment("**** 1234");

// Cùng một hàm processPayment nhưng xử lý được cả 2 loại thanh toán khác nhau
processPayment(cash, 100000);
processPayment(card, 250000);

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
