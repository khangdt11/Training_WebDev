# Promise
---
# Functional Progamming Partterns
---
- Callback và Higher-Order Function thường được sử dụng cho Functional Progamming
- Chia logic riêng biệt -> dễ xử lí, dễ bảo trì.

# Event-Driven Programming
---
- Ngôn ngữ hướng sự kiện

# Aysnchronous Code
---
- Sẽ thực hiện callback khi toán sử bất đồng bộ hoàn thành (VD: setTimeOut())
---
=> Callback hữu dụng trong cả
- Functional Progamming Partterns
- Event-Driven Programming <br>
Nhưng không hữu dụng cho Aysnchronous. Vì diễn ra hiện tương **Callback HEll** - Các callback function lồng nhau, xung đột và khó maintain, khó đọc, debug.
---
# PROMISE GIẢI QUYẾT VẤN ĐỀ TRÊN
---
- Là một đối tượng trong JS đại diện cho một tác vụ bất đồng bộ có thể hoàn thành trong tương lai.
---
- Bao gồm các trạng thái:
  - Pending : Đang xử lí chưa có kết quả
  - Resolved : Xử lý và get kết quả thành công
  - Rejected : Trong trường hợp xảy ra lỗi
 
 ### 1. .then và .catch
 ---
 **Cú pháp**
 ```javascript
  const baseURL = 'URL';
  fetch(baseURL).then((response) => {
    Xử lí tác vụ nếu onFullFill
  })
  .catch((error) => {
    Thông báo, xử lí nếu onRejected
  })
 ```
 ### 2. Chuỗi Promise
 ---
 - Trường hợp khi cần thực hiện tuần tự Promise 1-2-3 ...
 - Khi API phụ thuộc lần nhau
 - **Cú pháp**
 ```javascript
     fetch(BASE_URL + "1")
     .then(() => {
        cosole.log('1');
        fetch(BASE_URL + "2")
        .then(() => {
          console.log('2');
        })
        .catch((error) => {
          console.log('error2', error);
        })
     })
     .catch((error) => {
        console.log('error1', error);    
      })
 ```
 Promise 2 đợi Promise 1 thực hiện xong. <br>
 CallBack Hell và .catch xuất hiện nhiều lần => Cách sử dụng ngắn gọn hơn
 ```javascript
  fetch(BASE_URL + '1')
    .then(() => {
      return fetch(BASE_URL + '2');
    })
    .then(() => {
      return fetch(BASE_URL + '3');
    })
    .catch(() => {});
 ```
 
### 3. Asysn/Await
---
- Đây là Syntax mới hơn và có chức năng như then và catch (mới hơn)
- **Async** Từ khóa được đặt trước một function chỉ định rằng hàm đó bất đồng bộ và có Promise
- **Await** Từ khóa được sử dụng trong function async, dùng để tạm dừng việc thực thi hàm cho đến khi Promise được giải quyết.
- Hiện nay trình duyệt hỗ trợ không đặt đặt async await theo hàm<br>
_=> Giúp giảm tích phức tạp việc sử dụng .then() và .catch trong Promise Chain_
```javascript
  try {
    async function fetchData (id) {
    cosnt response = await fetch(BASE_URL + id); // Dừng việc thực thi đợi kết quả từ hàm này;
    const data = await response.json();
  } catch((error) {
    console.log(error);
  });
```
### 4. Promise.any
---
- Chỉ cần có 1 Promise thành công, Promise cha sẽ trả về FullFill
- Trả về rejected ngay lập tức nếu có 1 Promise bị rejected
- Tất cả Promise con đều Rejected => Promise.any trả về Rejected 
- **Reimplement**
```javascript
  function promiseAny (promises) {
    return new Promise((resolve, reject) => {
        let errors = [];

        for ( const promise of promises) {
            Promise.resolve(promise)
            .then((r) => r.json)
            .then((r) => resolve(r))
            .catch((err) => {
                errors.push(err);
            })
            .finally(() => {
                if(errors.length === promises.length) {
                    reject(errors);
                }
            });
        }

    });
};

async function promiseAnyAsync (promises) {
    return new Promise((resolve, reject) => {
        let errors = [];
        for ( const  promise of promises) {
        (async () => {
             try {
                 let r = await promise;
                 r = await r.json();
                 resolve(r);
             } catch (err) {
                 errors.push(err);
             } finally {
                 if (errors.length === promises.length) {
                    reject(errors);
                 }
             }
         })(); 
        }
        
    });
} 
```

### 5. Promise.all() => Many calls, in sequence
---
- Trả về fullfill nếu tất cả fullfill
- Optimize thời gian call API
- **Reimplement**
```javascript
  function promiseAll (promises) {
    return new Promise ((resolve, reject) => {
        let success = [];
        for (const promise of promises) {
            Promise.resolve(promise) 
            .then((res) => {
                res.json();    
            })
            .then((res) => {
                success.push(res);
            })
            .catch((err) => {
                reject(err);
            })
            .finally (() => {
                if(screen.length === promises.length) {
                    resolve(success);
                }
            })
        }
    });
}

async function promiseAllAsync (promises) {
    return new Promise ((resolve, reject) => {
        let results = [];
        for (const promise of promises) {
            (async () => {
                try {
                    const res = await Promise.resolve(promise);
                    results.push (res);                   
                } catch (error) {
                    reject(error);
                } finally {
                    if(results.length === promises.length) {
                        resolve(results);
                    }
                }
            })();
        }
    })
}
```

### 6. Promise.allSettled()  
---
- Luôn được fullfill có status cho kết quả của mỗi đối tượng
- **Reimplement**
```javascript
  async function promiseAllSettle (promises) {
    return new Promise(  (resolve) => {
        let settleResults = [];
           promises.forEach(async (promise) => {
                try {
                    const res = await promise;
                    settleResults.push({
                        status: 'fullfilled',
                        value: await res.json(),
                    });
                } catch (error) {
                    settleResults.push({
                        status: 'rejected',
                        reason: error
                    });
                } finally {
                    if (settleResults.length === promises.length) {
                        resolve (settleResults);
                    }
                }
           });
    });
}
```


### 7. Promise.race()
---
- Trả về kết quả của Promise trả về đầu tiên.
**Reimplement**
```javascript
  async function racePromise(promises) {
    return new Promise ((resolve, reject) => {
        promises.forEach(async(promise) => {
            try {
                const res = await Promise.resolve(promise);
                resolve(res);
            } catch (error) {
                reject(error);
            }
        })
    }) 
}
racePromise(promises).then(result => {
    console.log(result);
})
```

### ❓Tại sao async/await không thay thế hoàn toàn được Promise.then()?
---
- **async/await** chỉ hoạt động bên trong một function có khóa async -> không tiện xử lí phạm vi ngoài hàm
- Khi xử lý song song, .then() đôi khi tối ưu hơn vì không chờ lần lượt.
=> async/await tiện cho xử lý tuần tự, then() linh hoạt hơn trong luồng xử lý không tuần tự hoặc function chaining.

### ❓ Khi nào nên dùng Promise chain thay vì async/await?
--- 
- Khi cần truyền kết quả qua từng bước rõ ràng bằng .then()
- Khi code theo hướng Functional
- Khi bạn cần kết hợp với các thư viện không hỗ trợ async/await tốt

### ❓AbortController
- Cho phép hủy Promise đang pending, hữu ích với fetch
```javascript
  const controller = new AbortController();
  fetch(url, { signal: controller.signal });
  controller.abort(); // sẽ khiến fetch bị rejected
```





 