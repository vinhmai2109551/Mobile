// Bài 29: Hàm async queueProcess() - xử lý các tác vụ TUẦN TỰ theo hàng đợi.

// Mỗi tác vụ là một hàm trả về Promise. Kiểu này gọi là "task factory".
type Task = () => Promise<string>;

// Tạo nhanh một task in tên và hoàn thành sau `time` ms
function makeTask(name: string, time: number): Task {
  return () =>
    new Promise((resolve) => {
      console.log(`Bắt đầu: ${name}`);
      setTimeout(() => resolve(`${name} xong`), time);
    });
}

// queueProcess: chạy từng task một, task trước xong mới gọi task sau.
async function queueProcess(tasks: Task[]): Promise<string[]> {
  const results: string[] = [];

  for (const task of tasks) {
    // await bên trong vòng lặp -> ép chạy tuần tự
    const result = await task();
    console.log(" ->", result);
    results.push(result);
  }

  return results;
}

async function main(): Promise<void> {
  const queue = [
    makeTask("Task A", 1000),
    makeTask("Task B", 500),
    makeTask("Task C", 800),
  ];

  const all = await queueProcess(queue);
  console.log("Tất cả kết quả:", all);
}

main();

export {};
