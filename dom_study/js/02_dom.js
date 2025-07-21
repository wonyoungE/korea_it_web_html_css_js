const submitBtn = document.querySelector(".input-button");

submitBtn.onclick = () => {
  const input = document.querySelector(".inputs");
  const dataList = document.querySelector(".data-list");

  if(input.value === "") {
    alert("입력값이 없음!");
    return;
  }

  dataList.innerHTML += `<li">${input.value}</li>`;
  input.value = ""; // 값 입력 후 초기화
  
};
