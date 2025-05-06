(function (t, e) {
    "use strict";
    if (t) { void 0 === t.__proto__ ? (t.SimSwiper = e, SimSwiper) : "undefined" != typeof module ? module.exports = e : t.__proto__.SimSwiper = e } else { JSwiper = e; }
})(this, function (el, conf) {
    "use strict";
    var set_props = function (el, props, call) {
        if (el && props && call && typeof call === "function") {
            for (const key in props) {
                if (Object.prototype.hasOwnProperty.call(props, key)) {
                    const element = props[key];
                    call(el, key, element);
                }
            }
        }
    }
    var is_object = function (obj, check_blank = false) {
        return obj && typeof obj === "object" && Reflect.ownKeys(obj).length >= (check_blank ? 1 : 0);
    }
    var $ = function (str_id) {
        var _el = undefined;
        if (!str_id) {
            _el = document.createDocumentFragment();
        }
        else if (typeof str_id === "string") {
            var CLASS = /^[.]/g.test(str_id);
            var ID = /^[#]/g.test(str_id);
            if (CLASS || ID) {
                var els = document.querySelectorAll(str_id),
                    len = els.length;
                _el = len === 1 ? els[0] : els;
            } else if (/<[a-z]+[1-6]?\b[^>]*>(.*?)|<\/[a-z]+[1-6]?>/g.test(str_id)) {
                try {
                    var parse = new DOMParser().parseFromString(str_id, "text/html");
                    _el = parse.body.firstChild;
                } catch (err) {
                    console.error("dom 解析失败", err);
                }
            } else {
                console.error("dom find error");
            }
        }
        else {
            _el = str_id;
        }
        return {
            $el: _el,
            attr: function (prop) {
                if (is_object(prop, true)) {
                    set_props(this.$el, prop, function (e, k, v) {
                        e.setAttribute(k, v)
                    });
                } else {
                    console.error(1)
                }
                return this;
            },
            css: function (prop) {
                if (is_object(prop, true)) {
                    set_props(this.$el, prop, function (e, k, v) {
                        e.style[k] = v;
                    });
                }
                return this;
            },
            add: function (node) {
                if (node instanceof Element) {
                    this.$el.appendChild(node);
                } else {
                    this.$el.appendChild(node.$el);
                }
                return this;
            },
            remove: function (node_name) {
                var children = this.$el.children,
                    len = children.length,
                    i = len;
                for (; i > 0; i--) {
                    var every_node = children[i];
                    if (every_node && every_node instanceof Element) {
                        if (!node_name) {
                            this.$el.removeChild(every_node)
                        } else if (every_node.classList.contains(node_name.replaceAll(".", ""))) {
                            this.$el.removeChild(every_node);
                        }
                    }
                }
                this.$el.removeChild(children[0])
                return this;
            },
            clone: function () {
                return this.$el.cloneNode();
            },
            children: function (name) {
                var _find = function(){

                }
            }
        };
    }

    if (!(el)) {
        console.error("找不到父容器", el);
        return;
    } else {
        var root = $(el),
            def_config = {
                accelerate: false,
                direction: "horizontal",
                ease: "ease",
                disabvarouch: false,
                autoplay: true,
                lazy: undefined,
                loop: true,
                pagination: undefined,
                gap: 0
            }
        if (conf && typeof conf === "object" && Object.keys(conf).length > 0) {
            Object.assign(def_config, conf);
        }
        conf = null;
        def_config.is_mobile = (function () {
            return (/Android|iPhone|iPad|X11|Mac OS X/i.test(navigator.userAgent));
        })();
        Object.freeze(def_config); // 冻结配置

        console.log($(".heiwukong>.swiper-items"))
        
    }
    return;
});