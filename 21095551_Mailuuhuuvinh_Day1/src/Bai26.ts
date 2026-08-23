// Bài 26: Tạo class Order với danh sách sản phẩm. Thêm method tính tổng tiền.

class Product {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

class Order {
  // Mảng chứa danh sách sản phẩm trong đơn hàng
  products: Product[];

  constructor() {
    // Khởi tạo mảng rỗng khi tạo đơn hàng mới
    this.products = [];
  }

  // Method thêm một sản phẩm vào đơn hàng
  addProduct(product: Product): void {
    this.products.push(product);
  }

  // Method tính tổng tiền của toàn bộ đơn hàng
  getTotalPrice(): number {
    // reduce() duyệt qua mảng và "gộp" các giá trị lại thành 1 kết quả duy nhất
    // sum là giá trị gộp dần (bắt đầu từ 0), p là từng sản phẩm trong mảng
    return this.products.reduce((sum, p) => sum + p.price, 0);
  }

  // Method hiển thị chi tiết đơn hàng
  displayOrder(): void {
    console.log("Chi tiết đơn hàng:");
    this.products.forEach((p) => console.log(`- ${p.name}: ${p.price}`));
    console.log(`Tổng tiền: ${this.getTotalPrice()}`);
  }
}

// Tạo đơn hàng mới
const order1 = new Order();
// Thêm các sản phẩm vào đơn hàng
order1.addProduct(new Product("Áo thun", 150000));
order1.addProduct(new Product("Quần jean", 350000));
order1.addProduct(new Product("Giày", 500000));

// Hiển thị chi tiết đơn hàng và tổng tiền
order1.displayOrder();

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
