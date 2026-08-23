// Bài 6: Tạo class Book với thuộc tính title, author, year.

class Book {
  // Tiêu đề sách
  title: string;
  // Tác giả
  author: string;
  // Năm xuất bản
  year: number;

  constructor(title: string, author: string, year: number) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  // Method hiển thị thông tin sách (không có trong yêu cầu nhưng hữu ích để kiểm tra)
  displayInfo(): void {
    console.log(`Sách: "${this.title}" - Tác giả: ${this.author} - Năm: ${this.year}`);
  }
}

// Tạo đối tượng Book
const book1 = new Book("Đời Thừa", "Nam Cao", 1943);
// In thông tin sách ra màn hình
book1.displayInfo();

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
