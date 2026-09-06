// Bài 10: Dùng .finally() để in "Done" khi Promise kết thúc (dù thành công hay thất bại).

// Hàm nhận cờ shouldFail để chủ động test cả 2 trường hợp
function doTask(shouldFail: boolean): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error("Task lỗi"));
      else resolve("Task thành công");
    }, 1000);
  });
}

// Trường hợp thành công
doTask(false)
  .then((msg) => console.log("[1] then:", msg))
  .catch((err: Error) => console.log("[1] catch:", err.message))
  .finally(() => console.log("[1] Done")); // luôn chạy sau cùng

// Trường hợp thất bại
doTask(true)
  .then((msg) => console.log("[2] then:", msg))
  .catch((err: Error) => console.log("[2] catch:", err.message))
  .finally(() => console.log("[2] Done")); // vẫn chạy dù bị reject

export {};
