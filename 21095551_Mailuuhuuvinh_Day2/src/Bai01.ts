// 1. Create a Promise that returns the string "Hello Async" after 2 seconds.
// Bài 1: Tạo một Promise trả về chuỗi "Hello Async" sau 2 giây.

// Khai báo hàm createHelloAsync, hàm này không nhận tham số nào
// Kiểu trả về là Promise<string>: nghĩa là hàm trả về một Promise,
// và khi Promise đó resolve (thành công) thì giá trị trả về bên trong sẽ có kiểu string
function createHelloAsync(): Promise<string> {
  // "return new Promise(...)" : tạo mới một đối tượng Promise và trả về ngay cho nơi gọi hàm
  // Promise nhận vào 1 tham số là "executor function" - hàm này chạy ngay lập tức khi Promise được tạo
  // executor function có 2 tham số: resolve và reject
  //   - resolve: hàm gọi khi tác vụ thành công, giá trị truyền vào resolve() sẽ là kết quả của Promise
  //   - reject: hàm gọi khi tác vụ thất bại, giá trị truyền vào reject() sẽ là lỗi của Promise
  return new Promise((resolve, reject) => {
    // setTimeout: hàm có sẵn của JavaScript, dùng để hẹn giờ chạy 1 đoạn code sau 1 khoảng thời gian
    // Tham số 1: callback function - đoạn code sẽ được chạy khi hết thời gian chờ
    // Tham số 2: 2000 - số mili giây cần chờ (2000ms = 2 giây)
    setTimeout(() => {
      // Sau khi chờ đủ 2 giây, gọi resolve() với giá trị "Hello Async"
      // -> Promise chuyển sang trạng thái "fulfilled" (thành công) và mang giá trị "Hello Async"
      resolve("Hello Async");
    }, 2000);
  });
}

// Gọi hàm createHelloAsync() -> trả về 1 Promise, Promise này đang ở trạng thái "pending" (chờ xử lý)
// Dùng .then() để đăng ký một callback sẽ được gọi khi Promise resolve thành công
// Tham số "result" trong callback chính là giá trị đã truyền vào resolve() ở trên ("Hello Async")
createHelloAsync().then((result) => {
  // In ra màn hình console giá trị mà Promise trả về
  console.log("Kết quả:", result);
});

// In dòng này ra console TRƯỚC khi Promise resolve
// Vì setTimeout là bất đồng bộ (không chặn luồng chính), nên dòng console.log dưới đây
// sẽ chạy ngay lập tức, không đợi 2 giây như đoạn code bên trong Promise
console.log("Đang chờ Promise trả về kết quả sau 2 giây...");

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các biến/hàm trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
