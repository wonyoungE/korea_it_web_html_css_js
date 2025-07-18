// 콜백 함수
// 다른 함수의 인자로 전달되는 함수

// 비동기 작업이 완료된 후에 호출되는 콜백 함수
function getData(callback) {
  // 서버 통신 흉내낸 것(지금 서버에 요청을 날릴 수는 없으니)
  setTimeout(() => {
    console.log("서버에서 데이터 받아옴~");
    callback({ name: "손원영" }); // callback 실행, 서버에서 가져온 데이터를 줌
  }, 2000); // 2초 후 : 서버에 다녀온 상태
}

// 결국 여기서 getData의 익명함수는 위에서 callback이 되고
// setTimeout에서 가져온 이름 데이터를 callback에 넣어주면 console.log(name)이 됨
// getData((data) => {
//   console.log(data);
// });
// 콜백 함수는 익명 함수만 가능
// 이거를 풀어서 쓰면 이런데 이해를 위함임
/*
    function callback(name) {
        console.log(name)
    }

    getData(callback()); => 안 됨
*/

// 쇼핑몰
// callback 함수 -> 각각의 기능이 실행된 후 실행되어야 할 함수
// 로그인
function login(username, callback) {
  setTimeout(() => {
    // 1초 뒤 로그인 완료, callback 함수 실행
    callback(username);
  }, 1000);
}
// 장바구니 담기
function addToCart(product, callback) {
  setTimeout(() => {
    // 1초 뒤 장바구니 담기 요청 완료, callback 함수 실행
    callback(product);
  }, 1000);
}
// 결제하기
function checkOut(cardNum, product, callback) {
  setTimeout(() => {
    // 1초 뒤 결제 완료, callback 함수 실행
    callback(cardNum, product);
  }, 1000);
}

login("손원영", (username) => {
  console.log(`${username}님이 로그인했습니다.`);
  addToCart("감자", (product) => {
    console.log(`${product}를 장바구니에 담았습니다.`);
    checkOut("1234-5678-9012-3456", product, (cardNum, product) => {
      console.log(`${product}에 대한 결제가 완료되었습니다. 카드번호: ${cardNum}`);
      // 만약에 콜백 함수가 더 있다면..? => 콜백 지옥
    });
  });
});
// 콜백 지옥: 콜백 함수가 계속 중첩되는 것

