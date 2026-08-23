// 15. Create a Library class that can store Book and User objects. Add method to add books.
// Bài 15: Tạo class Library có thể lưu Book và User. Thêm method để thêm sách.

class Book {
  title: string;
  author: string;

  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }
}

class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Library {
  // Mảng lưu danh sách các đối tượng Book
  books: Book[];
  // Mảng lưu danh sách các đối tượng User (thành viên thư viện)
  users: User[];

  constructor() {
    // Khởi tạo 2 mảng rỗng khi tạo thư viện mới
    this.books = [];
    this.users = [];
  }

  // Method thêm một cuốn sách vào thư viện
  addBook(book: Book): void {
    // push() thêm phần tử mới vào cuối mảng
    this.books.push(book);
    console.log(`Đã thêm sách: "${book.title}"`);
  }

  // Method thêm một thành viên vào thư viện
  addUser(user: User): void {
    this.users.push(user);
    console.log(`Đã thêm thành viên: ${user.name}`);
  }

  // Method liệt kê toàn bộ sách hiện có trong thư viện
  listBooks(): void {
    console.log("Danh sách sách trong thư viện:");
    // forEach duyệt qua từng cuốn sách trong mảng books
    this.books.forEach((b) => console.log(`- "${b.title}" của ${b.author}`));
  }
}

// Tạo thư viện mới
const library = new Library();
// Thêm sách vào thư viện
library.addBook(new Book("Chí Phèo", "Nam Cao"));
library.addBook(new Book("Vợ Nhặt", "Kim Lân"));
// Thêm thành viên
library.addUser(new User("Mai Lưu Hữu Vinh"));
// Liệt kê danh sách sách
library.listBooks();

// export {} ở cuối file: biến file này thành một "module" riêng biệt trong TypeScript,
// giúp các class/interface trùng tên ở các file khác nhau không bị xung đột phạm vi toàn cục
export {};
