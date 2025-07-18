// 로그인
function login(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username) {
        // 로그인 성공

        resolve(username); // 성공 시 resolve 호출
      } else {
        reject(new Error("로그인 실패"));
      }
    }, 1000);
  });
}
// 장바구니 담기
function addToCart(product) {
  // 해당 함수를 호출하면 promise가 바로 실행되어야..
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (product) {
        // 장바구니 담기 성공
        resolve(product);
      } else {
        reject(new Error("장바구니 담기 실패"));
      }
    }, 1000);
  });
}

// 결제하기
function checkOut(cardNum, product) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (cardNum && product) {
        resolve({ product: `${product}`, cardNum: `${cardNum}` });
      } else {
        reject(new Error("결제 실패"));
      }
    }, 1000);
  });
}

login("손원영")
  .then((username) => {
    console.log(`${username}님이 로그인했습니다.`);
    return addToCart("감자");
  })
  .then((product) => {
    console.log(`${product}를 장바구니에 담았습니다.`);
    return checkOut("1234-5678-9012-3456", product);
  })
  .then((data) => {
    console.log(
      `${data.product}에 대한 결제가 완료되었습니다. 카드번호: ${data.cardNum}`
    );
  })
  .catch((error) => {
    console.log(error);
  });
