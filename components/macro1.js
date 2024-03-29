let loadMacro1 = 0;
const maxMacro1 = 1;

function initAnimMacro1() {
  d3.select("#macro_1")
    .transition()
    .duration(1000)
    .attr("opacity", 1)
    .attr("transform", "translate(0, 40)");
}
function initMacro1() {
  loadMacro1++;
  if (loadMacro1 < maxMacro1) return;
  registerScroll("#svg_macro1", (event, isDown) => {
    if (isDown) {
      scrollTo(4, 1000, false);
      initAnimMacro2();
      $("#icon-mouse-scroll").fadeIn(1200);
    } else {
      scrollTo(2, 1000, false);
      d3.select("#home3_audio")
        .transition()
        .duration(1000)
        .style("display", "inline-block");
      $("#icon-mouse-scroll").fadeIn(1200);
    }
  });
}
