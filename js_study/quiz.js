// Q1
// score 변수에 임의의 숫자를 할당
// 조건에 따라서 등급 부여
// 90점 이상 -> A
// 80점 이상 -> B
// 70점 이상 -> C
// 나머지 F

const score = 65;
if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else if (score >= 70) {
  console.log("C");
} else {
  console.log("F");
}

// Q2
// for문을 이용해서 1부터 20까지 숫자 중 짝수만 출력
for (let i = 1; i <= 20; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}

// Q3
// 1. title, author, publisherYear 속성을 포함하는 book 객체 생성
// 해리포터, J.K 롤링, 1997
// 2. book 객체의 title과 author 속성 값을 출력 (점 표기법, 대괄호 표기법)
// 3. book 객체에 getAge() 메서드 추가
//    현재 연도(new Date().getFullYear())에서 publisherYear를 뺀 값을 리턴
// 4. getAge() 호출해서 출력
// 5. book 객체에 새로운 속성 genre를 추가하고 값을 할당 ("판타지")
// 6. book 객체의 publisherYear를 2000으로 수정

// 1.
let book = {
  title: "해리포터",
  author: "J.K 롤링",
  publisherYear: 1997,
};

// 2.
console.log(book.title);
console.log(book["author"]);

// 3.
book.getAge = () => {
  return new Date().getFullYear() - book.publisherYear;
};

// 4.
console.log(book.getAge());

// 5. spread
function addProps(prop) {
  book = { ...book, ...prop };
}
addProps({ genre: "판타지" });
console.log(book);

// 6.
book.publisherYear = 2000;
console.log(book);

// Q3
const products = [
  { id: 1, name: "노트북", price: 1200000, category: "전자제품" },
  { id: 2, name: "티셔츠", price: 25000, category: "의류" },
  { id: 3, name: "모니터", price: 300000, category: "전자제품" },
  { id: 4, name: "청바지", price: 50000, category: "의류" },
  { id: 5, name: "마우스", price: 15000, category: "전자제품" },
];
// 1. 50000원 이상인 제품만 필터링해서 expensiveProducts 배열에 넣고 출력 => filter
// 2. products 배열에서 각 제품의 이름과 가격만 포함하는 productNamesAndPrices 배열 만들기
// [{name: "노트북", price: 120000}, {}, {}]
// 3. products 배열에서 category가 전자제품인 제품만 선택해서 -> 각 제품의 이름과 가격을
// 10% 할인한 discountProducts 배열 만들기

// 1.
const expensiveProducts = products.filter((product) => product.price >= 50000);
console.log(expensiveProducts);

// 2.
const productNamesAndPrice = products.map((product) => ({
  name: product.name,
  price: product.price,
}));
const productNamesAndPrice2 = products.map((product) => {
  return { name: product.name, price: product.price };
});
console.log(productNamesAndPrice);

// 3.
const discountProducts = products
  .filter((product) => product.category === "전자제품")
  .map((product) => {
    return { name: product.name, price: product.price * 0.9 };
  });
// const discountProducts = products
//   .filter((product) => product.category === "전자제품")
//   .map((product) => ({
//     name: product.name, price: product.price * 0.9 }));
console.log(discountProducts);

//=================================================
const baseConfig = {
  theme: "dark",
  fontSize: "16px",
  language: "ko",
};

// newConfig를 만드세요.
// theme는 "light"로 변경하고,
// padding: "20px" 속성을 새로 추가하세요.

// 객체 Spread 문법을 사용하여 newConfig 생성
const newConfig = {
  ...baseConfig,
  theme: "light",
  padding: "20px",
};

console.log(newConfig);

//==================================================
const arr1 = [1, 2, 3];
const arr2 = [4, 5];

// 배열 Spread 문법을 사용하여 배열 합치기
const arr = [...arr1, ...arr2];

console.log(arr);