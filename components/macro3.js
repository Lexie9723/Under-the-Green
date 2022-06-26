let loadMacro3 = 0;
const maxMacro3 = 1;

function initMacro3() {
  loadMacro3++;
  console.log("loadMacro3--", loadMacro3);
  if (loadMacro3 < maxMacro3) return;

  console.log("load Macro3");

  registerScroll("#svg_macro3", (event, isDown) => {
    console.log(isDown);
    if (isDown) {
      scrollTo(6, 1000, false);
      setTimeout(() => showLight(), 500);
    } else {
      scrollTo(4, 1000, false);
      d3.select("#macro2_audio")
        .transition()
        .duration(1000)
        .style("display", "inline-block");
    }
  });
}
