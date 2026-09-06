# 21095551_Mailuuhuuvinh_Day2

Bai tap thuc hanh Async/Promise voi TypeScript - 30 bai (Bai01.ts -> Bai30.ts trong thu muc `src/`).

Moi file la mot bai tap doc lap: co ham/class theo dung de bai, phan code demo o cuoi file,
va comment giai thich tung dong bang tieng Viet.

## Cai dat

Mo terminal tai thu muc `21095551_Mailuuhuuvinh_Day2`, chay:

```bash
npm install
```

Lenh nay se tai `typescript` va `ts-node` (khai bao trong `package.json`) ve thu muc `node_modules`.

## Chay mot bai cu the

Cach 1 - dung ts-node truc tiep:

```bash
npx ts-node src/Bai01.ts
```

Cach 2 - dung script co san trong `package.json` (khuyen nghi, ngan gon hon):

```bash
npm run bai01
npm run bai02
...
npm run bai30
```

Vi cac bai co su dung `setTimeout` / Promise cho tre 1-5 giay, chuong trinh se khong ket thuc
ngay ma cho vai giay de in ket qua ra console - day la hanh vi dung theo yeu cau de bai.

## Bien dich toan bo sang JavaScript

```bash
npm run build
```

File JS sau khi bien dich se nam trong thu muc `dist/`.

## Danh sach bai tap

### A. Basics with Promise
1. Promise tra ve "Hello Async" sau 2 giay
2. Ham tra ve Promise resolve so 10 sau 1 giay
3. Ham reject Promise voi loi "Something went wrong" sau 1 giay
4. `.then()` / `.catch()` xu ly Promise tra ve so ngau nhien
5. `simulateTask(time)` tra ve Promise resolve "Task done" sau `time` ms
6. `Promise.all()` chay 3 Promise mo phong song song, in ket qua
7. `Promise.race()` tra ve Promise nao resolve truoc
8. Promise chain: binh phuong 2, nhan doi, cong 5
9. Promise doc mang sau 1 giay va loc so chan
10. `.finally()` in "Done" khi Promise ket thuc (thanh cong hoac that bai)

### B. Async/Await
11. Chuyen bai 1 sang async/await
12. Ham async goi `simulateTask(2000)` va in ket qua
13. Xu ly loi bang try/catch voi async/await
14. Ham async nhan so, cho 1 giay, tra ve so x 3
15. Goi nhieu ham async tuan tu bang await
16. Goi nhieu ham async song song bang `Promise.all()`
17. `for await...of` de duyet qua mang cac Promise
18. `fetchUser(id)` mo phong goi API (tra ve object user sau 1 giay)
19. `fetchUsers(ids: number[])` goi `fetchUser` cho tung ID
20. Them timeout: neu goi API qua 2 giay thi throw error

### C. Fetch API & Simulated I/O
21. Dung `fetch` lay du lieu tu API cong khai (jsonplaceholder)
22. Goi API nhieu lan va in ket qua
23. Ham async fetch danh sach todos va loc nhung item chua hoan thanh
24. Ham async `postData()` gui POST request den test API
25. `downloadFile` mo phong tai file trong 3 giay va log khi xong
26. Dung async/await voi setTimeout de mo phong cho 5 giay
27. `fetchWithRetry(url, retries)` thu lai toi da `retries` lan neu goi API that bai
28. Ham async `batchProcess()` xu ly 5 tac vu bat dong bo cung luc (`Promise.all`)
29. Ham async `queueProcess()` xu ly cac tac vu tuan tu theo hang doi
30. Dung async/await + `Promise.allSettled()` de xu ly nhieu API call va hien thi trang thai thanh cong/that bai
