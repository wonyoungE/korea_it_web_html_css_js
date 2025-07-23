const todoInput = document.querySelector("#todoInput");
const addTodoBtn = document.querySelector("#addTodoBtn");
const todoList = document.querySelector("#todoList");

let todos = [];
let nextTodoId = 1;

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
