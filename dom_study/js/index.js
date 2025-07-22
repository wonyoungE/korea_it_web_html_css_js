// 웹 페이지의 리소스가 전부 로드되었을 때
// 브라우저에 웹 페이지가 켜질 때 실행되는 함수 -> window.onload

window.onload = () => {
    const root = document.querySelector("#root");

    // 여기서 렌더링 시켜주는 함수 호출
    render(root);
}

// 렌더링 시켜주는 함수
function render(targetElement) {
    targetElement.innerHTML = app();    // app.js에 있는 함수를 그냥 들고올 수 있는 거??
}