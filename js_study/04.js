// 배열
const arr1 = [] // 빈 배열
const arr2 = new Array();   // 빈 배열

// 새로운 요소 추가
arr1.push(10)
arr1.push(20)
arr1.push(30)
arr1.push(40)
console.log(arr1)

arr2.push(10)
arr2.push(20)
arr2.push(30)
arr2.push(40)
console.log(arr2)

// 배열과 객체의 참조 비교 => 자바스크립트에서 객체(배열 포함)는 참조 타입
// ===는 객체의 경우 메모리 주소(참조)가 같은지 비교
console.log(arr1 === arr2)  // false
// arr1과 arr2는 내용이 같더라도 서로 다른 메모리 공간에 있는 별개의 객체이므로 false가 출력된다.

const obj1 = {key1: "value", key2: "value"}
const obj2 = {key1: "value", key2: "value"}
console.log(obj1 === obj2) // false
// obj1과 obj2도 내용이 같더라도 별개의 객체

const str1 = "손원영"
const str2 = "손원영"
console.log(str1 === str2)  // true

// JSON(JavaScript Object Notation)
// 자바스크립트 객체/배열과 JSON 문자열 간의 변환
// JSON.stringify() => 자바스크립트 객체 또는 배열을 JSON 형식의 문자열로 변환
// JSON.parse() => JSON문자열을 자바스크립트 객체 또는 배열로 변환
const json1 = JSON.stringify(arr1);
const json2 = JSON.stringify(arr2);
console.log(json1)
console.log(typeof json2)
console.log(json1 === json2) // JSON문자열은 값이 같으면 동일하다고 판단 == string이라서 같은 메모리 주소 참조 자바에서 했던 거랑 똑가툼

const json3 = JSON.stringify(obj1)
const json4 = JSON.stringify(obj2)
console.log(json3)
console.log(typeof json4)
console.log(json3 === json4) // true

// 배열의 다양한 기본 내장 함수
const names = ["손원영", "손원일", "손원이"]
// 요소 추가: push()
names.push("손원삼")
console.log(names)
// const -> 상수인데 값을 추가할 수 있음? ㅇㅇ
// const가 재할당을 금지하는 것이지 참조하는 객체 배열의 내용 변경까지 막는 것은 아님
// 그니까 names = ["이동윤", "삼동윤" "사동윤"] <<< 이거 안된다는거

// 요소 제거: pop() => 배열의 마지막 요소를 '제거하고' 그 요소를 반환
console.log(names.pop())

// 요소 수정/삽입/제거: splice(삽입될 인덱스, 제거할 개수, 추가할 요소)
names.splice(1, 0, "손원오")
console.log(names);

// 요소 찾기: find() => 주어진 테스트 함수를 만족하는 배열의 첫 번째 요소를 반환
const findFx = (n) => n === "손원오"
const foundName = names.find(findFx);   // findFx를 만족하는 첫번째 요소를 반환
console.log(foundName)