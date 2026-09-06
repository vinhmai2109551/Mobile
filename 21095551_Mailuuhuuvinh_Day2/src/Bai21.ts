// Bài 21: Dùng fetch lấy dữ liệu từ API công khai (jsonplaceholder).

// Kiểu dữ liệu 1 bài post trả về từ API
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function main(): Promise<void> {
  console.log("Đang gọi API...");

  // fetch trả về Promise<Response>; await để lấy Response
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

  // response.ok = false khi mã lỗi (404, 500...) -> tự ném lỗi
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  // response.json() cũng là async -> await để lấy object đã parse
  const post = (await response.json()) as Post;

  console.log("Tiêu đề:", post.title);
  console.log("Nội dung:", post.body);
}

main().catch((err) => console.log("Lỗi:", (err as Error).message));

export {};
