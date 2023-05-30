import { getJson } from "./json.js";
getJson().then(() => {
  game_items = document.querySelectorAll(".game_item");
  gameItemClick();
});
//
const slider_items = document.querySelectorAll(".slider_item");
const slider_btn_wrap = document.querySelector(".slider_btn");
const slider_btns = document.querySelectorAll(".slider_btn li");
let Num = 0;
const slider_auto = () => {
  Num += 1;
  Num === 6 ? (Num = 0) : null;
  Num === -1 ? (Num = 5) : null;

  /*
  if (Num > 2) {
    slider_btn_wrap.classList.add("on");
  } else {
    slider_btn_wrap.classList.remove("on");
  }
  */
  Num > 2
    ? slider_btn_wrap.classList.add("on")
    : slider_btn_wrap.classList.remove("on");

  slider_items.forEach((slider_item, index) => {
    slider_item.classList.remove("on");
    slider_btns[index].classList.remove("on");
  });
  slider_items[Num].classList.add("on");
  slider_btns[Num].classList.add("on");
};
/* 자동으로 실행되는 슬라이더*/
let intervalId;
const startInterval = () => {
  intervalId = setInterval(() => {
    slider_auto();
  }, 2000);
};
const restartInterval = () => {
  clearInterval(intervalId);
  startInterval();
};
startInterval();
/* 슬라이더 버튼 클릭시 작동하는 슬라이더 버튼*/
slider_btns.forEach((slider_btn, index) => {
  slider_btn.addEventListener("click", () => {
    Num = index - 1;
    slider_auto();
    restartInterval();
  });
});

/* prev next 버튼 클릭시 넘어가는 버튼 */
const prev_btn = document.querySelector(".prev_btn");
const next_btn = document.querySelector(".next_btn");

prev_btn.addEventListener("click", () => {
  Num = Num - 2;
  slider_auto();
  restartInterval();
});
next_btn.addEventListener("click", () => {
  slider_auto();
  restartInterval();
});

const plus_btn = document.querySelector(".plus_btn");
const game_item_wrap = document.querySelector(".game_item_wrap");
let toggleBtn = true;
plus_btn.addEventListener("click", () => {
  if (toggleBtn) {
    game_item_wrap.classList.add("on");
    plus_btn.classList.add("on");
    toggleBtn = false;
  } else {
    game_item_wrap.classList.remove("on");
    plus_btn.classList.remove("on");
    toggleBtn = true;
  }
});
let visitArray = [];
let visitObj = {};
let game_items = document.querySelectorAll(".game_item");
const visit_games_wrap = document.querySelector(".visit ul");
/* 게임 아이템의 정보를 최근 방문기록용으로 만드는 함수 */
const make_visit_game = (game_item, innerUl) => {
  // 게임 아이템의 img src
  const item_img = game_item.querySelector("img").getAttribute("data-src");
  // 게임 아이템의 게임 이름
  const h3_text = game_item.querySelector("h3").textContent;
  // 게임 아이템의 장르
  const span_text = game_item.querySelector("div > span").textContent;
  // 위의 게임 정보들을 집어넣은 li 제작
  const create_li = document.createElement("li");
  create_li.innerHTML = `
  <a href="#">
    <span>1</span>
    <figure>
      <img src="${item_img}" alt="" />
    </figure>
    <div>
      <h3>${h3_text}</h3>
      <span>${span_text}</span>
    </div>
  </a>`;
  create_li.addEventListener("click", () => {
    make_visit_game(game_item, innerUl);
  });
  // ul에 생성한 li를 집어 넣는다.
  innerUl.prepend(create_li);
  const visit_game_nums = innerUl.querySelectorAll("li a > span");
  visit_game_nums.forEach((visit_game_num, index) => {
    visit_game_num.innerHTML = `${index + 1}`;
  });

  /*li들을 전부 확인해서 제일 뒷 li를 제거해주어 5개의 아이템을 유지*/
  const game_items = innerUl.querySelectorAll("li");
  const last_item = game_items[game_items.length - 1];
  innerUl.removeChild(last_item);
  /*li 들을 전부 확인해서 로컬에 저장해둔다.*/
  visitObj["item_img"] = item_img;
  visitObj["h3_text"] = h3_text;
  visitObj["span_text"] = span_text;
  visitArray = [...visitArray, { ...visitObj }];
  if (visitArray.length > 5) {
    visitArray.shift();
  }
  const visitId = "saveList";
  saveList(visitId);
};

const saveList = (aa) => {
  localStorage.setItem(aa, JSON.stringify(visitArray));
};

