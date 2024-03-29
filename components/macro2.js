let loadMacro2 = 0;
const maxMacro2 = 2;

let playMacro2VideEnded = false;

let palyMacro2Video = function () {
  $("#svg_macro2").css({ background: "transparent" });
  const elevideo = document.getElementById("macro2_audio");
  elevideo.play();
  elevideo.addEventListener(
    "ended",
    function () {
      //结束
      playMacro2VideEnded = true;
      elevideo.loop = true;
      elevideo.play();
      $("#icon-mouse-scroll").fadeIn(500);
    },
    false
  );
};
function initAnimMacro2() {
  d3.select("#macro2_audio")
    .transition()
    .duration(1000)
    .style("display", "inline-block");
  if (playMacro2VideEnded) return;
  d3.select("#macro_2_text_1").transition().attr("opacity", 1);
  d3.select("#macro_2_text_2").transition().attr("opacity", 0);
  palyMacro2Video();
}

function initMacro2() {
  loadMacro2++;
  if (loadMacro2 < maxMacro2) return;
  registerScroll("#svg_macro2", (event, isDown) => {
    if (playMacro2VideEnded) {
      $("#icon-mouse-scroll").fadeOut(500);
      if (isDown) {
        scrollTo(5, 1000, false);
      } else {
        scrollTo(3, 1000, false);
      }
      d3.select("#macro2_audio")
        .transition()
        .duration(1000)
        .style("display", "none");
    }
  });
}