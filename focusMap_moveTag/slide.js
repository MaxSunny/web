function slide(obj, target, callback) {
    //if (!obj.timer) {
    obj.timer = setInterval(function() {
        var st = (target - obj.offsetLeft) / 10;
        step = st > 0 ? Math.ceil(st) : Math.floor(st);
        obj.style.left = obj.offsetLeft + step + 'px';
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            obj.timer = null;
            callback && callback();
            /* if (st < 0) {
                con.appendChild(obj.firstElementChild);
                con.style.left = 0;
            } */
        }
    }, 15);
    //}
}