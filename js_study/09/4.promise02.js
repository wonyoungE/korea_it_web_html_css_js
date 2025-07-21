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
// .then() 메서드는 새로운 Promise 객체를 반환
// promise chaining -> 여러가지 비동기 작업 연속 수행 가능
// promise
//   .then((data) => {  // then 안의 함수 = callback 함수 / promise가 콜백 지옥 벗어나기 위해 사용하는 거임..
//      // promise 상태가 성공일 때 실행하는 callback 함수가 then 안의 익명 함수임
//     console.log(data);
//     return getData();   // 비동기 작업 또 실행
//   })
//   .then((data) => {  // getData의 return -> promise임.. promise가 성공했냐? ㅇㅇ -> then
//     console.log(data);
//   });

// 축약하면
// promise
//   .then((data) => getData())
//   .then((data) => getData())
//   .then((data) => getData())
//   .then((data) => console.log(data));

promise
  .then((data) => { // 첫번째 then
    console.log(data); // "서버 요청 성공" 후 넘어온 {name: "손원영"}
    return "hello"; // 이 값을 리턴함
    // 값을 리턴하면 promise의 resolve에 해당 값이 전달됨 resolve("hello")인 거
  })
  .then((data) => { // 두번째 then
    console.log(data);  // 첫 번째 then에서 리턴한 "hello"가 여기에 들어옴
  });
// 핵심은 .then() 메서드가 항상 새로운 Promise 객체를 반환한다는 점
// 그리고 이 새로운 Promise는 이전 .then 콜백 함수의 반환 값에 따라 상태 결정
// .then 안의 콜백 함수가 값을 리턴하면 그 값은 resolve(값)처럼 다음 then()의 콜백 함수의 매개변수로 전달
// .then() 메서드의 규칙에 따라, 이 return "hello";는 Promise.resolve("hello")와 같은 새로운 Promise 객체를 생성해서 반환. 즉, "hello" 값을 성공 결과로 갖는 Promise를 자동으로 만듦
// 결론: .then() 메서드 안의 콜백 함수가 Promise가 아닌 일반적인 값을 return하면, 그 값은 자동으로 Promise.resolve(값) 형태의 새로운 Promise로 변환되어 다음 .then()으로 전달