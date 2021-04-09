function focusMap(vi, primCon, serialNum, pre, next, active) {
    var serialNum = serialNum || 0;
    var viewport = document.querySelector(vi);
    var con = viewport.querySelector(primCon);
    var left = viewport.querySelector(pre);
    var right = viewport.querySelector(next);
    var circles = document.querySelector(serialNum);
    var w = viewport.offsetWidth;
    //生成小圆点并添加点击事件
    for (var i = 0; i < con.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('data-index', i);
        circles.appendChild(li);
        li.addEventListener('click', function() {
            /* for (var m = 0; m < circles.children.length; m++) {
                circles.children[m].className = '';
            }
            this.className = active; */
            var fir = con.firstElementChild.getAttribute('data-index');
            var now = this.getAttribute('data-index');
            var num = now - fir;
            num < 0 ? prevImg(con, Math.abs(num)) : nextImg(con, num);
        })
    }
    circles.children[0].className = active;

    viewport.addEventListener('mouseenter', function(e) {
        left.style.display = 'block';
        right.style.display = 'block';
        clearInterval(t);
    });

    viewport.addEventListener('mouseleave', function(e) {
        left.style.display = 'none';
        right.style.display = 'none';
        t = setInterval(function() {
            nextImg(con, 1);
        }, 2000);
    });

    if (pre) {
        left.onclick = function() { prevImg(con, 1); }
    }
    if (next) {
        right.onclick = function() { nextImg(con, 1); }
    }


    function prevImg(obj, p) {
        if (!obj.timer) {
            var t1 = new Date();
            obj.style.left = -p * w + 'px';
            for (var z = 0; z < p; z++) {
                obj.insertBefore(obj.lastElementChild, obj.firstElementChild);
            }
            slide(obj, 0, function() {
                var t2 = new Date();
                console.log(t2 - t1);
            });
            var index = parseInt(obj.firstElementChild.getAttribute('data-index'));
            for (var i = 0; i < circles.children.length; i++) {
                circles.children[i].className = '';
            }
            circles.children[index].className = active;
        }
    }

    function nextImg(obj, p) {
        if (!obj.timer) {
            var t1 = new Date();
            slide(obj, -p * w, function() {
                for (var z = 0; z < p; z++) {
                    obj.appendChild(obj.firstElementChild);
                }
                obj.style.left = 0;
                var t2 = new Date();
                console.log(t2 - t1);
            });

            var index = parseInt(obj.firstElementChild.getAttribute('data-index')) + p;
            for (var i = 0; i < circles.children.length; i++) {
                circles.children[i].className = '';
            }
            if (index == circles.children.length) {
                index = 0;
            }
            circles.children[index].className = active;
        }
    }
    //自动轮播
    var t = setInterval(function() { nextImg(con, 1); }, 2000);
}