(function(a) {
    if (typeof define == "function" && define.amd) {
        define(["jquery"], a)
    } else {
        if (typeof exports === "object") {
            module.exports = a(require("jquery"))
        } else {
            a(jQuery)
        }
    }
}(function(c) {
    var k = [],
        b, l, e = document,
        j = window,
        i = e.documentElement,
        a;
    c.event.special.inview = {
        add: function(d) {
            k.push({
                data: d,
                $element: c(this),
                element: this
            });
            if (!a && k.length) {
                a = setInterval(g, 250)
            }
        },
        remove: function(n) {
            for (var m = 0; m < k.length; m++) {
                var d = k[m];
                if (d.element === this && d.data.guid === n.guid) {
                    k.splice(m, 1);
                    break
                }
            }
            if (!k.length) {
                clearInterval(a);
                a = null
            }
        }
    };

    function h() {
        var n, d, m = {
            height: j.innerHeight,
            width: j.innerWidth
        };
        if (!m.height) {
            n = e.compatMode;
            if (n || !c.support.boxModel) {
                d = n === "CSS1Compat" ? i : e.body;
                m = {
                    height: d.clientHeight,
                    width: d.clientWidth
                }
            }
        }
        return m
    }

    function f() {
        return {
            top: j.pageYOffset || i.scrollTop || e.body.scrollTop,
            left: j.pageXOffset || i.scrollLeft || e.body.scrollLeft
        }
    }

    function g() {
        if (!k.length) {
            return
        }
        var o = 0,
            q = c.map(k, function(t) {
                var r = t.data.selector,
                    s = t.$element;
                return r ? s.find(r) : s
            });
        b = b || h();
        l = l || f();
        for (; o < k.length; o++) {
            if (!c.contains(i, q[o][0])) {
                continue
            }
            var m = c(q[o]),
                d = {
                    height: m[0].offsetHeight,
                    width: m[0].offsetWidth
                },
                n = m.offset(),
                p = m.data("inview");
            if (!l || !b) {
                return
            }
            if (n.top + d.height > l.top && n.top < l.top + b.height && n.left + d.width > l.left && n.left < l.left + b.width) {
                if (!p) {
                    m.data("inview", true).trigger("inview", [true])
                }
            }

            // 如果不想一直重複動畫 就把else的部分隱藏
            else {
                if (p) {
                    m.data("inview", false).trigger("inview", [false])
                }
            }
            
        }
    }
    c(j).on("scroll resize scrollstop", function() {
        b = l = null
    });
    if (!i.addEventListener && i.attachEvent) {
        i.attachEvent("onfocusin", function() {
            l = null
        })
    }
}));