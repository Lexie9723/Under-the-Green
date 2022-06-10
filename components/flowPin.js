function showPin(x, y, id, content, func) {
    let pin = $(`#${id}`)
    let action = ()=>{
        pin.css('opacity', 0).css('display', '').css('transform', `translate(${x}px, ${y}px)`)
        if(content != null){
            Object.keys(content).forEach(key=>{
                $(`#${id}_${key}`).text(content[key])
            })
        }
        func&&func(pin);
        pin.animate({opacity: 1}, 0);
    }
    if (pin.css('opacity') === 1 || pin.css('opacity') === '1') {
        pin.animate({opacity: 0}, 0, ()=>{
            action()
        })
    } else {
        action()
    }
}

let leaving = false
function hidePin(id, func) {
    if(leaving) return false
    let pin = $(`#${id}`);
    func&&func(pin);
    if (pin.css('opacity') === 1 || pin.css('opacity') === '1' && !leaving) {
        leaving = true
        pin.animate({opacity: 0}, 0, ()=>{
            pin.css('display', 'none')
            leaving = false
        })
        return true
    } else {
        pin.animate({opacity: 0}, 0, ()=>{
            pin.css('display', 'none')
            leaving = false
        })
    }
    return false
}
