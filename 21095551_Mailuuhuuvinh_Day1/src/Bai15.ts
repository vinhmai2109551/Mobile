// Bài 15: Class Library lưu Book và User. Method thêm sách.

class Book {
  constructor(public title: string) {}
}

class User {
  constructor(public name: string) {}
}

class Library {
  private books: Book[] = [];
  private users: User[] = [];

  addBook(book: Book): void {
    this.books.push(book);
    console.log(`Đã thêm sách: ${book.title}`);
  }

  addUser(user: User): void {
    this.users.push(user);
    console.log(`Đã thêm user: ${user.name}`);
  }

  listBooks(): void {
    console.log("Danh sách sách:", this.books.map((b) => b.title));
  }
}

const library = new Library();
library.addBook(new Book("Sapiens"));
library.addBook(new Book("Nhà Giả Kim"));
library.addUser(new User("Vinh"));
library.listBooks();

export {};
