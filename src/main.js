import "./styles/index.scss";

const btn = document.querySelector("#btn");
btn.addEventListener("click", () => {
  // 动态导入模块
  import(/* webpackChunkName: "math" */ "./js/math.js").then(({ sum }) => {
    console.log(sum(1, 2));
  });
});
