const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// 게시물 목록 컨테이너
const postListContainer = document.querySelector("#postListContainer");
// 게시물 상세 컨테이너
const postDetailContainer = document.querySelector("#postDetailContainer");
// 게시물 목록 ul
const postList = document.querySelector("#postList");

// 게시물 상세 제목
const detailTitle = document.querySelector("#detailTitle");
// 게시물 상세 ID
const detailId = document.querySelector("#detailId");
// 게시물 상세 유저 ID
const detailUserId = document.querySelector("#detailUserId");
// 게시물 상세 내용
const detailBody = document.querySelector("#detailBody");
// 목록으로 돌아가기 버튼
const backBtn = document.querySelector("#backBtn");

// 목록 - 상세 전환 함수
function changeContainer(containerId) {
  // postListContainer랑 postDetailContainer 둘 다 가져옴
  // 왜냐
  // 게시물 목록 페이지 -> 게시물 상세 페이지
  // 게시물 상세 페이지 -> 게시물 목록 페이지
  // 변환하는 데에 이 함수로 둘 다 처리할 거기 때문에
  const containers = document.querySelectorAll(".page-container");

  containers.forEach((container) => {
    container.classList.remove("active");
  });
  document.querySelector(`#${containerId}`).classList.add("active");
}

// 게시물 목록 불러와서 렌더링하는 함수
async function fetchPosts() {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);

    if (!response.ok) {
      throw new Error("문제 발생!");
    }

    const posts = await response.json();
    postList.innerHTML = "";

    // posts가 있으면
    if (posts) {
      // 각 게시물 순회해서 li안에 제목과 버튼 넣어서 ul안에 넣기
      posts.forEach((post) => {
        // li.dataset.post-id = post.id 해준 거랑 똑같음
        postList.innerHTML += `<li>
                    <span class="post-title" data-post-id="${post.id}">${post.title}</span>
                    <button class="detail-btn" data-post-id="${post.id}">상세보기</button>
                </li>`;
      });
    } else {
      postList.innerHTML = '<p class="loading-message">게시물이 없습니다.</p>';
    }
  } catch (error) {
    postList.innerHTML =
      '<p class="loading-message" style="color: red;">게시물 목록을 불러오는데 실패했습니다.</p>';
  }
}

async function fetchPostDetail(postId) {
  changeContainer("postDetailContainer"); // 상세 컨테이너가 나타남
  detailTitle.textContent = "제목 불러오는 중...";
  detailId.textContent = "";
  detailUserId.textContent = "";
  detailBody.textContent = "내용 불러오는 중...";

  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`);

    if (!response.ok) {
      throw new Error("문제 발생!");
    }

    const post = await response.json();

    detailTitle.textContent = post.title;
    detailId.textContent = post.id;
    detailUserId.textContent = post.userId;
    detailBody.textContent = post.body;
  } catch (error) {
    alert("게시물 상세를 불러오는데 실패했습니다.");
    changeContainer("postListContainer"); // 실패시 목록으로
  }
}

postList.addEventListener("click", (event) => {
  const target = event.target;
  if (
    target.classList.contains("post-title") ||
    target.classList.contains("detail-btn")
  ) {
    const postId = target.dataset.postId;
    if (postId) {
      fetchPostDetail(postId);
    }
  }
});

backBtn.addEventListener("click", () => {
  changeContainer("postListContainer");
});

fetchPosts();
