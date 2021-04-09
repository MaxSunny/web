window.addEventListener('load', function() {
    var arrow_l = document.querySelector('.left');
    var arrow_r = document.querySelector('.right');
    var focus = document.querySelector('.viewport');
    var ul = focus.querySelector('.content');
    var ol = focus.querySelector('.circle');
    var num = 0;
    var circle = 0;
    var flag = true;
    var focusWidth = focus.offsetWidth;
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function() {
            var t1 = new Date();
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'active';
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul, -index * focusWidth, function() {
                var t2 = new Date();
                console.log(t2 - t1)
            });
        })
    }
    ol.children[0].className = 'active';
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            arrow_r.click();
        }, 2000);
    });

    arrow_r.addEventListener('click', function() {
        if (flag) {
            var t1 = new Date();
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true; // 打开节流阀
                var t2 = new Date();
                console.log(t2 - t1);
            });
            circle++;
            // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });

    arrow_l.addEventListener('click', function() {
        if (flag) {
            var t1 = new Date();
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
                var t2 = new Date();
                console.log(t2 - t1);
            });
            circle--;
            // 如果circle < 0  说明第一张图片，则小圆圈要改为第4个小圆圈（3）
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    });

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'active';
    }
    var timer = setInterval(function() {
        arrow_r.click();
    }, 2000);


})