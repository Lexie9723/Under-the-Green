let nbShow = true;
$(document).ready(function () {
  registerScroll("#widthDiv", (event, isDown) => {
    if (Page < 3) return;
    if (isDown) {
      hideNavigationBar();
    } else {
      showNavigationBar();
    }
  });
});

function showNavigationBar() {
  if (nbShow) return;
  nbShow = true;
  d3.select("#experiment_navigation_bar")
    .transition()
    .duration(500)
    .attr("opacity", 1)
    .attr("transform", `translate(0 0)`);
}

function hideNavigationBar() {
  if (!nbShow) return;
  nbShow = false;
  d3.select("#experiment_navigation_bar")
    .transition()
    .duration(500)
    .attr("opacity", 0)
    .attr("transform", `translate(0 -20)`);
}
