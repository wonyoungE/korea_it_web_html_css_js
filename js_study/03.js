// 객체
// 객체를 student에 할당
const student = {
  name: "손원영",
  age: 26,
};

console.log(student);
console.log(student.name);
console.log(student.age);
console.log(student["name"]);
console.log(student["age"]);
const a = "name";
const b = "age";
console.log(student[a]);
console.log(student[b]);

student[a] = "손원일";
console.log(student);
student.name = "손원이";
console.log(student);

// 객체에 함수를 추가하는 방법
// 키 값이 printName인거고 익명 함수
student.printName = () => {
    console.log("이름: ", student.name);
}

student.printName()
const loginButton = {
    text: "로그인",
    value: "text",
    onclick: () => {
        console.log(loginButton.text);
    }
}

loginButton.onclick();
loginButton.onclick = () => {
    console.log("로그인 버튼을 클릭하였습니다.");
}

loginButton.onclick();

console.log(typeof loginButton) // object

// Object.keys(), Object.values(), Object.entries()
const loginButtonKeys = Object.keys(loginButton);
console.log(loginButtonKeys)

for(let i = 0; i < loginButtonKeys.length; i++) {
    const keyName = loginButtonKeys[i];
    console.log(loginButton[keyName])
}

const loginButtonValues = Object.values(loginButton)
console.log(loginButtonValues)

for(let i = 0; i < loginButtonValues.length; i++) {
    console.log(loginButtonValues[i])
}

const loginButtonEntries = Object.entries(loginButton)
console.log(loginButtonEntries)

for(let i = 0; i < loginButtonEntries.length; i++) {
    const entry = loginButtonEntries[i]
    const key = entry[0]
    const value = entry[1]
    console.log("key:", key, " value:", value)
}

// 향상된 for문
for(let entry of loginButtonEntries) {
    const key = entry[0]
    const value = entry[1]
    console.log("key:", key, " value:", value)
}