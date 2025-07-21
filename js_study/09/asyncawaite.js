// async(비동기 함수 정의 키워드)
// await(비동기 함수 동기 호출 키워드)
// await는 async 함수 내부에서만 사용 가능
// await는 promise가 resolve될 때까지 기다렸다가 그 결과를 변수에 할당

// const promise = new Promise((resolve) => resolve("개발자"));

// // async 키워드가 함수 자체를 비동기 함수로 만듦(함수 자체가 promise)
// async function getDate() {
//     return promise; // 이렇게 한다고 해서 promise에 promise가 감싸진 형태는 아님
//     // async는 상관이 없고 그냥 promise만 봄
//     // 결과가 개발자 임
//     // 중첩이 아니라... 바꿔치기라고 생각하기
// }

// const user = getDate();
// // getDate()함수가 promise이므로 user.then() 가능
// user.then((name) => {
//   console.log(name);
// });

// 프로미스
// function getUserReq() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log("사용자 데이터를 받아옴");
//       return resolve("서버1");
//     }, 2000);
//   });
// }

// 프로미스
// async function getData() {
//   // getUserReq 호출시켜놓고 return 을 먼저 해버림
//   //   getUserReq() // 비동기 함수가 끝날 때까지 다음 작업 기다려주지 않음(비동기)
//   //   await getUserReq(); // await는 해당 비동기 작업이 완료될 때까지 다음 작업을 하지 않고 기다림
//   const result = await getUserReq();    // resolve에 "서버1"이 있기 때문에 서버1도 return 됨, result는 getUserReq에 대한 결과이기 때문에 프로미스의 resolve가 반환한 서버1이 출력됨
//   const result2 = await getUserReq(); // result나올 때까지 기다렸다가 실행됨.
//   return "손원영";
// }
// 그러면 await는 비동기를 동기로..?
// 맞다 => await는 이 프로미스가 완료될 때까지 다음으로 안넘어가고 기다리겠다는 것
// 그래서 await는 async 함수 안에서만 사용 가능!

// 프로미스 쓴 버전
// function getDataPromise() {
//     return getUserReq().then(() => {
//         return getUserReq();
//     }).then(() => {
//         return "손원영";
//     })
// }

// const user = getData();
// user.then((name) => console.log(name));

// const user2 = getDataPromise();
// user2.then((name) => console.log(name))

function getUserReq() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("사용자 데이터를 받아옴");
      return resolve("서버1");
    }, 2000);
  });
}

async function getUser() {
  await getUserReq();
  return "손원영"; // 서버 요청의 결과가 "손원영"이라고 가정
}

async function getTodo() {
  await getUserReq();
  return ["밥먹기", "잠자기"]; // 서버 요청의 결과가 "["밥먹기", "잠자기"]"이라고 가정
}


async function getData() {
    const user = await getUser()  // 비동기 => 얘도 이 처리 끝날 때까지 기다려줘야함.. 앞에 await 붙여주기
    const todo = await getTodo()
    console.log(`${user}님 ${todo}를 해야합니다`)
}

getData(); // [object Promise]님 [object Promise]를 해야합니다 ?? 왜 이름이랑 배열이 아님?
// '해야합니다' 뜨고 '사용자 데이터를 받아옴'이 뜸