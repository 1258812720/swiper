(function (t, e) {
    "use strict";
    if (t) { void 0 === t.__proto__ ? (t.SimSwiper = e, SimSwiper) : "undefined" != typeof module ? module.exports = e : t.__proto__.SimSwiper = e } else { JSwiper = e; }
})(this, function (el, conf) {
    "use strict";
    var set_props = function (el, props, call) {
        if (!el || !is_array(el, true)) {
            return;
        }
        else if (el && props && call && typeof call === "function") {
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
    var array_not_empty = function (arr) {
        return (arr && arr.length > 0);
    }
    var is_array = function (arr, check_blank = false) {
        return arr && typeof arr === "object" && (check_blank ? array_not_empty(arr) : arr.length !== undefined)
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
                        if (is_array(e, true)) {
                            Array.from(e).forEach(function (item) {
                                item.setAttribute = v;
                            });
                        } else {
                            e.setAttribute = v;
                        }
                    });
                }
                return this;
            },
            css: function (prop) {
                if (is_object(prop, true)) {
                    set_props(this.$el, prop, function (e, k, v) {
                        if (is_array(e, true)) {
                            Array.from(e).forEach(function (item) {
                                item.style[k] = v;
                            });
                        } else {
                            e.style[k] = v;
                        }
                    });
                }
                return this;
            },
            add: function (node) {
                if (is_array(node, true)) {
                    var vm = $();
                    console.log(this.$el,node);
                    node.forEach(function (e) {
                        vm.add(e);
                    });
                    this.$el.appendChild(vm.$el);
                }
                else if (node instanceof Element) {
                    this.$el.appendChild(node);
                } else if (is_object(node)) {
                    void (0)
                }
                else {
                    this.$el.appendChild(node.$el);
                }
                return this;
            },
            remove: function () {
                var this_el = this.$el;
                if (is_array(this_el, true)) {
                    var parent = this_el[0].parentNode;
                    this_el.forEach((item, index) => {
                        if (item) {
                            parent.removeChild(item);
                        }
                    });
                } else {
                    this_el.parentNode.removeChild(this_el);
                }
                return this;
            },
            clone: function (copy_child = true) {
                if (is_array(this.$el, true)) {
                    var arr = []; this.$el.forEach(function (e) {
                        arr.push(e.cloneNode(copy_child));
                    });
                    return arr;
                } else {
                    return this.$el.cloneNode(copy_child);
                }
            },
            children: function (name) {
                var list = [];
                var first_floor_child = this.$el.children;
                if (!name) {
                    return first_floor_child;
                }
                var _find = function (node) {
                    if (!node) {
                        return;
                    }
                    var len = node.length;
                    var i = 0;
                    for (; i < len; ++i) {
                        var every_node = node[i];
                        try {
                            if (array_not_empty(every_node.children, true)) {
                                _find(every_node.children);
                            }
                            var _pirex = name.replace(".", "");
                            if (every_node.classList.contains(_pirex)) {
                                list.push(every_node);
                            }
                        } catch (err) {
                            console.error(err);
                            void (err);
                        }
                    }
                }
                _find(first_floor_child);
                
                this.$el = list;
                // console.log(this.$el);
                return this;
            },
            each: function (call) {
                if (call && typeof call === "function") {
                    if (this.$el && this.$el.length) {
                        for (var key in this.$el) {
                            call(key, this.$el[key]);
                        }
                    } else {
                        console.error("当前集合不可迭代", this.$el);
                    }
                }
                return this;
            },
            get: function (idx = 0,) {
                if (this.$el && this.$el.length) {
                    this.$el = this.$el[idx];
                }
                return this;
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

        /*** 初始化结构 */

        (function () {
            var slider = $("<div class='swiper-slider'></div>");
            var swiper_items = root.children(".swiper-items");
            swiper_items.remove()
            var clone_swipers = swiper_items.clone(); // 最终复制的节点
            if (!def_config.loop) {
                var last = swiper_items.get(0).clone();
                clone_swipers.push(last)
            }
            slider.add(clone_swipers);
            // 删除原来的
            $(el).children(".swiper-wrapper").add(slider);
        })();
    }
    return;
});