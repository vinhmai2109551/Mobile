// Bài 14: Hàm async nhận vào một số, chờ 1 giây, rồi trả về số đó nhân 3.

async function tripleAfterDelay(x: number): Promise<number> {
  // await một Promise chỉ để "chờ" 1 giây
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return x * 3;
}

async function main(): Promise<void> {
  console.log("Đang tính tripleAfterDelay(5)...");
  const result = await tripleAfterDelay(5);
  console.log("Kết quả:", result); // 15
}

main();

export {};


