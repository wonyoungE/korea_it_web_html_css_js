const API_BASE_URL = "http://localhost:8080";

const navSignin = document.querySelector("#nav-signin");
const navSignup = document.querySelector("#nav-signup");
const navBoard = document.querySelector("#nav-board");
const navWrite = document.querySelector("#nav-write");
const navigation = document.querySelector("nav");

const pageSignin = document.querySelector("#page-signin");
const pageSignup = document.querySelector("#page-signup");
const pageBoard = document.querySelector("#page-board");
const pageWrite = document.querySelector("#page-write");

const signupForm = document.querySelector("#signup-form");
const signinForm = document.querySelector("#signin-form");

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
// event -> 브라우저가 자동으로 넘겨주는 "이벤트 객체"
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
  event.preventDefault();

  const usernameInput = document.querySelector("#signin-id");
  const passwordInput = document.querySelector("#signin-pw");

  const signinData = {
    username: usernameInput.value,
    password: passwordInput.value,
  };

  if (!signinData.username || !signinData.password) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signinData), // 자바스크립트 객체를 JSON 문자열로 변환
    });

    const responseData = await response.json(); // 응답 본문을 JSON으로 파싱

    // 실패할 경우
    if (responseData.status !== "success") {
      alert(responseData.message);
    } else {
      alert(responseData.message);
      signinForm.reset(); // 로그인 폼 초기화
      changePages(pageBoard); // 게시판 리스트 페이지로 전환
    }
  } catch (error) {
    console.log("로그인 요청 오류 발생: ", error);
    alert("로그인 실패");
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

navBoard.addEventListener("click", () => {
  changePages(pageBoard);
});

navWrite.addEventListener("click", () => {
  changePages(pageWrite);
});

// 자바스크립트는 싱글스레드.. 근데 콘솔에는 방법1이 먼저 찍히는 이유는?
// 수업 방식 -> 버튼 요소 직접 접근 (타겟 단계에 실행)
// 내 방식 -> 버튼 요소의 부모로부터 접근 (버블링 단계 실행)

signupForm.addEventListener("submit", signupHandler);
signinForm.addEventListener("submit", signinHandler);
