// Bài 17: Singleton Logger class - chỉ có duy nhất 1 instance trong toàn bộ chương trình.

class Logger {
  private static instance: Logger;

  // constructor private -> bên ngoài không thể "new Logger()" trực tiếp
  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }
}

const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();
logger1.log("Xin chào");
console.log("logger1 === logger2:", logger1 === logger2); // true vì chỉ có 1 instance

export {};
