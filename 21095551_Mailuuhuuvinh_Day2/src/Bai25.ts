// Bài 25: Hàm downloadFile mô phỏng tải file trong 3 giây và log khi xong.

// fileName: tên file giả lập. Trả về Promise<void> vì chỉ cần báo "xong", không có giá trị.
function downloadFile(fileName: string): Promise<void> {
  return new Promise((resolve) => {
    console.log(`Bắt đầu tải "${fileName}"...`);

    // setTimeout mô phỏng thời gian tải mất 3 giây.
    // Hết 3 giây thì log thông báo và gọi resolve() để Promise hoàn thành.
    setTimeout(() => {
      console.log(`Tải xong "${fileName}"`);
      resolve();
    }, 3000);
  });
}

async function main(): Promise<void> {
  // await để chờ tải xong hẳn rồi mới chạy dòng tiếp theo
  await downloadFile("baocao.pdf");
  console.log("Tiếp tục xử lý sau khi file đã sẵn sàng");
}

main();

export {};
