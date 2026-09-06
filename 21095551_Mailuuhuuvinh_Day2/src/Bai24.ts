// Bài 24: Hàm async postData() gửi POST request đến test API.

// Dữ liệu muốn gửi lên server
interface NewPost {
  title: string;
  body: string;
  userId: number;
}

// Dữ liệu server trả về: giống NewPost nhưng có thêm id do server sinh ra
interface CreatedPost extends NewPost {
  id: number;
}

async function postData(data: NewPost): Promise<CreatedPost> {
  // fetch với tham số thứ 2 là "options" để cấu hình request:
  //  - method: "POST" thay vì GET mặc định
  //  - headers: báo cho server biết body là JSON
  //  - body: phải là chuỗi, nên dùng JSON.stringify để chuyển object -> chuỗi JSON
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // POST tạo mới thành công thường trả mã 201; res.ok bao gồm cả 201
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  // Parse JSON kết quả server trả về
  return (await res.json()) as CreatedPost;
}

async function main(): Promise<void> {
  console.log("Đang gửi POST...");

  const created = await postData({
    title: "Bài học async",
    body: "Nội dung demo",
    userId: 1,
  });

  // jsonplaceholder giả lập tạo mới và trả về id = 101
  console.log("Server trả về:", created);
}

main().catch((err) => console.log("Lỗi:", (err as Error).message));

export {};
