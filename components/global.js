
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
    return this
};

var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

let Page = 0
let widthDiv
let flowPin
let pageHeight = window.innerHeight

$(document).ready(function () {
    widthDiv = $('#widthDiv');
    flowPin = $('#flowPin');
    function resize() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        if (width / height > 1920 / 1080) {
            widthDiv.css('width', `${192000 / (1080 * width / height)}%`)
            pageHeight = height
        } else {
            pageHeight = width * 1080 / 1920
            widthDiv.css('width', '100%')
        }
        widthDiv.css('top', `${-pageHeight * Page}px`)
        let per = pageHeight / 1080
        flowPin.css('transform', `translate(${(width - per * 1920) / 2}px, 0px)scale(${per})`)
    }
    window.addEventListener("resize", resize)
    resize()
})

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

let inTrans = false
function scrollTo(page, speed, callback, ease){
    if(inTrans) return false;
    if(page !== Page) {
        inTrans = true
        let realPage = page;
        if (page >= 1) {
            realPage += 250 / 1080;
        }
        if (page >= 2) {
            realPage += 50 / 1080;
        }
        let offset = `${-pageHeight * realPage}px`
        if(speed) {
            if(ease) {
                widthDiv.animate({top: offset}, speed, ease,()=>{
                    callback&&callback()
                    inTrans = false
                })
            } else {
                widthDiv.animate({top: offset}, speed,()=>{
                    callback&&callback()
                    inTrans = false

                })
            }
            Page = page

            // 导航栏跟随逻辑
            switch(Page){
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    $("#icon-mouse-scroll").fadeOut(10);
                    d3.select("#_nav_Macro").attr("style", "fill:#04e3ff;font-size:24px;font-weight:700;");
                    d3.select("#_nav_Micro").attr("style", "fill:#fff;font-size:24px;");
                    d3.select("#_nav_Mingling").attr("style", "fill:#fff;font-size:24px;");
                    d3.select("#_nav_About").attr("style", "fill:#fff;font-size:24px;");
                    d3.select("#_nav_under_line").attr("x1", "338").attr("x2", "413");
                    break;
                case 6:
                case 7:
                case 8:
                case 9:
                    $("#icon-mouse-scroll").fadeOut(10);
                    d3.select("#_nav_Macro").attr("style", "fill:#fff;font-size:24px;");
                    d3.select("#_nav_Micro").attr("style", "fill:#04e3ff;font-size:24px;font-weight:700;");
                    d3.select("#_nav_Mingling").attr("style", "fill:#fff;font-size:24px;");
                    d3.select("#_nav_About").attr("style", "fill:#fff;font-size:24px;");
                    d3.select("#_nav_under_line").attr("x1", "453").attr("x2", "517");
                    break;
                case 10:
                    $("#icon-mouse-scroll").fadeOut(10);
                    d3.select("#_nav_Macro").attr("style", "fill:#fff;font-size:24px;");
                    d3.select("#_nav_Micro").attr("style", "fill:#fff;font-size:24px;");
                    d3.select("#_nav_Mingling").attr("style", "fill:#04e3ff;font-size:24px;font-weight:700;");
                    d3.select("#_nav_About").attr("style", "fill:#fff;font-size:24px;");
                    d3.select("#_nav_under_line").attr("x1", "557").attr("x2", "660");
                    break;
                case 11:
                    $("#icon-mouse-scroll").fadeOut(10);
                    d3.select("#_nav_Macro").attr("style", "fill:#fff;font-size:24px;");
                    d3.select("#_nav_Micro").attr("style", "fill:#fff;font-size:24px;");
                    d3.select("#_nav_Mingling").attr("style", "fill:#fff;font-size:24px;");
                    d3.select("#_nav_About").attr("style", "fill:#04e3ff;font-size:24px;font-weight:700;");
                    d3.select("#_nav_under_line").attr("x1", "700").attr("x2", "774");
                default:
                    d3.select("#aboutInMotivation").attr("opacity", "1");
                    d3.select("#aboutInMacro").attr("opacity", "0");
                    d3.select("#aboutInMicro").attr("opacity", "0");
                    d3.select("#aboutInMingling").attr("opacity", "0");
                    // $("#icon-mouse-scroll").fadeOut(10);
                    d3.select("#about_page").attr("transform", `translate(0 0)`)
                    offY = 0;
                    break;
            }
            return
        }

        // afterwards line maybe will not run 
        let callbackTo
        let callbackFrom
        if (page === 0){
            opt_mainVis.stage2()
        } else if (page === 1){

        } else if (page === 2){

        } else if (page === 3){

        } else if (page === 4){

        }
        if (Page === 0){
        } else if (Page === 1){

        } else if (Page === 2){

        } else if (Page === 3){
        } else if (Page === 4){
        }
        Page = page
        widthDiv.animate({top: offset}, 1000, ()=>{
            if(Page === page) {
                callbackTo&&callbackTo()
            }
            callbackFrom&&callbackFrom()
            inTrans = false
        })
    }
    return true
}

function lockOrientation (orientation) {
    if(IsPC()) return
    // Go into full screen first
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }

    // Then lock orientation
    screen.orientation.lock(orientation);
}

function registerScroll(selected, scrollHandler, sensitive = 20){
    let startPos
    $(selected).bind(wheelEvent, function(event){
        let e = event.originalEvent
        if(e.deltaY > 0){
            scrollHandler(event, true)
        } else if(e.deltaY < 0) {
            scrollHandler(event, false)
        }
    }).bind('touchstart', function(event){
        let touch = event.originalEvent.targetTouches[0]
        startPos = {x:touch.pageX, y:touch.pageY};
    }).bind('touchmove', function(event){
        let touch = event.originalEvent.targetTouches[0]
        let nowPos = {x:touch.pageX, y:touch.pageY};
        if(Math.abs(nowPos.y - startPos.y) > sensitive) {
            if(nowPos.y < startPos.y){
                scrollHandler(event, true)
            } else if(nowPos.y > startPos.y) {
                scrollHandler(event, false)
            }
            startPos = nowPos
        }
    })
}



