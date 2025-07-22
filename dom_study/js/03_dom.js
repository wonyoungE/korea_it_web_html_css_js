// 번호가 1나씩.. 올라가야 됨..

const table = document.querySelector("table");
table.style = "border-collapse: collapse;";
const thList = document.querySelectorAll("th");
thList.forEach(
  (th) =>
    (th.style =
      "background-color: #d4f2d0; border: 1px solid black; padding: 0 10px;")
);

const submitBtn = document.querySelector(".add-btn");
let number = 1; // 변하는 값, 전역 상태

submitBtn.onclick = () => {
  const name = document.querySelector("#input-name");
  const age = document.querySelector("#input-age");
  const address = document.querySelector("#input-address");

  // 태그 안의 값 가져오기 -> xxx.value
  if (name.value === "" || age.value === "" || address.value === "") {
    alert("모든 정보를 입력해주세요");
    return;
  }
  // tbody 태그 안에 넣을 것
  const tableBody = document.querySelector(".table");
  // 테이블 행 추가
  tableBody.innerHTML += `<tr>
                            <td>${number++}</td>
                            <td>${name.value}</td>
                            <td>${age.value}</td>
                            <td>${address.value}</td>
                        </tr>`;
  // 초기화
  name.value = "";
  age.value = "";
  address.value = "";
  
  const tdList = document.querySelectorAll("td");
  tdList.forEach(
    (td) => (td.style = "border: 1px solid black; text-align: center;")
  );
};
