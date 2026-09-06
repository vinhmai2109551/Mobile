// Bài 22: Gọi API nhiều lần và in kết quả.

interface Post {
  id: number;
  title: string;
}

// Hàm lấy 1 post theo id
async function fetchPost(id: number): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status} (id=${id})`);
  return (await res.json()) as Post;
}

async function main(): Promise<void> {
  const ids = [1, 2, 3, 4, 5];

  // Gọi song song cho tất cả id rồi chờ hết bằng Promise.all
  const posts = await Promise.all(ids.map((id) => fetchPost(id)));

  posts.forEach((p) => console.log(`#${p.id}: ${p.title}`));
}

main().catch((err) => console.log("Lỗi:", (err as Error).message));

export {};
