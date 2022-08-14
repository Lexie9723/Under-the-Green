let loadAbout = 0;
const maxAbout = 1;
offY = 0;

function initAbout() {
    loadAbout++;
    if (loadAbout < maxAbout) return;
    let aboutPageObj = d3.select("#about_page");
    registerScroll("#about_page", (event, isDown) => {
        $("#icon-mouse-scroll").fadeOut(10);
        if (isDown) {
            if (offY > 1080 - 5700) {
                offY -= 60;
                aboutPageObj.attr("transform", `translate(0 ${offY})`);
            }

        } else {
            if (offY < 0) {
                offY += 60;
                aboutPageObj.attr("transform", `translate(0 ${offY})`);
            } else {
                scrollTo(10, 1000, false);
            }
        }
    });
    
    $("#aboutVideo").click(()=>{
        $("#home_voice").click()
        d3.select("#home3_audio").style("display", "none");
        d3.select("#macro2_audio").style("display", "none");
        d3.select("#about_video")
            .transition()
            .duration(1000)
            .style("display", "inline-block");
    })

    $("#about_video_close").click(()=>{
        d3.select("#about_video")
            .transition()
            .duration(1000)
            .style("display", "none");
    })
}

