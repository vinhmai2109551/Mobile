// Bài 4: Dùng .then() và .catch() để xử lý một Promise trả về số ngẫu nhiên.
// Quy ước: nếu số ngẫu nhiên >= 0.5 thì resolve, ngược lại thì reject.

function getRandomNumber(): Promise<number> {
  return new Promise((resolve, reject) => {
    // Sau 1 giây tạo số ngẫu nhiên trong khoảng [0, 1)
    setTimeout(() => {
      const value = Math.random();
      if (value >= 0.5) {
        resolve(value); // số lớn -> coi là thành công
      } else {
        reject(new Error("Số quá nhỏ: " + value.toFixed(2))); // số nhỏ -> lỗi
      }
    }, 1000);
  });
}

// .then() nhận giá trị khi resolve, .catch() nhận lỗi khi reject
getRandomNumber()
  .then((value) => console.log("Thành công, số =", value.toFixed(2)))
  .catch((error: Error) => console.log("Thất bại:", error.message));

console.log("Đang chờ số ngẫu nhiên sau 1 giây...");

export {};
