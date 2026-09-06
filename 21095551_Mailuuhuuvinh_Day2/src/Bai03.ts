// Bài 3: Viết một hàm reject Promise với lỗi "Something went wrong" sau 1 giây.

// Hàm trả về Promise<never> (không bao giờ resolve, chỉ reject)
function rejectAfterOneSecond(): Promise<never> {
  return new Promise((resolve, reject) => {
    // Sau 1 giây thì reject kèm đối tượng Error
    setTimeout(() => {
      reject(new Error("Something went wrong"));
    }, 1000);
  });
}

// Dùng .catch() để bắt lỗi khi Promise bị reject
rejectAfterOneSecond()
  .then((value) => console.log("Không bao giờ chạy:", value))
  .catch((error: Error) => console.log("Đã bắt được lỗi:", error.message));

// In ngay lập tức, không đợi 1 giây (setTimeout là bất đồng bộ)
console.log("Đang chờ Promise bị reject sau 1 giây...");

export {};
