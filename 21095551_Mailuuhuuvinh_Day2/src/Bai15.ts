// Bài 15: Gọi nhiều hàm async TUẦN TỰ bằng await (hàm này xong mới tới hàm kia).

function step(name: string, time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`${name} xong`), time);
  });
}

async function main(): Promise<void> {
  console.time("Tổng thời gian");

  const r1 = await step("Bước 1", 1000); // chờ 1s
  console.log(r1);

  const r2 = await step("Bước 2", 1000); // chờ tiếp 1s
  console.log(r2);

  const r3 = await step("Bước 3", 1000); // chờ tiếp 1s
  console.log(r3);

  // Chạy tuần tự nên tổng ~3 giây
  console.timeEnd("Tổng thời gian");
}

main();

export {};
