# DOM 
---
### 1. DOM - Document Object Models ?
---
- Một cấu trúc của trang web __tree structure__ với mỗi node bao gồm đối tượng (object) có trong document.
- Ta có thể interact với DOM thông qua JavaScript.
- DOM bao gồm: HTML tags,_ attributes, text nodes_, ...
- Tree Structure:  Windows -> Document -> HTML -> Các thành phần con....
   - root là Document và node đầu tiên thường là html
### 2. Window object?
---
- the topmost object: Biểu diễn cho cửa sổ browser, hoặc frame để hiển thị nội dung của trang web.
- Mỗi khi cửa sổ xuất hiện thì window object được tạo.

### 3. Select elements?
---
| Phương thức | Cơ chế | Ghi chú  |
|:-------|:------:|-------:|
|  document.getElementById('id')  |  Chọn 1 phần tử dựa trên id duy nhất  |  null nếu không tìm thấy  |
|  document.getElementsByClassName('className') |  Chọn tất cả phần tử cùng class  |   Trả về HTMLColection tương tự array  |
|  document.getElementsByTagName('tagName') | Chọn tất cả các phần tử theo tên tag | => HTMLColection |
|  document.getElementsByName('name')| Chọn các phần tử dựa trên thuộc tính name . |NodeList, thường dùng cho form |
|  document.querySelector('selector')| Chọn phần tử đầu tiên khớp với (CSS selector) |null nếu không tìm thấy|
|  document.querySelectorAll('selector')| Chọn tất cả các phần tử khớp với bộ chọn CSS. | Trả về Nodelist, có thể duyệt bằng forEach|
|  element.parentElement; <br> element.children; <br> element.nextElementSibling; <br> element.previousElementSibling <br> element.first(last)ElementChild| Chọn thông qua quan hệ cha-con, anh-em||

**_Chú ý !_**
   - querySeletor và querySelectorAll linh hoạt và hỗ trợ bất kỳ một CSS selector nào
   - getELement tuy cũ nhưng nhanh nhất khi chọn theo ID
   - HTMLCollection tự động cập nhật khi DOM thay đổi, NodeList thì không !!!
   - Có thể dùng for forEaxh để duyệt NodeList và HTMLCollection, hoặc dùng Array.from() để chuyển thành mảng_

**_querySelector_**
- document.querySelector('h1') - tag
- document.querySelector('#app-title') - id
- document.querySelector('.container') - class
- document.querySelector('input[type="text"]') - tìm phần tử đầu tiên trong DOM có filter (thẻ input thuộc tính type = 'text')
- document.querySelector('li:nth-child(2)') - element li thứ 2 trong list 
### 4. Get/Change content, style?
---
```javascript
  const title = document.getElementByÌ('app-title');
  //Change content
  title.textContent = 'Hello world';
  title.innerText = 'Hello Again';
  title.innerHTML = '<strong> Shopping List </storng>';
  
  //Change styles
  title.style.color = 'red';
```
### 5. All Nodes
```javascript
    parent.childNodes;
    parent.childNodes[0].nodeName; //textContent,innerHTML,outterHTML
```
- Khoảng trắng là text node
- Comment cũng là một node

**So sánh NodeList với HTMLCollection**
- HTMLCollection: 
  - 1 tập hợp document elements. 
  - Truy cập bằng (name, id, index)
  - LIVE: tự động cập nhật khi có thay đổi trong DOM
- NodeList: 
  - 1 tập hợp các document nodes (element nodes, attribute nodes và text node). 
  - Truy cập chỉ bằng index.
  - LIVE: querySelectorAll. STATIC: childNodes,... không cập nhật khi có thay đổi trong DOM
 
 Dùng HTMLCollection khi:
- Cần hiệu suất cao với truy vấn đơn giản (tag/class).
- Cần danh sách live để theo dõi thay đổi DOM.
- Làm việc với các phần tử con trực tiếp (children).
Dùng NodeList khi:
- Cần truy vấn phức tạp với bộ chọn CSS (querySelectorAll).
- Muốn danh sách tĩnh, không thay đổi khi DOM cập nhật.
- Cần duyệt trực tiếp với forEach hoặc làm việc với các nút không phải phần tử (text, comment).

6. Create and Append Elements
---
- Có thể tạo và chèn Elements bất cứ vị trí nào trong DOM
```javascript
  //Create Element
  const div = document.createElement('div');
  div.className = 'my_element';
  div.innerText = 'Hello world';
  
  const text = document.createTextNode('Hello world');
  div.appendChild(text);
  
  //document.body.appendChild(div);
  document.querySelector('ul').appendChild(div);
```
- Tạo node mới và appendChild sẽ clean và performant hơn so với thêm bằng innerHTML
### 7. Insert Element, Text and HTML
---
- Có thể dùng các hàm: 
```javascript
   insertAdjacentElement(position, element); //Phải khởi tạo element trong DOM
   insertAdjacentText(position, Text);
   insertAdjacentHTML(position, HTML);
   insertBeforeItem(element, item_next); //ul.insertBeforeItem(li, thirdItem);
   //insertAfterItem = ul.insertBeforeItem(li, thirdItem.siblingnextElementSibling);
```
- Position có thể là: 
   - beforebegin: Phải là sibling trước của thẻ hiện tại
   - afterbegin:  Là first-child của thẻ hiện tại
   - beforeend:   Là last-child của thẹ hiện tại
   - afterend:    Là sibling sau của thẻ hiện tại.
