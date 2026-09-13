// Bài 8: Class Product có name, price. Tạo mảng product và lọc price > 100.

class Product {
  constructor(public name: string, public price: number) {}
}

const products: Product[] = [
  new Product("Bút", 5),
  new Product("Ba lô", 250),
  new Product("Bàn phím", 450),
  new Product("Sách", 80),
];

// filter giữ lại phần tử thỏa điều kiện price > 100
const expensiveProducts = products.filter((p) => p.price > 100);

console.log("Sản phẩm giá > 100:");
expensiveProducts.forEach((p) => console.log(`- ${p.name}: ${p.price}`));

export {};
