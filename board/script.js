const API_BASE_URL = "http://localhost:8080";

// 메뉴 버튼
const navSignin = document.querySelector("#nav-signin");
const navSignup = document.querySelector("#nav-signup");
const navBoard = document.querySelector("#nav-board");
const navWrite = document.querySelector("#nav-write");
const navigation = document.querySelector("nav");

// 페이지
const pageSignin = document.querySelector("#page-signin");
const pageSignup = document.querySelector("#page-signup");
const pageBoard = document.querySelector("#page-board");
const pageWrite = document.querySelector("#page-write");

// 회원가입 / 로그인 폼
const signupForm = document.querySelector("#signup-form");
const signinForm = document.querySelector("#signin-form");

// 게시물 목록
const boardList = document.querySelector("#board-list");

let boards = [];

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

      // 게시판 목록으로 전환
      // 비동기여야 함..
      await renderBoard();
    }
  } catch (error) {
    console.log("로그인 요청 오류 발생: ", error);
    alert("서버와 통신중 오류가 발생했습니다.");
  }
}

// 게시물 리스트 불러오는 함수
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
      console.log(boards);
      boards.forEach((board) => {
        boardList.innerHTML += `<li>${board.title}</li>`;
      });

      changePages(pageBoard);
    }
  } catch (error) {
    console.log(error);
    alert("게시물 목록 조회 중 오류가 발생했습니다.");
  }
}

// 나의 방식
// navigation.addEventListener("click", (event) => {
//   console.log("방법2");
//   const target = event.target;

//   if (target.id === "nav-signin") {
//     changePages(pageSignin);
//   } else if (target.id === "nav-signup") {
//     changePages(pageSignup);
//   } else if (target.id === "nav-board") {
//     changePages(pageBoard);
//   } else if (target.id === "nav-write") {
//     changePages(pageWrite);
//   }
// });

// 수업 방식
navSignin.addEventListener("click", () => {
  console.log("방법1");
  changePages(pageSignin);
});
navSignup.addEventListener("click", () => {
  changePages(pageSignup);
});

navBoard.addEventListener("click", renderBoard);

navWrite.addEventListener("click", () => {
  changePages(pageWrite);
});

// 자바스크립트는 싱글스레드.. 근데 콘솔에는 방법1이 먼저 찍히는 이유는?
// 수업 방식 -> 버튼 요소 직접 접근 (타겟 단계에 실행)
// 내 방식 -> 버튼 요소의 부모로부터 접근 (버블링 단계 실행)

signupForm.addEventListener("submit", signupHandler);
signinForm.addEventListener("submit", signinHandler);
