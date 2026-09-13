// Bài 6: Class Book có title, author, year.

class Book {
  constructor(public title: string, public author: string, public year: number) {}

  display(): void {
    console.log(`${this.title} - ${this.author} (${this.year})`);
  }
}

const book1 = new Book("Nhà Giả Kim", "Paulo Coelho", 1988);
book1.display();

export {};
