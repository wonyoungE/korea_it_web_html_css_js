const todoInput = document.querySelector("#todoInput");
const addTodoBtn = document.querySelector("#addTodoBtn");
const todoList = document.querySelector("#todoList");

let todos = [];
let nextTodoId = 1;

function renderTodo() {
  // 하나씩 추가하는 게 x
  // ul태그 안을 싹 지우고 새로운 할 일 추가해서 넣어주기
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    // li태그를 만듦
    const listItem = document.createElement("li");
    listItem.dataset.id = todo.id; // 순회 굳이 안해도 됨
    // dataset -> 요소에 추가적인 사용자 정의 데이터 저장
    // 개발자가 특정 html 요소에 추가적인 데이터를 저장할 목적으로 사용
    // 브라우저는 이 속성들을 특별히 해석하지 않음

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
  const todoText = todoInput.value.trim(); // 공백 제거

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
    renderTodo();
  }
}

function editTodo(id) {
  // map을 돌리면서 해당하는 id의 todo의 isEditing을 true로 변환할 것
  todos = todos.map((todo) =>
    todo.id === id
      ? { ...todo, isEditing: true }
      : { ...todo, isEditing: false }
  );
  /* 혹은
  todos = todos.map((todo) => {
     return todo.id === id
      ? { ...todo, isEditing: true }
      : { ...todo, isEditing: false };
    });
  */

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
  renderTodo();
}

function cancelEditTodo(id) {
  todos = todos.map((todo) => {
    return todo.id === id ? { ...todo, isEditing: false } : todo;
  });
  renderTodo();
}

// addEventListner(인자1, 인자2)
// 인자1 -> 이벤트 종류
// 인자2 -> 이벤트 발생 시 실행할 함수, 익명함수, 그냥 함수 가능
// 함수명 vs 함수명() 차이점? 함수명()은 리소스 읽으면서 바로 호출시킴
addTodoBtn.addEventListener("click", addTodo);
// 엔터키 눌렀을 때도 등록
// 버튼 누른 거랑 같은 동작 실행
todoInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTodoBtn.click();
  }
});

// ul 태그가 갖고있는 애들한테서 일어나는 클릭이벤트 모두 감지
todoList.addEventListener("click", (event) => {
  const target = event.target; // 해당 이벤트가 일어난 요소 가져옴(여기서는 클릭)

  // 클릭된 요소의 가장 가까운 부모 li, 근데 이제 data에 id 속성을 가진
  // data-id는 HTML 태그의 속성 이름, dataset.id는 그걸 꺼내는 JS 방식
  const listItem = target.closest("li[data-id]");
  if (!listItem) return; // li 요소를 찾지 못했다면 함수 종료

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
// 이거 나중에 로그인 구현할 때 로컬스토리지에 토큰 저장해둘 것
