// Bài 17: Dùng "for await...of" để duyệt qua một mảng các Promise.

function task(id: number, time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Task ${id} xong sau ${time}ms`), time);
  });
}

async function main(): Promise<void> {
  const promises = [task(1, 1500), task(2, 500), task(3, 1000)];

  // for await...of: mỗi vòng lặp sẽ await một phần tử của mảng.
  // In ra theo THỨ TỰ MẢNG (không phải theo thứ tự xong sớm).
  for await (const result of promises) {
    console.log(result);
  }

  console.log("Đã duyệt hết mảng Promise");
}

main();

export {};
