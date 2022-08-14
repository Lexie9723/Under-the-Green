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
      playHomeVideEnded = true;
      $("#icon-mouse-scroll").fadeIn(500);
    },
    false
  );
};
function initPlayHomeVideo() {
  d3.select("#home3_audio")
    .transition()
    .duration(1000)
    .style("display", "inline-block");
  if (playHomeVideEnded) {
    $("#icon-mouse-scroll").fadeIn(1200);
    return;
  }
  palyHome3Video();
}

function initHome3() {
  loadHome3++;
  if (loadHome3 < maxHome3) return;
  registerScroll("#svg_home3", (event, isDown) => {
    if (playHomeVideEnded) {
      $("#icon-mouse-scroll").fadeOut(500);
      if (isDown) {
        scrollTo(3, 1000, false);
        initAnimMacro1();
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
