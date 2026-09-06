// Bài 7: Dùng Promise.race() - trả về kết quả của Promise nào hoàn thành TRƯỚC.

// Hàm phụ: resolve `label` sau `time` ms
function task(label: string, time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`${label} (chờ ${time}ms)`), time);
  });
}

// Promise.race resolve/reject ngay khi Promise ĐẦU TIÊN trong mảng kết thúc,
// các Promise còn lại vẫn chạy nhưng kết quả bị bỏ qua.
Promise.race([
  task("Nhanh", 800),
  task("Trung bình", 1500),
  task("Chậm", 2500),
]).then((winner) => console.log("Về đích trước:", winner));

console.log("Đang đua 3 task...");

export {};
