// Bài 16: Gọi nhiều hàm async SONG SONG bằng Promise.all() (chạy cùng lúc).

function step(name: string, time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`${name} xong`), time);
  });
}

async function main(): Promise<void> {
  console.time("Tổng thời gian");

  // Tạo cả 3 Promise trước -> chúng bắt đầu chạy ngay,
  // await Promise.all để chờ tất cả cùng hoàn thành.
  const results = await Promise.all([
    step("Bước 1", 1000),
    step("Bước 2", 2000),
    step("Bước 3", 1500),
  ]);

  results.forEach((r) => console.log(r));

  // Chạy song song nên tổng ~2 giây (bằng task lâu nhất)
  console.timeEnd("Tổng thời gian");
}

main();

export {};
