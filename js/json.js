export async function getJson() {
  //const response = await fetch("../json/main.json");
  const response = await fetch(
    "https://bluedar.github.io/teprogames/json/main.json"
  );
  const products = await response.json();
  return products;
}

// // 화면이 시작될때 내부 함수들 작동
getJson().then((products) => {
  getGameInfo(products.data);
});

// 제이슨 정보를 받아와 한번 돌려주는 함수
const getGameInfo = (data) => {
  data.forEach((item) => {
    const cake = document.querySelector("#index");
    if (cake) {
      innergames(item);
    } else {
      innerOption(item);
    }
  });
};

//메인페이지 게임 아이템 만들기
//제이슨 정보를 돌릴때 게임정보와 아이템을 넣을 위치를 전달하는 함수
const innergames = (data) => {
  const games = document.querySelector(".game_item_wrap");
  make_start_game(data, games);
};

/* 제이슨에서 받아온 정보를 게임정보에 li를 만들어 넣는 함수 */
const make_start_game = (game_item, innerUl) => {
  // 게임 아이템의 img src
  const item_img = game_item["src"];
  // 게임 아이템의 img src
  const item_img_data = game_item["data-src"];
  // 게임 아이템의 게임 이름
  const alt = game_item["alt"];
  // 게임 아이템의 게임 이름
  const h3_text = game_item["title"];
  // 게임 아이템의 장르
  const span_text = game_item["categori"];
  // 위의 게임 정보들을 집어넣은 li 제작
  const create_li = document.createElement("li");
  create_li.innerHTML = `
    <figure>
      <img
      src="${item_img}" 
      data-src="${item_img_data}"
      alt="${alt}" />
    </figure>
    <div>
      <h3>${h3_text}</h3>
      <span>${span_text}</span>
    </div>`;
  create_li.classList.add("game_item");
  create_li.addEventListener("click", () => {
    make_visit_game(game_item, innerUl);
  });
  // ul에 생성한 li를 집어 넣는다.
  innerUl.append(create_li);
};

// 게시판 셀렉터 아이템만들기
//제이슨 정보를 돌릴때 게임정보와 아이템을 넣을 위치를 전달하는 함수
const innerOption = (data) => {
  const games = document.querySelector(".select_items");
  make_start_cate(data, games);
};

/* 제이슨에서 받아온 정보를 게임정보에 li를 만들어 넣는 함수*/
const make_start_cate = (game_item, innerUl) => {
  // 게임 아이템의 img src
  const item_img = game_item["data-src"];
  // 게임 아이템의 img src
  const item_img_data = game_item["data-src"];
  // 게임 아이템의 게임 이름
  const alt = game_item["alt"];
  // 게임 아이템의 게임 이름
  const h3_text = game_item["title"];
  // 게임 아이템의 장르
  const span_text = game_item["categori"];
  // 위의 게임 정보들을 집어넣은 li 제작
  const create_li = document.createElement("li");
  create_li.innerHTML = `
    <figure>
      <img
      src="${item_img}" 
      data-src="${item_img_data}"
      alt="${alt}" />
    </figure>
    <div>
      <h3>${h3_text}</h3>
      <span>${span_text}</span>
    </div>`;
  create_li.classList.add("game_item");
  // ul에 생성한 li를 집어 넣는다.
  innerUl.prepend(create_li);
};
