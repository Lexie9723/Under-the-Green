let loadMicro1 = 0;
const maxMicro1 = 3;
let initial = false;
let micro1TextNum = 0;

function initAnimMicro1() {
  if (micro1TextNum === 2) return;
  // d3.select("#micro1_bg")
  //   .transition()
  //   .duration(1000)
  //   .attr("transform", "translate(0, -200)");
  d3.select("#micro1_bg")
    .transition()
    .delay(1000)
    .attr("transform", "translate(0, 0)");
  //   d3.select("#micro1_modal")
  //     .transition()
  //     .delay(1000)
  //     .attr("transform", "translate(0, 0)");
    d3.select("#micro1_text1")
      .transition()
      .duration(1000)
      .attr("opacity", 1)
      .attr("transform", "translate(0, 0)")
      .on("end", () => {
        micro1TextNum++;
      });
}
function initMicro1() {
  loadMicro1++;
  console.log("loadMicro1--", loadMicro1);
  if (loadMicro1 < maxMicro1) return;

  console.log("load Micro1");

  registerScroll("#svg_micro1", (event, isDown) => {
    if (isDown) {
      console.log("micro1TextNum++", micro1TextNum);
      if (micro1TextNum > 1) {
        scrollTo(7, 1000, false);
        // setTimeout(() => showLight(), 500);
      } else {
        d3.select("#micro1_text1")
          .transition()
          .duration(1000)
          .attr("opacity", 0)
          .attr("transform", "translate(0, 0)");
        d3.select("#micro1_text2")
          .transition()
          .duration(1000)
          .attr("opacity", 1)
          .attr("transform", "translate(0, 0)")
          .on("end", () => {
            micro1TextNum++;
          });
      }
    } else {
      scrollTo(5, 1000, false);
    }
  });
}
