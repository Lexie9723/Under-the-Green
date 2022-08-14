let loadMicro3 = 0;
const maxMicro3 = 1;

function initAnimMicro3() {
    d3.select("#micro3")
        .transition()
        .duration(1000)
        .attr("opacity", 1)
        .attr("transform", "translate(0, 40)");
}

function initMicro3() {
    loadMicro3++;
    if (loadMicro3 < maxMicro3) return;

    registerScroll("#svg_micro3", (event, isDown) => {
        if (isDown) {
            scrollTo(9, 1000, false);
            setTimeout(() => showLight(), 500);
            initAnimMicro();
        } else {
            scrollTo(7, 1000, false);
            $("#icon-mouse-scroll").fadeIn(1200);
        }
    });

}
