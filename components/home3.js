let loadHome3 = 0;
const maxHome3 = 1;

let playHomeVideEnded = false;

let palyHome3Video = function () {
  const elevideo = document.getElementById("home3_audio");
  elevideo.play();
  elevideo.addEventListener(
    "ended",
    function () {
      //结束
      console.log("播放结束");
      playHomeVideEnded = true;
    },
    false
  );
};
function initPlayHomeVideo() {
  d3.select("#home3_audio")
    .transition()
    .duration(1000)
    .style("display", "inline-block");
  if (playHomeVideEnded) return;
  palyHome3Video();
}

function initHome3() {
  loadHome3++;
  console.log("loadHome3--", loadHome3);
  if (loadHome3 < maxHome3) return;

  console.log("load home3");

  registerScroll("#svg_home3", (event, isDown) => {
    console.log(isDown);
    if (playHomeVideEnded) {
      if (isDown) {
        scrollTo(3, 1000, false);
        initAnimMacro1();
        setTimeout(() => showLight(), 500);
      } else {
        scrollTo(1, 1000, false);
      }
      d3.select("#home3_audio")
        .transition()
        .duration(1000)
        .style("display", "none");
    }
  });
}
