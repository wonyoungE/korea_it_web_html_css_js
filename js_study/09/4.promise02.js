// promise chaining

function getData() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: "손원영" }; // 서버에서 받아온 데이터라고 가정
      if (data) {
        // 비동기 작업 성공
        console.log("서버 요청 성공");
        resolve(data); // 성공 시 resolve호출, resolve한테 data 넘겨주면 then안의 callback 함수의 매개변수에 줌
      } else {
        // 비동기 작업 실패
        reject(new Error("네트워크 문제 발생")); // 에러 던지기
      }
    }, 2000);
  });
  return promise;
}

const promise = getData();
// promise.then().then().then().then()...
// promise chaining -> 여러가지 비동기 작업 연속 수행 가능
// promise
//   .then((data) => {
//     console.log(data);
//     return getData();   // 비동기 작업 또 실행
//   })
//   .then((data) => {
//     console.log(data);
//   });

// 축약하면
// promise
//   .then((data) => getData())
//   .then((data) => getData())
//   .then((data) => getData())
//   .then((data) => console.log(data));

promise
  .then((data) => {
    console.log(data);
    return "hello";
    // 값을 리턴하면 promise의 resolve에 해당 값이 전달됨 resolve("hello")인 거
  })
  .then((data) => {
    console.log(data);
  });

