const submitBtn = document.querySelector(".input-button");

submitBtn.onclick = () => {
  const input = document.querySelector(".inputs");
  const dataList = document.querySelector(".data-list");  // ul 태그

  // 입력 안했을 경우 알림창 띄우고 종료
  // return 안하면 아래 코드 실행됨
  if(input.value === "") {
    alert("입력값이 없음!");
    return;
  }
  
  // ul태그 안에 li태그 넣기
  dataList.innerHTML += `<li>${input.value}</li>`;
  input.value = ""; // 값 입력 후 초기화
};
