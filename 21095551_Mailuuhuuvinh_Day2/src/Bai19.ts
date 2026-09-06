// Bài 19: Viết hàm fetchUsers(ids: number[]) - gọi fetchUser cho từng ID trong mảng.

interface User {
  id: number;
  name: string;
  email: string;
}

// fetchUser: mô phỏng API, trả về 1 user sau 1 giây
function fetchUser(id: number): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User ${id}`, email: `user${id}@example.com` });
    }, 1000);
  });
}

// fetchUsers: nhận mảng id, gọi fetchUser cho từng id.
// ids.map(fetchUser) tạo ra mảng các Promise -> Promise.all chạy song song và gom kết quả.
function fetchUsers(ids: number[]): Promise<User[]> {
  return Promise.all(ids.map((id) => fetchUser(id)));
}

async function main(): Promise<void> {
  console.log("Đang lấy user [1, 2, 3]...");
  const users = await fetchUsers([1, 2, 3]);
  console.log("Nhận được:", users);
}

main();

export {};
