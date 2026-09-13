// Bài 21: Generic class Repository có add() và getAll().

class Repository<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}

// Repository<string> chỉ lưu chuỗi
const nameRepo = new Repository<string>();
nameRepo.add("Vinh");
nameRepo.add("An");
console.log("Danh sách tên:", nameRepo.getAll());

// Repository<number> chỉ lưu số
const numberRepo = new Repository<number>();
numberRepo.add(1);
numberRepo.add(2);
console.log("Danh sách số:", numberRepo.getAll());

export {};
