let loadMacro = 0;
const maxMacro = 11;
function initMacro() {
  loadMacro++;
  if (loadMacro < maxMacro) return;

  console.log("load Macro");

  let initial = false;
  let duringInitial = false;
  function init() {
    if (initial || duringInitial) return;
    duringInitial = true;
    // d3.select("#Macro_moon").transition().duration(1000).attr("transform", "scale(0.3) translate(4000, 500)");
    // d3.select("#Macro_logo").transition().duration(1000).attr("opacity", 1).attr("transform", "translate(0, 0)");
    // d3.select("#Macro_title").transition().duration(1000).attr("opacity", 1).attr("transform", "translate(0, -30)")
    //     .on('end', ()=>{
    //         d3.select("#Macro_title").transition().duration(300).attr("transform", "translate(0, 0)").on('end', ()=>{
    //             initial = true;
    //             duringInitial = false;
    //         })
    //     });
  }

  registerScroll("#macro", (event, isDown) => {
    if (isDown) {
      if (!initial) {
        init();
      } else if (!duringInitial) {
        scrollTo(3, 1000, false);
        setTimeout(() => showLight(), 500);
      }
    }
  });
}
