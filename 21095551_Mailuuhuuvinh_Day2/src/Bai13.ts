// Bài 13: Xử lý lỗi bằng try/catch khi dùng async/await.

function riskyTask(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Something went wrong")), 1000);
  });
}

async function main(): Promise<void> {
  try {
    console.log("Đang chạy riskyTask()...");
    const result = await riskyTask(); // nếu reject -> nhảy xuống catch
    console.log("Kết quả:", result);
  } catch (error) {
    // error có kiểu unknown, ép về Error để lấy message
    console.log("Đã bắt lỗi:", (error as Error).message);
  } finally {
    console.log("Kết thúc hàm main");
  }
}


main();

export {};
