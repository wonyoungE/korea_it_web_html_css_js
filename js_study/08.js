// REST 문법과 Spread 문법
const student = {
  name: "손원영",
  age: 26,
  address: "경남 김해시",
  phone: "010-1234-5678",
};

const { name, address } = student;

console.log(name, address);

// REST 문법 ...변수명
// 비구조 할당이 되지 않은 나머지 속성들을 새로운 객체 또는 배열로 묶을 때 사용
const { age, phone, ...a } = student;
console.log(age, phone, a); // 26 010-1234-5678 { name: '손원영', address: '경남 김해시' }

const numbers = [1, 2, 3, 4]
const [n1, n2, ... ns] = numbers
console.log(n1, n2, ns)  // 1 2 [3, 4]

// Spread 문법
// 기존 객체의 모든 속성을 새로운 객체에 복사하거나,
// 새로운 속성을 추가할 때 사용
const newStudent = {
    ...student, // student 객체에 있던 모든 속성을 여기에 복사
    gender: "여",   // gender라는 새로운 속성 추가
}
console.log(newStudent)

const newNumbers = [...numbers, 5, 6]
console.log(newNumbers)

let names = []
// 재할당
function addName(name) {
    names = [...names, name]
}
addName("손원영")
addName("손원영2")
console.log(names)

let obj = {
    data1: "data1",
    data2: "data2",
};

function addProps(props) {  
    // 객체를 추가하므로 객체의 속성을 풀어야한다.. (키-밸류)
    obj = {...obj, ...props}
}

// 여러 개의 속성이 있는 객체
// 키-밸류의 객체 형태로 들어가니까 걍 무조건 ...props
addProps({data3: "data3", data4: "data4"});
console.log(obj)