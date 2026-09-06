// Bài 9: Promise trả về một mảng số sau 1 giây, sau đó lọc ra các số chẵn.

function getNumbers(): Promise<number[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 1000);
  });
}

getNumbers()
  .then((numbers) => {
    console.log("Mảng gốc:", numbers);
    // filter giữ lại phần tử thỏa điều kiện: chia 2 dư 0 -> số chẵn
    return numbers.filter((n) => n % 2 === 0);
  })
  .then((evens) => console.log("Số chẵn:", evens));

console.log("Đang chờ mảng số sau 1 giây...");

export {};
