// 2. Write a function that returns a Promise resolving with the number 10 after 1 second.
// Bài 2: Viết một hàm trả về Promise, Promise này resolve với số 10 sau 1 giây.

// Khai báo hàm getNumberAsync, hàm này không nhận tham số nào
// Kiểu trả về là Promise<number>: nghĩa là hàm trả về một Promise,
// và khi Promise đó resolve (thành công) thì giá trị bên trong sẽ có kiểu number
function getNumberAsync(): Promise<number> {
  // "return new Promise(...)" : tạo mới một đối tượng Promise và trả về ngay cho nơi gọi hàm
  // Promise nhận vào 1 tham số là "executor function" - hàm này chạy ngay lập tức khi Promise được tạo
  // executor function có 2 tham số: resolve và reject
  //   - resolve: hàm gọi khi tác vụ thành công, giá trị truyền vào resolve() sẽ là kết quả của Promise
  //   - reject: hàm gọi khi tác vụ thất bại, giá trị truyền vào reject() sẽ là lỗi của Promise
  return new Promise((resolve, reject) => {
    // setTimeout: hàm có sẵn của JavaScript, dùng để hẹn giờ chạy 1 đoạn code sau 1 khoảng thời gian
    // Tham số 1: callback function - đoạn code sẽ được chạy khi hết thời gian chờ
    // Tham số 2: 1000 - số mili giây cần chờ (1000ms = 1 giây)
    setTimeout(() => {
      // Sau khi chờ đủ 1 giây, gọi resolve() với giá trị 10
      // -> Promise chuyển sang trạng thái "fulfilled" (thành công) và mang giá trị 10
      resolve(10);
    }, 1000);
  });
}

// Gọi hàm getNumberAsync() -> trả về 1 Promise đang ở trạng thái "pending" (chờ xử lý)
// Dùng .then() để đăng ký một callback sẽ được gọi khi Promise resolve thành công
// Tham số "value" trong callback chính là giá trị đã truyền vào resolve() ở trên (số 10)
getNumberAsync().then((value) => {
  // In ra màn hình console giá trị mà Promise trả về
  console.log("Số nhận được:", value);
  // Có thể dùng luôn giá trị đó để tính toán, ví dụ nhân đôi
  console.log("Nhân đôi:", value * 2);
});

// In dòng này ra console TRƯỚC khi Promise resolve
// Vì setTimeout là bất đồng bộ (không chặn luồng chính), nên dòng console.log dưới đây
// sẽ chạy ngay lập tức, không đợi 1 giây như đoạn code bên trong Promise
console.log("Đang chờ Promise trả về số sau 1 giây...");

export {};