**Lưu ý: **
- Khi sử dụng insertAdjacentHTML, cần vệ sinh dữ liệu người dùng để tránh rủi ro XSS

### 8. Replace Element
---
- Replace với method replaceElementWith(new Element).
- Replace ghi đè bằng outterHTML.

### 9. Remove Element
---
- remove: element.remove()
- removeChild: parent.removeChild(child);

### 10. Styles and Classes
- element.classList.add('bg-red') => Thêm class để set backgroud red.
- element.classList.remove('bg-red') => Xóa class gỡ backgroud
- text.classList.toggle('bg-red') => Thêm hoặc xóa class sau mỗi lần  

---
# EVENTS
---
### 1. Event Listerners
- Events là những hành động, sự xuất hiện diễn ra trên hệ thống và yêu cầu code của chúng ta phải react nó.
- Một số event
   - Clicking on an element
   - Typing into a text field
   - Hovering
   - Submitting
   - Closing windows
   - Dragging an element
   - Resizing
- Javascript Event Listeners: **element.addEventListener('action', callback)**.<br>
_**Nếu viết chỉ định nghĩa nhiều hành động cho 1 event mà không dùng eventListener thì chỉ function cuối được thực hiện. addEventListener cho phép nhiều hành động**_
- Trong trường hợp ngăn chặn sự kiện trùng lặp hoặc một khoảng thời gian cụ thể không cần xử lý event => Sử dụng method removeEventListener()

### 2. Mouse Events
---
```javascript
   logo.addEventListener('click', () => {
      console.log('on Click')
   })
```
- Event Listeners:
   - click, dblClick
   - contextmenu (rightClick)
   - mousedown (click and hold)
   - mouseup (stop holding)
   - wheel (hover and scroll)
   - mouseover (mouse over)
   - mouseout (mouse out)
   - dragstart (drag start)
   - drag (onDrag)
   - dragend(drag end)
  
 ### 3. Event Object
 ---
 ```javascript
   logo.addEventListener('click', function(e) {
      console.log(e.property)
   });
 ```

 | event properties | Tác dụng|
 |:---------:| :-----------: |
 | e.type | Loại event được kích hoạt|
 | e.target| element kích hoạt event |
 | e.currentTarget| element được gắn liền với event (định nghĩa event)|
 | timestamp | Thời gian sự kiện được kích hoạt|
 | clientX/clientY| Khoảng cách |
 | clientX/clientY| Tọa độ X/Y của trỏ chuột so với cửa sổ trình duyệt (viewport)|
 | offsetX/offsetY| Tọa độ X/Y của trỏ chuột so với element|
 | pageX/pageY| Tọa độ X/Y của chuột so với toàn bộ trang (kể cả phần đã cuộn)|
 | screenX/screenY| Tọa độ X/Y của chuột so với màn hình (screen).|
 
 ### 4. Keyboard event
 ---
 ```javascript
   itemInput.addEventListener('keypress', event => {})
//keyup, keydown

// event.key => ký tự được nhấn

//event.keycode
//https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode

//event.code press'a' => event.code = KeyA, '1' => event.code = Digit1 

//e.repeat => hold key

 ```
 ### 5. Input Event
 ```javascript
   itemInput.addEventListener('input', (e) => {});

//Select list 
priorityInput.addEventListener('change', (e) => {});

//Checkbox
checkbox.addEventListener('input', (e) => {
	console.log(e.target.checked); //true, false
});

itemInput.addEventListener('focus', (e) => {}); //click inside
itemInput.addEventListener('blur', (e) => {}); // click outside
 ```
 ### 6. Event Bubbling
 ---
 - Là cơ chế hoạt động trong DOM events, sự kiện sẽ được bubbling từ phần tử con  (nơi nó bắt đầu sự kiện) đến các phần tử cha trong DOM.
- Nếu addEventListener cho con và các cha của nó, thì thực hiện lần lượt từ con nhỏ nhất xảy ra event đến cha cuối cùng

### 7. Window Event?
---
| event | Mô tả | Dùng khi nào |
|:-----|:------:|------:|
| DOMContentLoaded | Xảy ra khi toàn bộ HTML được tải và phân tích cú pháp, trước khi các tài nguyên phụ như hình ảnh, stylesheet được tải xong | muốn thao tác DOM ngay sau khi nó sẵn sàng, mà không cần đợi toàn bộ trang tải xong | 
| resize | Xảy ra khi kích thước của cửa sổ trình duyệt thay đổi.| muốn thay đổi giao diện theo kích thước màn hình (responsive), hoặc cập nhật thông tin hiển thi|
|scroll| Xảy ra khi người dùng cuộn trang| Để thực hiện hiệu ứng khi cuộn trang, ví dụ lazy loading, hiệu ứng parallax, hoặc để theo dõi hành vi người dùng|
|focus/blur| focus - Xảy ra khi cửa sổ trình duyệt được chọn/ blur thì ngược lại| |

 