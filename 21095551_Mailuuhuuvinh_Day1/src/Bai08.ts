// Bài 8: Tạo class Product với name, price. Tạo mảng các product và lọc sản phẩm có price > 100.

class Product {
  // Tên sản phẩm
  name: string;
  // Giá sản phẩm
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

// Tạo mảng (array) chứa nhiều đối tượng Product, kiểu dữ liệu là Product[]
const products: Product[] = [
  new Product("Bàn phím", 150),
  new Product("Chuột", 80),
  new Product("Màn hình", 2500),
  new Product("Tai nghe", 90),
  new Product("Bàn di chuột", 50),
];

// Dùng method filter() của mảng để lọc ra các phần tử thỏa điều kiện price > 100
// filter() sẽ duyệt qua từng phần tử p, giữ lại phần tử nếu hàm callback trả về true
const expensiveProducts = products.filter((p) => p.price > 100);

// In tiêu đề
console.log("Danh sách sản phẩm có giá > 100:");
// Duyệt qua mảng kết quả bằng forEach để in từng sản phẩm
expensiveProducts.forEach((p) => {
  console.log(`- ${p.name}: ${p.price}`);
});

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
