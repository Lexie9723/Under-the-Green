let nbShow = true;
$(document).ready(function () {
	registerScroll("#widthDiv", (event, isDown) => {
		if (Page < 2) return;
		if (isDown) {
			if (Page == 3 || Page == 6 || Page == 10 || Page == 11 ) {
				showNavigationBar();
			} else {
				hideNavigationBar();
			}
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
	d3.select("#home_logo")
		.transition()
		.duration(500)
		.attr("opacity", 0)
		.attr("transform", `translate(0 -20)`);
}

function hideNavigationBar() {
	if (!nbShow) return;
	nbShow = false;
	d3.select("#experiment_navigation_bar")
		.transition()
		.duration(500)
		.attr("opacity", 0)
		.attr("transform", `translate(0 -20)`);
	d3.select("#home_logo")
		.transition()
		.duration(500)
		.attr("opacity", 1)
		.attr("transform", `translate(0 0)`);
}
