// studentRegister 안의 input

// onkeyup -> 사용자가 키보드에서 손을 뗐을 때 실행
// onkeyup='${}' 함수명만 받고 뒤에 (event)는 해당 함수명의 매개변수
// 이 실습에서 onkeyup에 넣어주는 함수는 handleRegisterOnkeyup(e) 이다.
// 비구조 할당
function studentRegisterInput({ type, name, onkeyup }) {
  return `
        <div>
            <input type='${type}' name='${name}' autocomplete='off' onkeyup='${onkeyup}(event)'/>
        </div>
    `;
}
