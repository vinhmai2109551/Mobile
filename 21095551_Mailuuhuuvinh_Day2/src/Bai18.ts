// Bài 18: Viết hàm fetchUser(id) mô phỏng gọi API - trả về object user sau 1 giây.

interface User {
  id: number;
  name: string;
  email: string;
}

function fetchUser(id: number): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: `User ${id}`,
        email: `user${id}@example.com`,
      });
    }, 1000);
  });
}

async function main(): Promise<void> {
  console.log("Đang lấy thông tin user id = 7...");
  const user = await fetchUser(7);
  console.log("Nhận được:", user);
}

main();

export {};
