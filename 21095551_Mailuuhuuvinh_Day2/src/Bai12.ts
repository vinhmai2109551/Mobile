// Bài 12: Viết hàm async gọi simulateTask(2000) và in kết quả.

function simulateTask(time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Task done"), time);
  });
}

async function main(): Promise<void> {
  console.log("Đang gọi simulateTask(2000)...");
  const result = await simulateTask(2000); // chờ 2 giây
  console.log("Kết quả:", result);
}

main();

export {};
