// studentRegister 안의 input

// onkeyup='${}' 함수명만 받고 뒤에 (event)는 해당 함수명의 매개변수
// 이 실습에서 onkeyup에 넣어주는 함수는 handleRegisterOnkeyup(e) 이다. 
function studentRegisterInput({ type, name, onkeyup }) {
  return `
        <div>
            <input type='${type}' name='${name}' autocomplete='off' onkeyup='${onkeyup}(event)'/>
        </div>
    `;
}
