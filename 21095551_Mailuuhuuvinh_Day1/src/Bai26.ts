// Bài 26: Class Order có danh sách product. Method tính tổng tiền.

class Product {
  constructor(public name: string, public price: number) {}
}

class Order {
  private products: Product[] = [];

  addProduct(product: Product): void {
    this.products.push(product);
  }

  getTotal(): number {
    // reduce cộng dồn price của tất cả product trong đơn hàng
    return this.products.reduce((sum, p) => sum + p.price, 0);
  }
}

const order = new Order();
order.addProduct(new Product("Áo", 150));
order.addProduct(new Product("Quần", 250));
console.log("Tổng tiền đơn hàng:", order.getTotal());

export {};
