const hamburg_btn = document.querySelector(".hamburg_btn");
const aside = document.querySelector("aside");
hamburg_btn.addEventListener("click", () => {
  hamburg_btn.classList.toggle("on");
  aside.classList.toggle("on");
});
