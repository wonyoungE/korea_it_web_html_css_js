const todoInput = document.querySelector("#todoInput");
const addTodoBtn = document.querySelector("#addTodoBtn");
const todoList = document.querySelector("#todoList");

let todos = [];
let nextTodoId = 1;

// localstorage
// 웹 브라우저가 제공하는 작은 데이터 저장 공간
// 로컬 스토리지는 항상 문자열 형태로 저장
// 이름(키)와 내용(값) 한 쌍 => JSON 문자열 형태
// 자바스크립트의 객체와 자바스크립트의 배열 두 가지 형태가 json 형태와 유사함

// 현재 todo 데이터를 로컬스토리지에 저장하는 함수
function saveTodoLocalStorage() {
  // localStorage -> getItem, setItem, removeItem

  // 저장 -> setItem(String key, String value)
  // todos 배열을 저장할 것
  // JSON.stringify(): 자바스크립트의 배열 또는 객체를 JSON 문자열로 변환
  // key: todos, value: todos의 JSON 문자열 형태
  localStorage.setItem("todos", JSON.stringify(todos));
}

// 로컬스토리지에서 todo 데이터를 불러오는 함수
function loadTodoLocalStorage() {
  // 불러오기 -> getItem(String key)
  const localStorageTodo = localStorage.getItem("todos");
  console.log(localStorageTodo); // 문자열 형태로 출력됨

  if (localStorageTodo) {
    todos = JSON.parse(localStorageTodo);
    console.log(todos); // 배열 형태로 출력됨
    // 만약에 스토리지에 저장된 것이 있다면?
    // todoId를 어떻게 구할 것??
    // 할 일을 삭제시킬 수도 있으니까.. map으로 순회해서 id가 가장 큰 값을 가져옴
    // 거기서 +1을 해줘야 다음 할 일 번호임
    if (todos.length > 0) {
      // 저장되어있는 투두를 불러와 다음 할 일을 추가할 때 사용할 ID를 설정
      // 투두들 중 가장 큰 Id를 가져와서 +1 해줌
      // Math.max()는 배열 넣어주면 알아서 제일 큰 값 반환해줌
      nextTodoId = Math.max(...todos.map((todo) => todo.id)) + 1;
    } else {
      nextTodoId = 1;
    }
  } else {
    // 로컬 스토리지의 todo가 비어있으면
    todos = [];
    nextTodoId = 1;
  }
}

function renderTodo() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    // li태그를 만듦
    const listItem = document.createElement("li");
    listItem.dataset.id = todo.id;

    // todo의 isEditing에 따라 return값 변경
    if (todo.isEditing) {
      listItem.classList.add("editing");
      // li태그 하나에 넣는 html이기 때문에 += 아니고 =
      listItem.innerHTML = `
        <input type="text" class="edit-input" value="${todo.text}"/>
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
    // appendChild -> ul의 자식으로 들어감
    // innerHTML과 같은데 차이점.. ? -> 찾아보기
    todoList.appendChild(listItem);
  });
}

function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText === "") {
    alert("할 일을 입력해주세요.");
    return;
  }

  const newTodo = {
    id: nextTodoId++,
    text: todoText,
    isEditing: false, // 수정중 여부 플래그
  };

  todos.push(newTodo);
  saveTodoLocalStorage(); // 브라우저 껐다 켜도 남아있음

  todoInput.value = "";
  todoInput.focus(); // input value 초기화 후 바로 입력 가능

  renderTodo();
}

function deleteTodo(id) {
  if (!confirm("정말 삭제하시겠습니까?")) {
    // 취소
    return;
  } else {
    // 아이디로 확인해서 거르기
    todos = todos.filter((todo) => todo.id !== id);
    saveTodoLocalStorage();
    renderTodo();
  }
}

function editTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id
      ? { ...todo, isEditing: true }
      : { ...todo, isEditing: false }
  );

  saveTodoLocalStorage();
  // idEditing 업데이트 후 다시 렌더링
  renderTodo();

  // 수정을 활성화 한 input 찾아오기
  // 주의 ** li[data-id="${id}"]
  const editInput = todoList.querySelector(`li[data-id="${id}"] .edit-input`);
  if (editInput) {
    editInput.focus();
    editInput.select();
  }
}

function saveTodo(id, newText) {
  if (newText.trim() === "") {
    alert("수정할 내용을 입력해주세요.");
  }

  todos = todos.map((todo) => {
    return todo.id === id
      ? { ...todo, text: newText.trim(), isEditing: false }
      : todo;
  });
  saveTodoLocalStorage();
  renderTodo();
}

function cancelEditTodo(id) {
  todos = todos.map((todo) => {
    return todo.id === id ? { ...todo, isEditing: false } : todo;
  });
  renderTodo();
}

// addEventListner(인자1, 인자2)
addTodoBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTodoBtn.click();
  }
});

// ul 태그가 갖고있는 애들한테서 일어나는 클릭 이벤트 모두 감지
todoList.addEventListener("click", (event) => {
  // 해당 이벤트가 일어난 요소 가져옴(여기서는 클릭된 버튼을 가져옴)
  // <button class="delete-btn">삭제</button>
  const target = event.target;
  console.log(target);

  // 클릭된 요소(버튼)의 가장 가까운 부모 li, 근데 이제 data에 id 속성을 가진
  // []: 속성 emmet 문법
  // 그래서 버튼에서 가장 가까운 li를 가져와야 id를 가져올 수 있다
  const listItem = target.closest("li[data-id]");
  if (!listItem) return; // li 요소를 찾지 못했다면(그럴 일 없긴 함) 함수 종료

  const todoId = parseInt(listItem.dataset.id);

  // 어떤 버튼을 눌렀는지 찾아서 -> 실행
  if (target.classList.contains("delete-btn")) {
    deleteTodo(todoId);
  } else if (target.classList.contains("edit-btn")) {
    editTodo(todoId);
  } else if (target.classList.contains("save-btn")) {
    const editInput = listItem.querySelector(".edit-input");
    saveTodo(todoId, editInput.value);
  } else if (target.classList.contains("cancel-btn")) {
    cancelEditTodo(todoId);
  }
});

// 로컬 스토리지 -> 어플리케이션에 배열 저장해두기
// 이거 나중에 로그인 구현할 때 로컬 스토리지에 토큰 저장해둘 것
loadTodoLocalStorage(); // 문자열 형태로 가져옴
renderTodo(); // 렌더링까지 해야 화면에 출력
