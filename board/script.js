const API_BASE_URL = "http://localhost:8080";

// 메뉴 버튼
const navSignin = document.querySelector("#nav-signin");
// DOM 요소를 객체 형태로 확인할 수 있는 방법
// console.dir(navSignin);
const navSignup = document.querySelector("#nav-signup");
const navChangepw = document.querySelector("#nav-changepw");
const navBoard = document.querySelector("#nav-board");
const navWrite = document.querySelector("#nav-write");
const navigation = document.querySelector("nav");

// 페이지
const pageSignin = document.querySelector("#page-signin");
const pageSignup = document.querySelector("#page-signup");
const pageChangepw = document.querySelector("#page-changepw");
const pageBoard = document.querySelector("#page-board");
const pageDetail = document.querySelector("#page-detail");
const pageWrite = document.querySelector("#page-write");

// 회원가입 / 로그인 / 비밀번호 변경 폼
const signupForm = document.querySelector("#signup-form");
const signinForm = document.querySelector("#signin-form");
const changepwForm = document.querySelector("#changepw-form");

// 게시물 목록
const boardList = document.querySelector("#board-list");

// 게시물 추가
const writeForm = document.querySelector("#write-form");

// 게시물 상세
const detailTitle = document.querySelector("#detail-title");
const detailUserId = document.querySelector("#detail-userid");
const detailContent = document.querySelector("#detail-content");
const backBtn = document.querySelector("#backBtn");

let boards = [];

// AccessToken 디코딩
function getPayload() {
  const token = localStorage.getItem("AccessToken");
  if (!token) {
    alert("로그인이 필요합니다.");
    changePages(pageSignin);
    return null;
  }

  try {
    // 토큰을 . 기준으로 분리해서 payload 가져오기
    // 토큰 3개로 나뉨 -> 그 중 두번째가 payload(사용자 정보)
    const payloadBase64 = token.split(".")[1];
    // 디코딩
    const decodedPayload = atob(payloadBase64);
    // 디코딩된 JSON문자열을 자바스크립트 객체로 변환
    const payload = JSON.parse(decodedPayload);

    return payload;
  } catch (error) {
    console.log(error);
    alert("토큰 오류 발생");
  }
}

