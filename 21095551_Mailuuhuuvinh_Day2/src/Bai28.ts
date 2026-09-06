// Bài 28: Hàm async batchProcess() - xử lý 5 tác vụ bất đồng bộ CÙNG LÚC (Promise.all).

// processItem: xử lý 1 phần tử, mất thời gian ngẫu nhiên 0.5-1.5 giây,
// trả về chuỗi mô tả kết quả.
function processItem(id: number): Promise<string> {
  const time = 500 + Math.floor(Math.random() * 1000);
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Item ${id} xử lý xong (${time}ms)`), time);
  });
}

async function batchProcess(): Promise<void> {
  const ids = [1, 2, 3, 4, 5];
  console.time("Tổng thời gian");

  // ids.map(processItem) -> mảng 5 Promise, tất cả bắt đầu chạy ngay.
  // Promise.all chờ CẢ 5 xong rồi trả về mảng kết quả theo đúng thứ tự ids.
  const results = await Promise.all(ids.map((id) => processItem(id)));

  results.forEach((r) => console.log(r));

  // Vì chạy song song, tổng thời gian ~ bằng item lâu nhất (không phải tổng cộng)
  console.timeEnd("Tổng thời gian");
}

batchProcess();

export {};
