let loadHome = 0;
const maxHome = 11;
let stage_ig= -2
function initHome() {
    loadHome++;
    if (loadHome < maxHome) return;

    console.log("load Home")

    let initial = false;
    let duringInitial = false;
    function init() {
        if (initial || duringInitial) return;
        duringInitial = true;
        d3.select("#home_moon").transition().duration(1000).attr("transform", "scale(0.3) translate(4000, 500)");
        d3.select("#home_logo").transition().duration(1000).attr("opacity", 1).attr("transform", "translate(0, 0)");
        d3.select("#home_title").transition().duration(1000).attr("opacity", 1).attr("transform", "translate(0, -30)")
            .on('end', ()=>{
                d3.select("#home_title").transition().duration(300).attr("transform", "translate(0, 0)").on('end', ()=>{
                    initial = true;
                    duringInitial = false;
                })
            });
    }

    registerScroll("#home", (event, isDown) => {
        if(isDown) {
            if (!initial) {
                init()
            } else if (!duringInitial){
                scrollTo(1, 1000, false)
                setTimeout(()=>showLight(), 500);
            }
        }
    })
}