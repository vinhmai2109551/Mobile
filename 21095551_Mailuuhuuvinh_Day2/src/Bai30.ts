// Bài 30: Dùng async/await + Promise.allSettled() để xử lý nhiều API call
// và hiển thị trạng thái thành công / thất bại của từng cái.

interface Post {
  id: number;
  title: string;
}

// fetchPost: lấy 1 post. Nếu id không hợp lệ, API trả 404 -> ném lỗi.
async function fetchPost(id: number): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status} (id=${id})`);
  return (await res.json()) as Post;
}

async function main(): Promise<void> {
  // id 9999 không tồn tại -> sẽ thất bại, các id còn lại thành công
  const ids = [1, 2, 9999, 4];

  // Promise.allSettled chờ TẤT CẢ kết thúc (dù thành công hay lỗi),
  // KHÔNG dừng sớm khi có 1 cái lỗi như Promise.all.
  // Kết quả là mảng object: { status: "fulfilled", value } hoặc { status: "rejected", reason }
  const results = await Promise.allSettled(ids.map((id) => fetchPost(id)));

  results.forEach((r, i) => {
    if (r.status === "fulfilled") {
      console.log(`[${ids[i]}] THÀNH CÔNG: ${r.value.title}`);
    } else {
      console.log(`[${ids[i]}] THẤT BẠI: ${(r.reason as Error).message}`);
    }
  });
}

main();

export {};
