(function (t, e) {
    "use strict";
    if (t) { void 0 === t.__proto__ ? (t.SimSwiper = e, SimSwiper) : "undefined" != typeof module ? module.exports = e : t.__proto__.SimSwiper = e } else { JSwiper = e; }
})(this, function (el, conf) {
    var ID_VERSION = "ID.VERSION." + new Date().getMilliseconds() + "" + parseInt(Math.random() * 10000);
    var deep_copy = function (obj) {
        if (obj === null || typeof obj !== "object") {
            return obj;
        }
        var copy = Array.isArray(obj) ? [] : {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                copy[key] = deep_copy(obj[key]);
            }
        }
        return copy;
    }
    var object_contains = function (obj, key) {
        if (!obj || !key) {
            return false;
        }
        else {
            if (is_object(obj)) {
                return obj[key] !== undefined;
            } else {
                return false;
            }
        }
    }
    var is_document = function (el) {
        return el && (el instanceof Element || el instanceof Document);
    }
    var set_props = function (el, props, call) {
        if (!el) {
            return;
        }
        else if (call && typeof call === "function") {
            for (var key in props) {
                if (Object.prototype.hasOwnProperty.call(props, key)) {
                    var element = props[key];
                    call(el, key, element);
                }
            }
        }
    }
    var is_object = function (obj, check_blank) {
        if (undefined === check_blank) { check_blank = false }
        try {
            return obj && typeof obj === "object" && Reflect.ownKeys(obj).length >= (check_blank ? 1 : 0);
        } catch (err) {
            if (err.number === -2146823279) {
                var t = false;
                for (var o in obj) {
                    t = true;
                    break;
                }
                return t;
            } else {
                return false;
            }
        }

    }
    var array_not_empty = function (arr) {
        return (arr && arr.length > 0);
    }
    var is_array = function (arr, check_blank) {
        if (undefined === check_blank) { check_blank = false }
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
        else if (!is_document(el)) {
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
    var has_class = function (el, class_name) {
        return el.classList.contains(class_name);
    }

    var $ = function (str_id) {
        var _el = undefined;
        if (str_id === undefined) {
            _el = document.createDocumentFragment();
        } else if (is_document(str_id)) {
            _el = str_id;
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
            add_attr: function (node, k, v, is_class, id) {
                if (is_class === undefined) {
                    is_class = false;
                }
                if (id !== ID_VERSION) {
                    throw new Error();
                }
                if (is_document(node)) {
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
                            e.forEach(function (item) {
                                t.add_attr(item, k, v, is_class, ID_VERSION);
                            });
                        } else {
                            t.add_attr(e, k, v, is_class, ID_VERSION)
                        }
                    });
                }
                return this;
            },
            className: function (id, name, add) {
                if (ID_VERSION !== id) {
                    throw new Error("禁止访问");
                }
                if (!name || typeof name !== "string" || name === "") {
                    return;
                }
                if (is_array(this.$el, true)) {
                    this.$el.forEach(function (item) {
                        if (add) {
                            this.$el.classList.add(name);
                        } else {
                            item.classList.remove(name);
                        }
                    })
                } else if (is_document(this.$el)) {
                    if (add) {
                        this.$el.classList.add(name);
                    } else {
                        this.$el.classList.remove(name);
                    }
                }
            },
            removeClass: function (name) {
                this.className(ID_VERSION, name, false);
                return this;
            },
            addClass: function (name) {
                this.className(ID_VERSION, name, true);
                return this;
            },
            delay: function (time, call) {
                if (time < 0) {
                    return this;
                }
                var _t = this.$el;
                if (is_function(call)) {
                    var t = setTimeout(function () {
                        clearTimeout(t);
                        call.call(_t);
                        t = null;
                    }, time);
                }
                return this;
            },
            css: function (prop) {
                if (is_object(prop, true)) {
                    set_props(this.$el, prop, function (e, k, v) {
                        if (is_array(e, true)) {
                            e.forEach(function (item) {
                                item.style[k] = v;
                            });
                        } else if (is_document(e)) {
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
                else if (is_document(node)) {
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
                    this_el.forEach(function (item) {
                        if (item) {
                            parent.removeChild(item);
                        }
                    });
                } else {
                    this_el.parentNode.removeChild(this_el);
                }
                return this;
            },
            clone: function (copy_child) {
                if (undefined === copy_child) {
                    copy_child = true;
                }
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
            toggleClassName: function (name) {
                var t = this;
                var temp_list = [];
                if (is_array(t.$el, true)) {
                    t.$el.forEach(function (item) {
                        temp_list.push(item);
                    });
                } else if (is_document(t.$el)) {
                    temp_list.push(t.$el);
                } else {
                    temp_list = null;
                }
                if (temp_list && temp_list.length > 0) {
                    temp_list.forEach(function (item) {
                        if (has_class(item, name)) {
                            t.removeClass(name);
                        } else {
                            t.addClass(name);
                        }
                    })
                }
                return this;
            },
            text: function (val) {
                if (is_document(this.$el)) {
                    if (val) {
                        this.$el.innerText = val;
                    } else {
                        return this.$el.innerText;
                    }
                } else if (is_array(this.$el, true) && val) {
                    this.$el.forEach(function (item) {
                        item.innerText = val;
                    });
                }
                return this;
            },
            get: function (idx) {
                if (undefined === idx) { idx = 0; }
                if (this.$el && this.$el.length) {
                    this.$el = this.$el[idx];
                }
                return this;
            },
            on: function (event, func) {
                var el = this.$el;
                this.bind_event(ID_VERSION, el, function (e) {
                    e.addEventListener(event, function (e) {
                        func.call(el, e);
                    }, {
                        passive: false,
                        capture: true
                    });
                });
                this.events.push(func);
                return this;
            },
            bind_event: function (number, el, call) {
                if (number !== ID_VERSION) {
                    throw new Error("禁止访问");
                }
                else if (is_document(el) && is_function(call)) {
                    call(el);
                } else if (is_array(el, true)) {
                    for (var ev in el) {
                        var _el = el[ev];
                        if (is_document(_el) && is_function(call)) {
                            call(el[ev]);
                        }
                    }
                }
            },
            off: function (event, fun) {
                var _events = this.events;
                if (_events.length === 0) {
                    return;
                }
                this.bind_event(ID_VERSION, this.$el, function (el) {// 需要解决一下解绑后的句柄
                    _events.forEach(function (func, index) {
                        el.removeEventListener(event, fun, true);
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
                accelerate: false, //禁用硬件加速
                direction: "horizontal", // 播放方向
                ease: "ease", // 过渡动画
                disabvarouch: false, // 关闭触摸
                autoplay: true, // 自动播放
                lazy: undefined, // 懒加载 {prop:xx,enable:boolean}
                loop: true,// 无限循环
                pagination: undefined,// 指示点
                gap: 0, // 间隔
                slide: null, // 滑块
                num: 0,// 子滑块数量
                width: 0, // 父容器宽度
                height: 0,// 父容器高度
                duration: 300,// 过渡时间
                parent: root,// 父容器
                defaultIndex: 0 // 默认滑块显示下标

            }
        if (conf && typeof conf === "object" && Object.keys(conf).length > 0) {
            if (undefined === Object.assign) {
                var result = {};
                Object.keys(def_config).forEach(function (key) {
                    result[key] = def_config[key];
                });
                Object.keys(conf).forEach(function (key) {
                    result[key] = conf[key];
                });
                def_config = result;
            } else {
                Object.assign(def_config, conf);
            }

        }
        conf = null;
        def_config.is_mobile = (function () {
            return (/Android|iPhone|iPad|X11|Mac OS X/i.test(navigator.userAgent));
        })();

        (function () {
            var slider = $("<div class='swiper-slider'></div>");
            def_config.slide = slider;
            var swiper_items = root.children(".swiper-items");
            swiper_items.remove()
            var clone_swipers = swiper_items.clone(); // 最终复制的节点
            if (def_config.loop) {
                var last = swiper_items.get(0).clone();
                clone_swipers.push(last);
            }
            var root_size = get_style($(el));
            var size = clone_swipers.length;
            var style_config = {
                height: undefined,
                width: undefined
            }
            if (def_config.direction === "vertical") {// 判断方向
                style_config.width = root_size.width + "px";
                style_config.height = (root_size.height * size) + "px";
                $(el).attr({ class: "vertical" });
            }
            else {
                style_config.height = root_size.height + "px";
                style_config.width = (root_size.width * size) + "px";
                $(el).attr({ class: "horizontal" }).addClass("你干嘛");
            }
            slider.css(style_config).add(clone_swipers);
            $(el).children(".swiper-wrapper").add(slider); // 删除原来的
            $(el).children(".swiper-items").css({
                width: root_size.width + "px",
                height: root_size.height + "px"
            });
            def_config.width = root_size.width;
            def_config.height = root_size.height;
            def_config.num = size;
            /** 空间 */
        })();

        function init_swiper() {
            var index = def_config.defaultIndex;
            function prev() {
                index--;
                if (index < 0) {
                    index = def_config.num - 1;
                    animate(index * def_config.width, 0);
                    get_style(def_config.slide.get(0));
                    index = def_config.num - 2;
                    animate(index * def_config.width, def_config.duration);
                } else {
                    animate(index * def_config.width, def_config.duration);
                }
            }
            function next() {
                index++;
                if (index > def_config.num - 1) {
                    index = 0;
                    animate(index * def_config.width, 0);
                    get_style(def_config.slide.get(0));
                    index = 1;
                    animate(index * def_config.width, def_config.duration);
                } else {
                    animate(index * def_config.width, def_config.duration);
                }
            }
            /** 初始化布局 */
            function __init__layout() {
                animate(index * def_config.width, def_config.duration);
            }
            function animate(dis, duration, ease) {
                if (undefined === ease) {
                    ease = "ease"
                }
                def_config.slide.css({
                    transition: "transform " + duration + "ms " + ease,
                    transform: "translate3d(" + -(dis) + "px,0,0)"
                })
            }
            /** 初始化前后切换按钮 */
            function init_nav() {
                if (object_contains(def_config, "navigator")) {
                    if (object_contains(def_config.navigator, "next")) {
                        $(def_config.navigator.next).on("click", next);
                    }
                    if (object_contains(def_config.navigator, "prev")) {
                        $(def_config.navigator.prev).on("click", prev);
                    }
                }
            }

            /** 触摸 */
            var is_press = false;
            var point_x = 0;
            var point_xm = 0;
            function compute_index(dis) {
                var val = Math.abs(dis);
                var i = parseInt(val / def_config.width);
                return i;
            }
            function touch_start(e) {
                e.preventDefault();
                point_x = e.clientX + point_xm;
                is_press = true;
                $(document).on("pointermove", function (e) { touch_move(e) });
            }
            function touch_move(e) {
                e.preventDefault();
                if (is_press) {
                    var x = -(e.clientX - point_x);
                    point_xm = x;
                    animate(x, 0);
                }
                else {
                    return false;
                }
            }
            function touch_end(e) {
                e.preventDefault();
                var idx = compute_index(point_xm);
                animate(idx * def_config.width, def_config.duration);
                $(this).off("pointermove", touch_move); is_press = false;
            }

            function __init__touch() {
                if (true === def_config.disabvarouch) {
                    return;
                } else {
                    $(el).on("pointerdown", touch_start);
                    $(document).on("pointerup", touch_end);
                }
            }


            __init__layout();
            init_nav();
            __init__touch();
            return {

            }
        }
        new init_swiper(def_config);
        Object.freeze(def_config);
    }
    return;
});