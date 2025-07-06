# REPORT

### 1. Higher-order function && Callback function
---
__Higher-Order function__ - Tái sử dụng logic của hàm
- Nhận function khác như một Argument || return lại một function
- Các hàm forEach, filter hay map, ... là một higher-order function

__Callback function__ - Tăng tính linh động của hàm
- Là hàm được truyền vào một hàm khác
- Thực hiện các tác vụ logic cho higher-order function
- Trong môi trường bất đồng bộ (asynchronous), callback giúp xử lý một tác vụ sau khi một quá trình khác hoàn thành, mà không chặn chương trình

### 2. Prototype - tạo một method
---
```javascript
  Array.prototype.__printName = (name) => {
	console.log('Hello my name is ' + name);
}

array.__printName('Khang');
```
__*Array, String, ...*__

### 3. Các methods hữu dụng của Array
---
- __forEach()__:  Một higher-order function => Tái sử dụng logic vòng lặp. <br>
- __map()__:      Nhận callback function => Trả về một array mới mapping với arr cũ theo logic được callback định nghĩa. <br>
- __filter()__:   Nhận callback function => Trả về array mới thỏa mãn điều kiện callback định nghĩa <br>
- __find()__:     Tìm phần tử thỏa mãn điều kiện <br>
- __every()__:    Trả về true khi tất cả phần tử thỏa điều kiện <br>
- __some()__:     Trả về true khi 1 phần tử thỏa điều kiện <br>
- __reduce()__:   Hàm thực hiện *cộng dồn*; Tallying <br>
- __sort()__:     Sắp xếp theo chuẩn ascii sort((a,b) => a - b) *nên thử a - b và a + b để chọn thứ tự* <br>

### 4. Set data structure
---
- Khá giống Array nhưng không lưu giá trị trùng nhau
- Các method: add, has, delete, size, clear
- output của set : - Set(7) {0, 1, 2, 3, 4, 5, 6}
- Có thể dùng forEach()
- convert to Array

### 5. Map data Structure
---
- Lưu trữ theo <key, value> giống Object
- Tốc độ truy vấn nhanh hơn Object
- output của map: {'name' => Khang, 1 => 'blue', 2 => 'red'}
- methods: set, get, size, has, delete, clear, keys, values, entries (trả về tất cả cặp key, value)
- Có thể dùng forEach().

---
💡 Khó nhớ được hết syntax, chưa quen với map và set data structure
---
### 6. Execution Context
---
__Gồm 2 phases__ : Memory Creation và Execute Phase
- __Memory Creation__: Khởi tạo bộ nhớ và lưu nhũng biến (undefined), hàm (những phần tử trong hàm) được khai báo 
- __Execute Phase__: Code được thực thi line by line. Gán các giá trị cho biến vào bộ nhớ, skip hàm nếu chưa có lời gọi. Sẽ tạo execution context mới cho mỗi function call (cũng có 2 phases tương tự).

### 7. Call Stack - Một trong những cấu trúc quan trọng
---
- Đây là stack của các functtions được thực thi.
	- Nếu gọi hàm riêng lẻ, function này xong function tiếp theo mới vào stack
 	- Nếu gọi hàm lồng nhau, các function vào stack lần lượt và thực hiện theo FILO để giải phóng bộ nhớ.
 - Nếu trong trường hợp quá nhiều functions trong call stack, hay vòng lặp vô tận => đứng chương trình.

### 8. Đồng bộ và bất đồng bộ
---
- __Đồng bộ (Synchronous)__: Câu lệnh thực thi tuần tự, dòng sau chỉ chạy khi dòng trước hoàn thành. Hậu quả: nếu tác vụ tốn thời gian => chặn luồng chính. ***blocking-code***
- __Bất đồng bộ (Asynchronous)__: Một số tác vụ không cần chờ hoàn thành ngay lập tức, chúng chạy ngầm. ***non-blocking-code***
- JavaScript là ngôn ngữ chạy bất đồng bộ. JS đơn luồng như có cơ chế Event Loop nên vẫn xử lý bất đồng bộ.

### 9. setTimeout(callback, milliseconds, param1, param2, ...)
---
- Thực hiện sau callback sau milliseconds (1000 = 1s)
- setInterval(function, milliseconds,...) thực hiện sau mỗi milliseconds.
```javascript
	let interval setInterval(() => {
		console.log("interval");
	}, 2000);
	
	setTimeout(() => {
		clearInterval(interval);
	}, 6000);
```
***Sau mỗi 2s thực hiện interval, sau 6s thì clearInterval***

### 10. Promise 
---
- Khi thực hiện một tác vụ đôi khi cần nhiều thời gia để hoàn thành
- Tác tác vụ phía sau cần kết quả của tác vụ này.
=> Promise - 3 trạng thái
	- Pending : Khoảng thời gian hứa thực hiện tác vụ
	- Resolved (fullfilled) : Kết quả đã được trả về
	- Rejecteed : Kết quả không thành công
```javascript 
 const promise = new Promise((resolve, reject) => {
 	resolve("Success!");
	reject("Rejected!");
 });
 
 promise.then((result) => {
 	console.log(result);
   })
   .catch((error) => {
   	console.log(error);
   });
```
***Chỉ có thể là promise mới có thể sử dụng .then và .catch***
- Resolve và Reject nhận kết quả gì thì .then và .catch nhận lại kết quả đó.

### 11. Event Loop
---
Các hàm lần lượt vào Call Stack:
- Nếu là các hàm bình thường => thực hiện và giải phóng stack
- Nếu là [DOM API, setTimeout, setInterval, AJAX, fetch] => Vào WebAPIs, giải phóng call stack
	- Nếu là promise => vào MICROSTASK QUEUE (Hàng đợi ưu tiên vào call stack trước)
	- Còn lại vào Task Queue
	- FCFS (First Come First Serve) 

### Khi nên và không nên sử dụng arrow function:
**Nên sử dụng:**
- Phù hợp với các hàm ngắn đơn giản, đặc biệt khi truyền vào một callback
- Bảo toàn ngữ cảnh ```this``` : Arrow function không có this riêng mà kế thừa this từ ngữ cảnh bao quanh. Hữu ích trong các callback hoặc làm việc với các đối tượng.
- Callback ngắn trong các phương thức mảng.
- Hàm inline không cần tái sử dụng.
**Không nên sử dụng:**
- Khi cần this động, không phù hợp khi cần thay đổi dựa trên cách hàm được gọi.
- Trong phương thức của đối tượng, this sẽ trỏ về đối tượng bao quanh thay vì đối tượng hiện tại.
- Không thể dùng trong hàm khởi tạo constructor vì không có this riêng hoặc prototype

