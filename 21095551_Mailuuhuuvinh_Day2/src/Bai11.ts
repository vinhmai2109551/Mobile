// Bài 11: Chuyển bài 1 (Promise "Hello Async" sau 2 giây) sang dùng async/await.

function createHelloAsync(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Hello Async"), 2000);
  });
}

// Hàm async luôn trả về Promise; bên trong dùng await để "chờ" Promise xong
async function main(): Promise<void> {
  console.log("Đang chờ Promise trả về kết quả sau 2 giây...");
  const result = await createHelloAsync(); // dừng ở đây tới khi có kết quả
  console.log("Kết quả:", result);
}

main();

export {};