//시작될때 로컬에서 데이터를 받아와 화면에 뿌려준다
const make_start_visit_game = (game_item, innerUl) => {
  // 게임 아이템의 img src
  const item_img = game_item["item_img"];
  // 게임 아이템의 게임 이름
  const h3_text = game_item["h3_text"];
  // 게임 아이템의 장르
  const span_text = game_item["span_text"];
  // 위의 게임 정보들을 집어넣은 li 제작
  const create_li = document.createElement("li");
  create_li.innerHTML = `
  <a href="#">
    <span>1</span>
    <figure>
      <img src="${item_img}" alt="" />
    </figure>
    <div>
      <h3>${h3_text}</h3>
      <span>${span_text}</span>
    </div>
  </a>`;
  create_li.addEventListener("click", () => {
    make_start_visit_game(game_item, innerUl);
  });
  // ul에 생성한 li를 집어 넣는다.
  innerUl.prepend(create_li);
  const visit_game_nums = innerUl.querySelectorAll("li a > span");
  visit_game_nums.forEach((visit_game_num, index) => {
    visit_game_num.innerHTML = `${index + 1}`;
  });
  /*li들을 전부 확인해서 제일 뒷 li를 제거해주어 5개의 아이템을 유지*/
  const game_items = innerUl.querySelectorAll("li");
  const last_item = game_items[game_items.length - 1];
  innerUl.removeChild(last_item);
};

/*게임 아이템을 클릭할때 클릭한 게임 정보를 최근방문기록에 남기기*/
const gameItemClick = () => {
  game_items.forEach((game_item) => {
    game_item.addEventListener("click", () => {
      make_visit_game(game_item, visit_games_wrap);
    });
  });
};

const popular_items = document.querySelectorAll(".popular li");
/*인기 게임 아이템을 클릭할때 클릭한 게임 정보를 최근 방문 기록에 남기기*/
popular_items.forEach((popular_item) => {
  popular_item.addEventListener("click", () => {
    make_visit_game(popular_item, visit_games_wrap);
  });
});

//최근 방문 아이템을 클릭할때 클릭정보를 최근 방문기록에 남기기
const visit_items = document.querySelectorAll(".visit li");
visit_items.forEach((visit_item) => {
  visit_item.addEventListener("click", () => {
    make_visit_game(visit_item, visit_games_wrap);
  });
});

//게시글 생성 함수
const make_bulletin_item = (game_item, innerUl) => {
  // img src
  const item_img = game_item.bull_img;
  // 게시글 제목
  const item_title = game_item.bull_title;
  // 게시글 게임이름
  const item_game = game_item.bull_game;
  //사용자 닉네임
  const item_text = game_item.bull_text;
  // 위의 게임 정보들을 집어넣은 li 제작
  const create_li = document.createElement("li");
  create_li.innerHTML = `
  <a href="#">
    <figure>
      <img src="${item_img}" alt="" />
    </figure>
    <div class="best_board_item">
    <h2>${item_title}</h2>
    <p><span>${item_game}</span><span>${item_text}</span></p>
    </div>
                  </a>`;
  // ul에 생성한 li를 집어 넣는다.
  innerUl.prepend(create_li);
  /*li들을 전부 확인해서 제일 뒷 li를 제거해주어 5개의 아이템을 유지*/
  const game_items = innerUl.querySelectorAll("li");
  const last_item = game_items[game_items.length - 1];
  innerUl.removeChild(last_item);

  /*li 들을 전부 확인해서 로컬에 저장해둔다.*/
};

// 페이지가 시작될때 베스트 게시글란에 작성한 게시글들이 들어가는 기능
let bullentin_array = [];
const loadList = () => {
  const dataBullentin = JSON.parse(localStorage.getItem("bullentin"));
  if (dataBullentin) {
    bullentin_array = dataBullentin;
  } else {
    return;
  }

  bullentin_array.forEach((item) => {
    const bulletin_item_wrap = document.querySelector(".bulletin ul");
    make_bulletin_item(item, bulletin_item_wrap);
  });
};
const loadList2 = () => {
  // 로컬에서 데이터를 받아 최신게임란에 출력
  const dataVisit = JSON.parse(localStorage.getItem("saveList"));

  if (dataVisit) {
    visitArray = dataVisit;
  } else {
    return;
  }
  visitArray.forEach((item) => {
    const visit_item_wrap = document.querySelector(".visit ul");
    make_start_visit_game(item, visit_item_wrap);
  });
};

loadList();
loadList2();
