// promise: 자바스크립트의 비동기 처리에 사용되는 객체
// 콜백 지옥에서 벗어날 수 있게 도와줌
// promise 객체는 state와 result라는 속성을 가짐
// state: 대기, 이행, 거부
// 대기(pending): 초기 상태, 비동기 작업이 아직 완료되지 않은 상태
// --result: undefined
// 이행(fulfilled): 비동기 작업이 성공적으로 완료된 상태
// --result: 성공적으로 완료된 결과값
// 거부(rejected): 비동기 작업이 실패한 상태
// --result: 실패한 이유(에러)

// excutor(함수): promise의 인자로 전달받는 함수
// 객체 생성과 동시에 즉시 실행
// new Promise(excutor())
// resolve, reject: excutor 함수에 알아서 들어가는 인자, 따로 안넣어줘도 ㄱㅊ
// resolve: 비동기 작업이 성공했을 때 호출하는 함수
// reject: 비동기 작업이 실패했을 때 호출하는 함수
// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     const data = { name: "손원영" }; // 서버에서 받아온 데이터라고 가정
//     if (data) {
//       // data가 있으면 비동기 작업 성공
//       console.log("서버 요청 성공");
//       resolve();
//     } else {
//       // 비동기 작업 실패
//       reject();
//     }
//   }, 2000);
// });

// console.log(promise); // 위에 객체 생성과 동시에 실행되는 거 -> 2초 후에 실행
// promise는 2초 후에 실행되므로 console.log()가 먼저 실행됨.
// 2초 지나기 전이라 pending 상태, 브라우저 콘솔에서 확인

// setTimeout(() => {  // 3초 후에 promise 찍어봤더니 콘솔에 fulfilled 상태, 2초 지나서 promise의 비동기 함수가 실행되었기 때문에.
//   console.log(promise);
// }, 3000);

// ===========================================================================
function getData() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      //   const data = { name: "손원영" }; // 서버에서 받아온 데이터라고 가정
      const data = null;
      if (data) {
        // 비동기 작업 성공
        console.log("서버 요청 성공");
        resolve(data); // 성공 시 resolve호출, resolve 인자로 비동기 요청 결과를 넣어줌
      } else {
        // 비동기 작업 실패
        reject(new Error("네트워크 문제 발생")); // reject 인자로 Error 객체 넣어줌
      }
    }, 2000);
  });
  return promise;
}

const promise = getData(); // getData가 실행되어야 promise 객체 생성, getData()는 promise 객체 반환

// then/catch/finally

// then - resolve랑 연결
promise
  .then((data) => {
    // promise안의 데이터를 뽑아올 수 있음
    // 즉, then은 resolve가 호출이 되면 임
    // 결과값을 매개변수로 받아옴
    // then은 promise가 이행(fulfilled)되었을 때 호출되는 콜백 함수
    // console.log(data);
    const name = data.name;
    console.log(`이름은 ${name}입니다.`);
  })
  .catch((error) => {
    // promise가 rejected 되었을 때 호출되는 콜백 함수
    // console.log(error);
    console.log("간지나는 에러 처리");
  })
  .finally(() => {
    // 성공/실패 여부와 상관없이 항상 호출되는 콜백 함수
    console.log("마무리 작업");
  });

