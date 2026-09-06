// Bài 26: Dùng async/await với setTimeout để mô phỏng chờ 5 giây.

// delay(ms): trả về Promise resolve sau `ms` mili giây.
// Đây là cách "gói" setTimeout lại để có thể await được.
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main(): Promise<void> {
  console.log("Bắt đầu, chờ 5 giây...");

  // await delay(5000) làm hàm main tạm dừng đúng 5 giây
  // nhưng KHÔNG chặn luồng chính của chương trình.
  await delay(5000);

  console.log("Đã đủ 5 giây, tiếp tục chạy");
}

main();

export {};
