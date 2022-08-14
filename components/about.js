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
                if (offY < -780 && offY > -1080) {
                    d3.select("#InMacro")
                        .attr("transform", `translate(0 ${-offY-780})`);
                }
            }
        } else {
            if (offY < 0) {
                offY += 60;
                aboutPageObj.attr("transform", `translate(0 ${offY})`);
                if (offY < -780 && offY > -1080) {
                    d3.select("#InMacro")
                        .attr("transform", `translate(0 ${-offY-780})`);
                }
            } else {
                scrollTo(10, 1000, false);
            }
        }
    });
    
    $("#aboutVideo").click(()=>{
        const audioEle = document.getElementById("backgroud-audio");
        if (!audioEle.paused) {
            $("#home_voice").click()
        }
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

