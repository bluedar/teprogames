const select = document.querySelector(".select");
const select_wrap = document.querySelector(".select_items");
let bullentin_array = [];
let bullentin_obj = {};
/* 셀렉터 옵션 열려주는 클릭 기능 */
let toggleBtn = true;
select.addEventListener("click", () => {
  readItems();
  if (toggleBtn) {
    select_wrap.classList.add("on");
    toggleBtn = false;
  } else {
    select_wrap.classList.remove("on");
    toggleBtn = true;
  }
});
const selectUl = document.querySelector(".select ul");
const readItems = () => {
  const select_items = document.querySelectorAll(".select_items li");

  select_items.forEach((select_item) => {
    select_item.addEventListener("click", () => {
      make_visit_game(select_item, selectUl);
    });
  });
  /* 옵션 클릭하면 열린 옵션창 닫아주고 셀렉터에 선택한거 넣어주는 기능 */
  select_items.forEach((select_item) => {
    select_item.addEventListener("click", () => {
      select_wrap.classList.remove("on");
      toggleBtn = true;
      /* 선택한 옵션에서 정보를 뽑아와서 선택창에 집어넣기 */
    });
  });
};
const make_visit_game = (game_item, innerUl) => {
  // 게임 아이템의 img src
  const item_img = game_item.querySelector("img").getAttribute("data-src");
  bullentin_obj["bull_img"] = item_img;
  // 게임 아이템의 게임 이름
  const h3_text = game_item.querySelector("h3").textContent;
  bullentin_obj["bull_game"] = h3_text;
  // 게임 아이템의 장르
  const span_text = game_item.querySelector("div > span").textContent;
  bullentin_obj["bull_text"] = span_text;
  // 위의 게임 정보들을 집어넣은 li 제작
  const create_li = document.createElement("li");
  create_li.innerHTML = `
    <figure>
      <img src="${item_img}" alt="" />
    </figure>
    <div>
      <h3>${h3_text}</h3>
      <span>${span_text}</span>
    </div>`;
  // ul에 생성한 li를 집어 넣는다.
  innerUl.prepend(create_li);

  /*li들을 전부 확인해서 제일 뒷 li를 제거해주어 아이템을 유지*/
  const game_items = innerUl.querySelectorAll("li");
  const last_item = game_items[game_items.length - 1];
  innerUl.removeChild(last_item);

  /*li 들을 전부 확인해서 로컬에 저장해둔다.*/
};

const go_btn = document.querySelector(".go_btn button");
const title_input = document.querySelector("#title_input");
const textarea = document.querySelector(".textarea");
let title_text = "";
let main_text = "";
title_input.addEventListener("input", (e) => {
  title_text = e.target;
  bullentin_obj["bull_title"] = title_text.value;
});
textarea.addEventListener("input", (e) => {
  main_text = e.target;
  bullentin_obj["bull_main"] = main_text.innerHTML;
  console.log(e.target.innerHTML);
});
go_btn.addEventListener("click", (event) => {
  //event.preventDefault();
  const none = selectUl.querySelector(".none");
  if (!title_text.value) {
    return alert("제목을 입력해 주세요!!");
  } else if (none) {
    return alert("게임셀렉터를 결정해주세요!!");
  } else if (!main_text.innerHTML) {
    return alert("내용을 입력해 주세요!!");
  }
  bullentin_array = [{ ...bullentin_obj }, ...bullentin_array];
  title_text.value = "";
  main_text.innerHTML = "";
  if (bullentin_array.length > 5) {
    bullentin_array.pop();
  }
  console.log(bullentin_array);
  const bullentin = "bullentin";
  saveList(bullentin);
});
const saveList = (aa) => {
  localStorage.setItem(aa, JSON.stringify(bullentin_array));
};

const loadList = () => {
  const dataBullentin = JSON.parse(localStorage.getItem("bullentin"));
  if (dataBullentin) {
    bullentin_array = dataBullentin;
  }
};
loadList();
