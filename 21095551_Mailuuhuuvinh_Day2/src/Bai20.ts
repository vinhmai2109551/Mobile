// Bài 20: Thêm timeout - nếu lời gọi API quá 2 giây thì throw error.

interface User {
  id: number;
  name: string;
}

// fetchUser: mô phỏng API, ở đây cho chạy chậm 3 giây để test timeout
function fetchUser(id: number): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: `User ${id}` }), 3000);
  });
}

// timeout: Promise tự reject sau `ms` mili giây
function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Quá thời gian ${ms}ms`)), ms);
  });
}

// Promise.race: ai xong trước thì lấy cái đó.
// Nếu fetchUser chậm hơn timeout -> timeout reject trước -> ném lỗi.
function fetchUserWithTimeout(id: number, ms: number): Promise<User> {
  return Promise.race([fetchUser(id), timeout(ms)]);
}

async function main(): Promise<void> {
  try {
    console.log("Gọi API với giới hạn 2 giây...");
    const user = await fetchUserWithTimeout(1, 2000);
    console.log("Nhận được:", user);
  } catch (error) {
    console.log("Lỗi:", (error as Error).message);
  }
}

main();

export {};
