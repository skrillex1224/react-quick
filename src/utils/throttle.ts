//节流
export  function throttle(eventHandler :Function,delay =200) {
    let timer ;
    return function(...params){
        if(timer) return ;
        timer = setTimeout(()=>{
            eventHandler(...params)
            timer = undefined;
        },delay)
    }
}

//防抖
export  function debounce(eventHandler : Function , internal = 200){
    let timer ;
    return function(...params){
        if(timer) clearTimeout(timer);
        timer = setTimeout(()=>{
            eventHandler(...params)
        },internal);
    }
}
