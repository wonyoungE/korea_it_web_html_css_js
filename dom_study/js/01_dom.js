// 태그의 id를 통해 선택
const title1 = document.getElementById("title");
console.log(title1); // h1#title
console.log({ title1 }); // {}로 감싸면 비구조 할당, 결과: {title1 : h1#title}

// 태그의 class를 통해 선택
const titles = document.getElementsByClassName("title");
console.log(titles); // HTMLCollection(2) [h2.title, h3.title]

// 태그명을 통해서 선택
const h3 = document.getElementsByTagName("h3");
console.log(h3); // HTMLCollection [h3.title]

const d1 = document.getElementById("d1");
const d2 = document.getElementById("d2");
console.log(d1);
console.log(d2);

// querySelector -> css 선택자 이용, 성능 상 좀 더 빠름~
const title2 = document.querySelector("#title"); // id 선택, 단일 선택
console.log(title2);
console.log(title2.innerHTML); // 태그 안의 값
title2.innerHTML = "다른 제목"; // 태그 안의 값을 바꿀 수 있음

const titles2 = document.querySelectorAll(".title"); // class 선택, 다중 선택
console.log(titles2);

const h3s = document.querySelectorAll("h3"); // id, class, tag가 h3인 요소 찾기
console.log(h3s); // NodeList(2) [h3.title, h3#h3title]

// d1안의 d2안의 값 바꾸기
const d11 = document.querySelector("#d1");
const d22 = d11.querySelector("#d2");
d22.innerHTML = "손원영";

const d222 = document.querySelector("#d1 > #d2");
d222.innerHTML = "<p>innerHtml</p>"; // innerHTML -> 안에 태그 넣기 가능;;
d222.innerText = "<p>innerText</p>"; // innerText -> 아예 텍스트 형식으로 넣기

const students = [
  { name: "손원영", age: 26, address: "경남 김해시" },
  { name: "이동윤", age: 27, address: "부산 사하구" },
  { name: "최호진", age: 17, address: "시애틀" },
];

const studentTableTbody = document.querySelector(".student-table > tbody");
// students 배열의 객체 하나하나를 html로 변환
const studentTrs = students.map((s, index) => {
  return `<tr>
    <td>${index + 1}</td>
    <td>${s.name}</td>
    <td>${s.age}</td>
    <td>${s.address}</td>
    </tr>`;
});

studentTableTbody.innerHTML = studentTrs.join(""); // studentTrs의 테이블 행 문자열 합치기

// css style 추가 가능
const tdList = document.querySelectorAll("td");
tdList.forEach((td) => (td.style = "border:1px solid black"));

const studentTb = document.querySelector(".student-table");
studentTb.id = "table-student"; // id 추가
studentTb.classList.add("student")  // class 추가
studentTb.classList.remove("student-table")   // class 제거, 동기라서 위에서 다 처리된 후에 실행되는거라 변화 x

