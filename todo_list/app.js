const addTodoBtn = document.querySelector("#addTodoBtn");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");

let todos = [];
let todoId = 1;

// 할 일 추가했을 때 화면에 띄우기
// 로직
// ul 태그 안을 싹 지우고 다시 다 넣어줄 것
function renderTodo() {
  todoList.innerHTML = "";

  // 수정중인 상태와 아닌 상태에 따라 li태그의 구성이 달라짐
  todos.forEach((todo) => {
    // 실행 결과: <li data-id="1">
    const listItem = document.createElement("li");
    listItem.dataset.id = todo.id;

    // 수정중이라면
    if (todo.isEditing) {
      console.log("수정중..");
      // rendering할 때 editing인
      listItem.classList.add("editing");
      // li 태그 안의 내용을 만들어주는 거기 때문에 += 아니고 =
      listItem.innerHTML = `
            <input type="text" class="edit-input" value=${todo.text}"/>
            <div class="todo-actions">
                <button class="save-btn">저장</button>
                <button class="cancel-btn">취소</button>
            </div>`;
    } else {
      listItem.innerHTML = `
            <span class="todo-text">${todo.text}</span>
            <div class="todo-actions">
                <button class="edit-btn">수정</button>
                <button class="delete-btn">삭제</button>
            </div>`;
    }

    // li 태그 만들었으면 todoList ul 태그의 자식으로 넣어주기..
    todoList.appendChild(listItem);
  });
}

// 추가부터 해볼게용..
// 로직
// addTodoBtn에 "click" 이벤트가 발생하면
// todo 배열에 추가.., 그리고 화면에 렌더링
addTodoBtn.addEventListener("click", addTodo);

// 엔터쳤을 때도 추가되게
//로직
// todoInput에서 keyboard 이벤트가 발생하면 수행
todoInput.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    // 엔터를 누르면 버튼에 click 이벤트 발생 시킴
    addTodoBtn.click();
  }
});

function addTodo() {
  // input 태그에서 value 가져오기
  const todoText = todoInput.value.trim();

  // 공백 제거했는데 값이 없다면..
  if (todoText === "") {
    alert("할 일을 입력해주세요.");
    return; // 함수 종료
  }

  // 값이 있다면.. 새 할 일 객체 할당
  const newTodo = {
    id: todoId++,
    text: todoText,
    isEditing: false,
  };

  todos.push(newTodo);
  console.log(todos);

  // input태그 초기화
  todoInput.value = "";
  todoInput.focus();

  renderTodo();
}

// 삭제
function deleteTodo(id) {
  // 로직
  // todos 순회하면서 해당 id 찾으면 건너뛰기
  if (!confirm("정말 삭제하시겠습니까?")) {
    // 확인이면 삭제인 것, !니까 취소일 때
    return;
  } else {
    // 삭제할 할 일의 id가 일치하지 않는 것만 가져와야 함
    todos = todos.filter((todo) => todo.id !== id);
    renderTodo();
  }
}

// 수정
function editTodo(id) {
  // 로직
  // isEditing의 상태를 true로 바꾸고.. 재렌더링
  // return 주의..
  todos = todos.map((todo) =>
    todo.id === id
      ? { ...todo, isEditing: true }
      : { ...todo, isEditing: false }
  );

  renderTodo();

  // 수정 버튼 누른 요소에 포커스 주기
  // 가변 문자열 사용 위해 백틱(``) 씀
  const editInput = todoList.querySelector(`li[data-id="${id}"] .edit-input`);
  if (editInput) {
    editInput.focus();
    editInput.select();
  }
}

// 저장
function saveTodo(id, newTodoText) {
  // 로직
  // todos 순회하면서 해당 id 찾으면 text 갈아끼워주고 isEditing 상태도 false로 변경
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, text: newTodoText, isEditing: false } : todo
  );
  renderTodo();
}

// 취소
function cancelTodo(id) {
  // 로직
  // isEditing만 false로 바꿔주면 됨
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, isEditing: false } : todo
  );

  renderTodo();
}

// li의 4가지 버튼(수정, 삭제, 저장, 취소)을 한 번에 처리
// ul 태그에 이벤트가 발생하면
todoList.addEventListener("click", (event) => {
  // 이벤트가 일어난 요소를 가져올 수 있음
  // 그렇다면 요소의 class를 기준으로 각기 다른 함수 수행
  // 여기서 이벤트가 일어난 요소는 button임
  const target = event.target;

  // li태그의 번호를 알기 위해 이벤트가 일어난 버튼으로부터 가장 가까운 li를 가져올 것
  const listItem = target.closest("li[data-id]");
  console.log(listItem);
  if (!listItem) return;

  // li태그를 가져왔다면 todo의 id를 가져올 수 있다
  const todoId = parseInt(listItem.dataset.id);

  if (target.classList.contains("edit-btn")) {
    editTodo(todoId);
  } else if (target.classList.contains("save-btn")) {
    const newTodoText = listItem.querySelector(".edit-input").value;
    saveTodo(todoId, newTodoText);
  } else if (target.classList.contains("cancel-btn")) {
    cancelTodo(todoId);
  } else if (target.classList.contains("delete-btn")) {
    deleteTodo(todoId);
  }
});
