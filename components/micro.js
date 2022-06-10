let loadMicro = 0;
const maxMicro = 1;
function initMicro() {
    loadMicro++;
    if (loadMicro < maxMicro) return;

    console.log("load Micro")
    const timeline_bar = d3.select("#timeline_bar_2");
    const timeline_button = d3.select("#timeline_button_2");
    let yr = 0;
    const range = 30 - 5;

    timeline_button.call(d3.drag()
        .on('drag', function(e){
            if (e.y < 360 + 370 && e.y > 370) {
                timeline_bar.attr('height', e.y - 370)
                timeline_button.attr('transform', `translate(0 ${e.y - 370})`)

                let newYr = Math.ceil((e.y - 375) * range / 360);
                if (newYr !== yr) {
                    setYear(newYr)
                    timeline_button.select('text').text(`${yr + 5}`)
                }
            }
        }));

    function setYear(year) {
        if (year !== yr && year >= 0 && year <= range) {
            yr = year;
        }
    }

    registerScroll("#micro", (event, isDown) => {
        if (isDown && yr < range) {
            setYear(yr + 1)
            timeline_button.select('text').text(`${yr + 5}`)
            let offY = yr * 360 / range
            timeline_bar.transition().duration(500).attr('height', offY)
            timeline_button.transition().duration(500).attr('transform', `translate(0 ${offY})`)
        } else if (!isDown) {
            if (yr > 0) {
                setYear(yr - 1)
                timeline_button.select('text').text(`${yr + 5}`)
                let offY = yr * 360 / range
                timeline_bar.transition().duration(500).attr('height', offY)
                timeline_button.transition().duration(500).attr('transform', `translate(0 ${offY})`)
            } else {
                hideNavigationBar();
                scrollTo(2, 1000, false)
            }
        } else {
            // scrollTo(3, 1000, false)
        }

    })
}