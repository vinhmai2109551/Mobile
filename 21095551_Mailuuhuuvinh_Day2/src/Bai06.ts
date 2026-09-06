// Bài 6: Dùng Promise.all() chạy 3 Promise mô phỏng song song, in kết quả khi cả 3 xong.

// Hàm phụ: resolve `label` sau `time` ms
function task(label: string, time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`${label} xong sau ${time}ms`), time);
  });
}


// Promise.all nhận mảng Promise, chạy tất cả cùng lúc,
// chỉ resolve khi TẤT CẢ xong; kết quả là mảng theo đúng thứ tự truyền vào.
Promise.all([
  task("Task A", 1000),
  task("Task B", 2000),
  task("Task C", 1500),
]).then((results) => {
  console.log("Tất cả hoàn thành:");
  results.forEach((r) => console.log(" -", r));
});

console.log("Đang chạy 3 task song song...");

export {};