// 내비게이션 바 변경 함수
// 토큰이 있는 경우, 없는 경우로 나누기
// 수업 방식으로 리팩토링ㄱㄱ
async function updateNavBar() {
  const accessToken = localStorage.getItem("AccessToken");

  if (accessToken) {
    navSignin.classList.add("invisible");
    navSignup.classList.add("invisible");
    navChangepw.classList.remove("invisible");
    navBoard.classList.remove("invisible");
    navWrite.classList.remove("invisible");

    const payload = getPayload();

    if (payload) {
      const response = await fetch(`${API_BASE_URL}/user/${payload.jti}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseData = await response.json();
      if (responseData.status === "success") {
        const username = responseData.data.username;
        const header = document.querySelector("header");

        // greeting 중복 방지
        let greeting = document.querySelector("#greeting");
        if (greeting) {
          greeting.remove();
        }

        greeting = document.createElement("p");
        greeting.id = "greeting";
        greeting.innerHTML = `<span>${username}</span>님, 안녕하세요! <button id="logout-btn">로그아웃</button>`;
        header.appendChild(greeting);

        // 로그아웃 버튼 이벤트리스너 등록
        const logoutBtn = document.querySelector("#logout-btn");
        if (logoutBtn) {
          logoutBtn.addEventListener("click", () => {
            if (confirm("로그아웃 하시겠습니까?")) {
              localStorage.removeItem("AccessToken");
              location.reload(true);
            } else {
              return;
            }
          });
        }
        await renderBoard();
        changePages(pageBoard);
      } else {
        console.log(responseData.message);
      }
    }
  } else {
    navSignin.classList.remove("invisible");
    navSignup.classList.remove("invisible");
    navChangepw.classList.add("invisible");
    navBoard.classList.remove("invisible");
    navWrite.classList.remove("invisible");

    const greeting = document.querySelector("#greeting");
    if (greeting) {
      greeting.remove();
    }
    // 로그인 페이지로 전환
    changePages(pageSignin);
  }
}

// 페이지 전환 함수
function changePages(pageElement) {
  const pages = document.querySelectorAll(".page");

  // 전부 다 active 없앰
  pages.forEach((page) => {
    page.classList.remove("active");
  });
  // 넘겨받은 page만 활성화
  pageElement.classList.add("active");
}

// 회원가입 요청 함수 (요청 -> async)
// event -> 브라우저가 자동으로 넘겨주는 이벤트 객체
async function signupHandler(event) {
  event.preventDefault(); // 폼 태그의 기본 동작 막기

  const usernameInput = document.querySelector("#signup-id");
  const passwordInput = document.querySelector("#signup-pw");
  const emailInput = document.querySelector("#signup-email");

  // 서버로 보낼 회원가입 데이터를 객체로 만들기
  const signupData = {
    username: usernameInput.value,
    password: passwordInput.value,
    email: emailInput.value,
  };

  // 입력값이 비어있는지 확인
  if (!signupData.username || !signupData.password || !signupData.email) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  // 요청 보낼 때는 try-catch
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      // requestBody로 줄 때
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData), // 자바스크립트 객체를 JSON 문자열로 변환
    });

    // 서버에서 ApiRespDto 만든 거 !!!
    const responseData = await response.json(); // 요청 응답 결과
    if (responseData.status !== "success") {
      // ApiRespDto에 message
      alert(responseData.message);
    } else {
      alert(responseData.message);
      signupForm.reset(); // 폼의 입력 내용 초기화
      changePages(pageSignin); // 회원가입 성공 시 로그인 화면으로 이동
    }
  } catch (error) {
    // 요청 자체에 실패한 경우(문제가 생겼을 경우)
    console.log("회원가입 요청 오류 발생: ", error);
    alert("회원가입 요청에 오류가 발생했습니다.");
  }
}

// 로그인 요청 함수(비동기)
async function signinHandler(event) {
  event.preventDefault(); // 폼 기본 동작 막기

  const usernameInput = document.querySelector("#signin-id");
  const passwordInput = document.querySelector("#signin-pw");

  const signinData = {
    username: usernameInput.value,
    password: passwordInput.value,
  };

  if (!signinData.username || !signinData.password) {
    alert("아이디, 비밀번호를 모두 입력해주세요.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        // cors 때문에 맞춰줘야 함
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signinData), // 자바스크립트 객체를 JSON 문자열로 변환
    });

    // 응답이 온 후에 실행해야함
    const responseData = await response.json(); // 응답 본문을 JSON으로 파싱

    // 실패할 경우
    if (responseData.status !== "success") {
      alert(responseData.message);
    } else {
      alert(responseData.message);
      // 성공시 accessToken도 같이 주기로 했음
      // 로컬스토리지에 저장
      localStorage.setItem("AccessToken", responseData.data);
      signinForm.reset(); // 로그인 폼 초기화

      // 내비게이션 바 상태 변경
      await updateNavBar();

      // 게시판 목록으로 전환
      // 비동기여야 함..
      await renderBoard();
    }
  } catch (error) {
    console.log("로그인 요청 오류 발생: ", error);
    alert("서버와 통신중 오류가 발생했습니다.");
  }
}

// 게시물 목록 요청 함수
// 게시판 목록 버튼 눌렀을 때, 로그인 버튼 눌렀을 때
async function renderBoard() {
  // 요청을 보내기 전에 AccessToken 빼오기
  // 만약에 로컬 스토리지에 AccessToken이 없으면 로그인 페이지 전환
  // 있으면 요청 보내기
  // fetch에서 headers 안에 Authorization: `Bearer ${AccessToken}

  const accessToken = localStorage.getItem("AccessToken");

  if (!accessToken) {
    changePages(pageSignin);
    alert("로그인이 필요합니다.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/board/list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();

    if (responseData.status !== "success") {
      alert(responseData.message);
    } else {
      boards = responseData.data;

      boardList.innerHTML = "";
      boards.forEach((board) => {
        const listItem = document.createElement("li");
        listItem.innerText = board.title;

        listItem.addEventListener("click", () => {
          getBoard(board.boardId);
        });
        boardList.appendChild(listItem);
      });

      changePages(pageBoard);
    }
  } catch (error) {
    console.log(error);
    alert("게시물 목록 조회 중 오류가 발생했습니다.");
  }
}

// 게시물 단건 조회 요청 함수
async function getBoard(boardId) {
  const accessToken = localStorage.getItem("AccessToken");

  if (!accessToken) {
    alert("게시물을 조회하려면 로그인이 필요합니다.");
    changePages(pageSignin);
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/board/${boardId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseData = await response.json();

    if (responseData.status !== "success") {
      alert(responseData.message);
    } else {
      const board = responseData.data;
      console.log(board);
      detailTitle.innerText = board.title;
      detailUserId.innerText = `작성자: ${board.user.username}`;
      // detailDate.innerText = `작성일: ${board.createDate}`;
      detailContent.innerText = board.content;

      changePages(pageDetail);
    }
  } catch (error) {}
}

// 게시물 추가 요청 함수
async function addBoard(event) {
  event.preventDefault();
  const payload = await getPayload();

  const titleInput = document.querySelector("#write-title");
  const contentInput = document.querySelector("#write-content");

  const accessToken = localStorage.getItem("AccessToken");

  if (!accessToken) {
    alert("글을 작성하려면 로그인이 필요합니다.");
    changePages(pageSignin);
    return;
  }

  if (!titleInput.value.trim() || !contentInput.value.trim()) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  const addBoardData = {
    title: titleInput.value,
    content: contentInput.value,
    userId: payload.jti,
  };

  // 게시물 추가 요청
  try {
    const response = await fetch(`${API_BASE_URL}/board/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addBoardData),
    });

    const responseData = await response.json();
    if (responseData.status !== "success") {
      alert(responseData.message);
    } else {
      alert(responseData.message);
      writeForm.reset();

      await renderBoard();
    }
  } catch (error) {
    console.log(error);
    alert("게시물 등록에 실패했습니다. 다시 시도해주세요.");
  }
}

// 비밀번호 변경 요청 함수
async function changePw(event) {
  event.preventDefault();

  const accessToken = localStorage.getItem("AccessToken");

  if (!accessToken) {
    alert("비밀번호를 변경하려면 로그인이 필요합니다.");
    changePages(pageSignin);
    return;
  }
  const currentPwInput = document.querySelector("#current-pw");
  const newPwInput = document.querySelector("#new-pw");
  const newPwCheckInput = document.querySelector("#new-pw-check");

  const currentPw = currentPwInput.value;
  const newPw = newPwInput.value;
  const newPwCheck = newPwCheckInput.value;

  if (currentPw.trim() === "" || newPw.trim() === "" || newPwCheck === "") {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  if (newPw !== newPwCheck) {
    alert("새로운 비밀번호를 확인해주세요.");
    newPwInput.value = "";
    newPwCheckInput.value = "";
    return;
  }

  // 비밀번호 변경 요청 로직
  try {
    const payload = await getPayload();

    const changePwData = {
      userId: payload.jti,
      oldPassword: currentPw,
      newPassword: newPw,
      newCheckPassword: newPwCheck,
    };

    const response = await fetch(`${API_BASE_URL}/account/change/password`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changePwData),
    });

    const responseData = await response.json();

    if (responseData.status !== "success") {
      alert(responseData.message);
    } else {
      // 비밀번호 변경되면 로그아웃?
      alert(responseData.message);
      changepwForm.reset();
      localStorage.removeItem("AccessToken");
      // 네비게이션 바 변경
      updateNavBar();
      // changePages(pageSignin);
    }
  } catch (error) {
    alert(error);
    location.reload();
  }
}

navSignin.addEventListener("click", () => {
  changePages(pageSignin);
});
navSignup.addEventListener("click", () => {
  changePages(pageSignup);
});
navChangepw.addEventListener("click", () => {
  changePages(pageChangepw);
});

navBoard.addEventListener("click", renderBoard);

navWrite.addEventListener("click", () => {
  changePages(pageWrite);
});

backBtn.addEventListener("click", renderBoard);

signupForm.addEventListener("submit", signupHandler);
signinForm.addEventListener("submit", signinHandler);
// 엔터 눌러도 로그인 수행
signinForm.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    signinHandler;
  }
});

writeForm.addEventListener("submit", addBoard);
writeForm.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    addBoard;
  }
});

changepwForm.addEventListener("submit", changePw);
changepwForm.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    changePw;
  }
});

// 화면 처음 렌더링 시 내비게이션바 업데이트
updateNavBar();

// 수업 - 토큰 있으면 게시판으로
// HTML 문서가 완전히 로드되고 파싱되었을 때
// document.addEventListener("DOMContentLoaded", async () => {
//   const accessToken = localStorage.getItem("AccessToken");

//   if (accessToken) {
//     await renderBoard();
//   } else {
//     changePages(pageSignin);
//   }
// });
