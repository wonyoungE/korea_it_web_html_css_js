// 단축 평가 논리 연산
// && ||
// 알고 있던 거(둘 중 하나라도, ... )랑 살짝 다름
// 앞의 값에 따라서 갈림
const name = "손원영";

console.log(!!name && !!"손원일");
// && (AND) 연산
// 앞의 값이 true일 때 뒤의 '값'을 리턴, false일 때는 false
console.log(false && 10);   // false
console.log(true && 10);    // 10
console.log(!!name && 0);    // 0
// || (OR) 연산
// 앞의 값이 false일 때 뒤의 값을 리턴, true일 때 true 리턴
console.log(false || 10);
console.log(true || 10);

// nullish 병합 연산자 => ??
// 앞의 값이 null 또는 undefined가 아니면 앞의 값, 그 외에는 뒤의 값
// 즉, 앞의 값이 null 또는 undefined면 뒤의 값
console.log(null ?? 100);
console.log(undefined ?? 100);
console.log(20 ?? 100);
console.log(0 ?? 100);
console.log("" ?? 100); // "" 빈 문자열 출력됨 -> 걍 null, undefined 아니면 무조건 그거 나옴 ㅇㅇ
