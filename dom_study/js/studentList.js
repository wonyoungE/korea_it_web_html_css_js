function handleDeleteButtonOnclick(studentId) {
    // confirm -> 확인이 true
    if(!confirm("삭제하시겠습니까?")) return;   // 취소 누르면 아무것도 안일어남
    
    // 삭제한 거랑 똑같음
    // 매개변수로 받은 id를 걸러내면 그냥 삭제한 거랑 똑같다
    studentList = studentList.filter((student) => student.id !== studentId);
    
    // 제외하고 다시 호출
    loadStudentList();
}

function loadStudentList() {
  const studentLis = studentList
    .map((student) => {
      const text = `${student.id}. ${student.name}(${student.age} - ${student.address})`;

      return `
        <li>
            ${text}
            <button onclick="handleDeleteButtonOnclick(${student.id})">삭제</button>
        </li>
    `;
    })
    .join("");

  const studentListUl = document.querySelector(".student-list");
  studentListUl.innerHTML = studentLis;
}
