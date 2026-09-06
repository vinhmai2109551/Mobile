// Bài 5: Viết hàm simulateTask(time) trả về Promise resolve "Task done" sau `time` mili giây.

// time: số mili giây cần chờ trước khi hoàn thành
function simulateTask(time: number): Promise<string> {
  return new Promise((resolve) => {
    // Sau `time` ms thì resolve chuỗi "Task done"
    setTimeout(() => resolve("Task done"), time);
  });
}

// Gọi thử với 1500ms
simulateTask(1500).then((result) => console.log("Kết quả:", result));

console.log("Đang chạy simulateTask(1500)...");

export {};
