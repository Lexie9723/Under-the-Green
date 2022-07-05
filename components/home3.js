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
      console.log("palyHome3Video 播放结束");
      playHomeVideEnded = true;
      // $("#icon-mouse-scroll div img").attr("src", "./resource/element_home/Scroll_1.gif");
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
  console.log("loadHome3--", loadHome3);
  if (loadHome3 < maxHome3) return;

  console.log("load home3");

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
