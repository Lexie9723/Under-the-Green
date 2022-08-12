let loadHome = 0;
const maxHome = 11;
let stage_ig = -2

let bubbleInited = false
function initHome() {
    loadHome++;
    if (loadHome < maxHome) return;

    console.log("load Home")

    let initial = false;
    let duringInitial = false;

    let bubbles = [
        $.ajax({ url: "resource/element_home/Bubble.svg", async: false })
            .responseText,
        $.ajax({ url: "resource/element_home/BubbleCO2.svg", async: false })
            .responseText,
    ];
    let particles = [];
    let animaGroup = d3.select("#home_anima").selectAll();

    /////////////
    function Particle() { }
    Particle.prototype.update = function () {
        let dx = this.destX - this.x;
        let dy = this.destY - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let speed = this.speed;
        if (dist < 50) {
            speed = (dist / 300) * this.speed;
            let sx = Math.random() * 1920;
            let sy = 780 + Math.random() * 40;
            this.reset(
                sx,
                sy,
                sx + Math.random() * 300 - 150,
                sy - Math.random() * 780,
                1 + 2 * Math.random(),
                1 + Math.random() * 0.4 - 0.2
            );
        }
        this.x += speed * this.vector.x;
        this.y += speed * this.vector.y;
        return false;
    };
    Particle.prototype.reset = function (x, y, destX, destY, speed, scale) {
        this.scale = scale;
        this.x = x;
        this.y = y;
        this.destX = destX;
        this.destY = destY;
        // 一定概率向中心汇聚
        // if (Math.random() < 0.3) {
        //     this.destX = 940;
        //     this.destY = 1000;
        // }
        let dx = this.destX - this.x;
        let dy = this.destY - this.y;
        let directionAngle = Math.PI / 2 - Math.atan2(dx, dy);
        this.speed = speed;
        this.vector = {
            x: Math.cos(directionAngle),
            y: Math.sin(directionAngle),
        };
    };
    ////////////////
    let animloop_home = function () {
        if (animaGroup !== null) {
            if (particles.length > 0) {
                animaGroup
                    .each((p) => p.update())
                    .attr(
                        "transform",
                        (p) => `translate(${p.x}, ${p.y})translate(-58, -58)`
                    );
            }
            window.requestAnimationFrame(animloop_home);
        }
    };
    animloop_home();
    function updateParticles_home(size) {
        particles = [];
        for (let i = 0; i < size; i++) {
            let sx, sy, dx, dy;
            sx = Math.random() * 1920;
            sy = 780 + Math.random() * 40;
            dx = sx + Math.random() * 300 - 150;
            dy = sy - Math.random() * 780;
            let p = new Particle();
            p.reset(
                sx,
                sy,
                dx,
                dy,
                0.5 + Math.random(),
                1 + Math.random() * 0.4 - 0.2
            );
            particles.push(p);
        }
        animaGroup = d3
            .select("#home_anima")
            .selectAll("g")
            .data(particles)
            .join("g")
            .attr("transform", (p) => `scale(${p.scale})translate(${p.x}, ${p.y})`);

        animaGroup.each(function () {
            if (Math.random() > 0.7) {
                $(this).append(bubbles[0]);
            } else {
                $(this).append(bubbles[1]);
            }
        });
    }


    function init() {
        if (initial || duringInitial) return;
        duringInitial = true;

        d3.select("#home_sky").transition().duration(1000).attr("opacity", 1);
        d3.select("#home_moon").transition().duration(1000).attr("opacity", 1).attr("transform", "scale(0.3) translate(4000, 500)");
        d3.select("#home_logo").transition().duration(1000).attr("opacity", 1).attr("transform", "translate(0, 0)");
        d3.select("#home_title").transition().duration(1000).attr("opacity", 1).attr("transform", "translate(0, -30)")
            .on('end', () => {
                d3.select("#home_title").transition().duration(300).attr("transform", "translate(0, 0)").on('end', () => {
                    initial = true;
                    duringInitial = false;
                })
            });
        d3.select("#Description1").attr("opacity", 1);
        d3.select("#Description2").attr("opacity", 0);
        d3.select("#Description3").attr("opacity", 0);
        d3.select("#Description4").attr("opacity", 0);

    }

    registerScroll("#home", (event, isDown) => {
        if (isDown) {
            if (!initial) {
                init()
                if(!bubbleInited){
                    updateParticles_home(8);
                    bubbleInited = true
                    $("#icon-mouse-scroll").fadeOut(500);
                    d3.select("#home_description").transition().duration(1000).attr("opacity", 1);
                }
            } else if (!duringInitial) {
                scrollTo(1, 1000, false)
                setTimeout(() => showLight(), 500);
            }
            // 靠滚轮事件触发音效
            // 之所以要靠手动触发，是因为要规避报错：
            //     Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first.
            const audioEle = document.getElementById("backgroud-audio");
            audioEle.muted = false;
            audioEle.play();
        }
    })

    $("#_nav_Macro").click(function(){
        scrollTo(3, 1000, false)
    })
    $("#_nav_Micro").click(function(){
        scrollTo(6, 1000, false)
    })
    $("#_nav_Mingling").click(function(){
        scrollTo(10, 1000, false)
    })
    $("#_nav_About").click(function(){
        scrollTo(11, 1000, false)
    })
    
    d3.select("#aboutInMotivation").attr("opacity", "1");
    d3.select("#aboutInMacro").attr("opacity", "0");
    d3.select("#aboutInMicro").attr("opacity", "0");
    d3.select("#aboutInMingling").attr("opacity", "0");
}

function showAbout(){
    d3.select("#home_about_detail").transition().duration(10).attr("transform", "translate(0, 0)")
        .on("end", ()=>{
            d3.select("#home_about_detail").transition().duration(400).attr("opacity", 1);
        })
    
    $("#Hide").click(function(){
        d3.select("#home_about_detail").transition().duration(400).attr("transform", "translate(0, 540)").attr("opacity", 0)
            .on("end", ()=>d3.select("#home_about_detail").attr("transform", "translate(0, 1080)").attr("opacity", 0.1))
    })
}

function triggerAudio(){
    const audioEle = document.getElementById("backgroud-audio");
    if (audioEle.paused) {
        audioEle.play();
        $("#home_voice #Waves").attr("opacity", "1")
    } else {
        audioEle.pause()
        $("#home_voice #Waves").attr("opacity", "0")
    }
}