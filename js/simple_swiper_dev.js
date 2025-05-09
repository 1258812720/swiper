(function (t, e) {
    "use strict";
    if (t) { void 0 === t.__proto__ ? (t.SimSwiper = e, SimSwiper) : "undefined" != typeof module ? module.exports = e : t.__proto__.SimSwiper = e } else { JSwiper = e; }
})(this, function (el, conf) {
    "use strict";

    var ID_VERSION = "ID.VERSION." + new Date().getMilliseconds() + "" + parseInt(Math.random() * 10000);
    var deep_copy = function (obj) {
        if (obj === null || typeof obj !== "object") {
            return obj;
        }
        let copy = Array.isArray(obj) ? [] : {};

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                copy[key] = deepClone(obj[key]);
            }
        }
        return copy;
    }
    var set_props = function (el, props, call) {
        if (!el) {
            return;
        }
        else if (call && typeof call === "function") {
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
    var is_function = function (f) {
        return typeof f === "function";
    }
    var get_style = function (el, prop) {
        var _el = undefined;
        if (!el) {
            return prop;
        }
        else if (!(el instanceof Element)) {
            _el = el.$el;
        } else {
            _el = el;
        }
        if (!prop) {
            return _el.getBoundingClientRect();
        } else if (prop && typeof prop === "string") {
            _el.getBoundingClientRect()[prop];
        }
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
            events: [],
            add_attr: function (node, k, v, is_class = false, id) {
                if (id !== ID_VERSION) { 
                    throw new Error();
                }
                if (node && node instanceof Element) {
                    if (is_class) {
                        node.classList.add(v);
                    } else {
                        node.setAttribute(k, v);
                    }
                }
                return undefined;
            },
            attr: function (prop) {
                var t = this;
                if (is_object(prop, true)) {
                    set_props(this.$el, prop, function (e, k, v) {
                        var is_class = k === "class";
                        if (is_array(e, true)) {
                            Array.from(e).forEach(function (item) {
                                t.add_attr(item, k, v, is_class, ID_VERSION);
                            });
                        } else {
                            t.add_attr(e, k, v, is_class, ID_VERSION)
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
                        } else if (e instanceof Element) {
                            e.style[k] = v;
                        }
                    });
                } else {
                    void (0);
                }
                return this;
            },
            add: function (node) {
                var _el = this.$el;
                var tag = is_array(_el, true);
                function _push(element, insert_content) {
                    if (!insert_content) {
                        return;
                    }
                    if (tag) {
                        var i = 0,
                            len = element.length;
                        for (; i < len; i++) {
                            element[i].appendChild(insert_content);
                        }
                    } else {
                        element.appendChild(insert_content);
                    }
                }

                if (is_array(node, true)) {
                    var vm = $();
                    node.forEach(function (e) {
                        vm.add(e);
                    });
                    _push(this.$el, vm.$el);
                }
                else if (node instanceof Element) {
                    _push(this.$el, node);
                } else if (is_object(node) && node.$el !== undefined) {
                    _push(this.$el, node.$el);
                }
                else {
                    void (0)
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
            size: function () {
                if (!this.$el) {
                    return 0;
                } else if (is_array(this.$el)) {
                    return this.$el.length;
                } else {
                    return 1;
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
            },
            on: function (event, func) {
                this.events.push(func);
                this.bind_event(ID_VERSION, this.$el, function (e) {
                    e.addEventListener(event, func);
                })
                return this;
            },
            bind_event: function (number, el, call) {
                if (number !== ID_VERSION) {
                    throw new Error("禁止访问");
                }
                if (!el) {
                    return;
                }
                else if (el instanceof Element) {
                    if (is_function(call)) {
                        call(el);
                    }
                } else if (is_array(el, true)) {
                    for (var ev in el) {
                        var _el = el[ev];
                        if (_el instanceof Element) {
                            if (is_function(call)) {
                                call(el[ev]);
                            }
                        }
                    }
                }
            },
            off: function (event) {
                var _events = this.events;
                if (_events.length === 0) {
                    return;
                }
                this.bind_event(ID_VERSION, this.$el, function (el) {// 需要解决一下解绑后的句柄
                    console.log("移除事件", el);
                    _events.forEach(function (fc, index) {
                        el.removeEventListener(event, fc, false);
                        _events.splice(index, 1);
                    })
                });
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

        (function () {
            var slider = $("<div class='swiper-slider'></div>");
            var swiper_items = root.children(".swiper-items");
            swiper_items.remove()
            var clone_swipers = swiper_items.clone(); // 最终复制的节点
            if (def_config.loop) {
                var last = swiper_items.get(0).clone();
                clone_swipers.push(last);
            }
            var root_size = get_style($(el));
            var size = clone_swipers.length;
            // 判断方向
            var style_config = {
                height: undefined,
                width: undefined
            }
            if (def_config.direction === "vertical") {
                style_config.width = root_size.width + "px";
                style_config.height = (root_size.height * size) + "px";
                $(el).attr({ class: "vertical" })
            }
            else {
                style_config.height = root_size.height + "px";
                style_config.width = (root_size.width * size) + "px";
                $(el).attr({ class: "horizontal" })
            }
            slider.css(style_config).add(clone_swipers);
            $(el).children(".swiper-wrapper").add(slider); // 删除原来的
            $(el).children(".swiper-items").css({
                width: root_size.width + "px",
                height: root_size.height + "px"
            });
            /*** 初始化结构 */
            var slide = $(el).children(".swiper-slider");
            var u = 0;
            var t1 = $("#next").on("click", () => {
                u++;
                if (u > size - 1) {
                    u = 0;
                    slide.css({
                        transition: "all 0s ease",
                        transform: `translate3d(0,0,0)`
                    });
                    get_style(slide.get(0));
                    u = 1;
                    slide.css({
                        transition: "all .3s ease",
                        transform: `translate3d(-${u * root_size.width}px,0,0)`
                    });
                } else {
                    slide.css({
                        transition: "all .3s ease",
                        transform: `translate3d(-${u * root_size.width}px,0,0)`
                    });
                }
            }).off("click");

            var t2 = $("#prev").on("click", () => {
                u--;
                slide.css({
                    transition: "all .3s ease",
                    transform: `translate3d(-${u * root_size.width}px,0,0)`
                })
            });
            console.log(t1, t2);
        })();
    }
    return;
});