// 학생 등록

let studentInputValue = {
  id: 0,
  name: "",
  age: "",
  address: "",
};

// input 태그에 무언가를 넣으면 호출되는 함수
function handleRegisterOnkeyup(e) {
  studentInputValue = {
    ...studentInputValue,
    // 덮어쓰기하는 거 아님?? -> 그러면 한 번 바꿨을 때 ""면 안되는 거 아닌가 ㅜ 초기화 언제 해준 거
    // 그래서 내가 backspace로 지워주면 -> 이것도 onkeyup에 해당돼서 ""되는 거
    [e.target.name]: e.target.value, // input 태그의 name 속성을 key로 잡음
  };
}

const handleRegisterOnClick = (e) => {
  //   let newId = 1;

  //   // 배열의 마지막 학생 가져오기
  //   // 학생 배열이 0보다 크면 = 배열에 값이 있으면
  //   if (studentList.length > 0) {
  //     const lastStudent = studentList[studentList.length - 1];
  //     // 마지막 학생의 id에서 +1
  //     newId = lastStudent.id + 1;
  //   }

  // spread 문법
  const newStudent = {
    ...studentInputValue,
    id: studentList.length + 1,
  };

  studentList = [...studentList, newStudent];

  console.log(newStudent);
  // input 태그 초기화
  const inputList = document.querySelectorAll("input");
  console.log(inputList);
  inputList.forEach((i) => (i.value = ""));

  // 유효성 검사 안하면 이전에 등록했던 객체 정보 그대로 들어있음
  // 초기화 해주자
  studentInputValue = {
    name: "",
    age: "",
    address: "",
  };

  loadStudentList();
};

// 이름, 나이, 주소 받는 input 태그 3개 들고올 거
// input 태그에 들어갈 onkeyup 속성은 함수를 받음
// 함수명만 줘서 Input js에서 함수명 넣어줌
function studentRegister() {
  return `
        <div>
            ${studentRegisterInput({
              type: "text",
              name: "name",
              onkeyup: "handleRegisterOnkeyup",
            })}
            ${studentRegisterInput({
              type: "text",
              name: "age",
              onkeyup: "handleRegisterOnkeyup",
            })}
            ${studentRegisterInput({
              type: "text",
              name: "address",
              onkeyup: "handleRegisterOnkeyup",
            })}
            <div>
                <button onclick="handleRegisterOnClick()">등록</button>
            </div>
        </div>
    `;
}
