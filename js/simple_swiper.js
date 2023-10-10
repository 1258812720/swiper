(function (e, fn) {
	"use strict";
	if (e.__proto__ === undefined) {
		e.SimSwiper = fn;
		return SimSwiper;
	} else {
		if (typeof module !== "undefined") {
			module.exports = fn;
		} else {
			e.__proto__.SimSwiper = fn;
		}
	}
})(this, function (el, conf) {
	"use strict";
	var root = el;
	var fun = function (el) {
		let _el = null;
		if (typeof el === 'string') {
			_el = document.querySelector(el);
		} else if (el.nodeType) {
			_el = el;
		}
		_el.getBoundingClientRect().top;
		return;
	};
	conf.isT = true;
	if (window.navigator) {
		var nav = window.navigator.userAgent;
		var index = nav.indexOf("Chrome");
		if (index !== -1) {
			var ch = nav.substr(index + 7, 9);
			if (typeof parseInt(ch)) {
				conf.isT = true;
			} else {
				conf.isT = false;
			}
		}
	}
	var toArray = function (o) {
		if (!o) {
			return []
		}
		var arrays = [];
		var i = 0;
		var len = o.length;
		for (; i < len; i++) {
			arrays.push(o[i]);
		}
		return arrays;
	}
	var getChild = function (el, name) {
		var res = {
			child: null,
			self: document.querySelector(el),
			wrap: null
		};
		if (!res.self) {
			return null;
		}
		var c = res.self.children;
		if (res.self) {
			for (var a = 0; a < c.length; a++) {
				var i = c[a];
				if (i.className === name.replace(".", "")) {
					var children = i.children;
					if (Array.from === undefined) {
						res.child = toArray(children)
					} else {
						res.child = Array.from(children);
					}
					res.wrap = i;
					break;
				}
			}
		}
		return res;
	}

	function renderNode(name, prop) {
		if (!name && !prop) {
			return document.createDocumentFragment();
		}
		var tag = document.createElement(name);
		if (prop) {
			for (var k in prop) {
				tag.setAttribute(k, prop[k]);
			}
		}
		return tag;
	}

	function is_blank(str) {
		return !str || str.trim() === '';
	}
	var is_mobile = function () {
		return (/Android|iPhone|iPad|X11/i.test(navigator.userAgent));
	}
	var is_ie = function () {
		return /Trident/i.test(navigator.userAgent);
	}
	var object_empty = function (obj) {
		if (!obj) {
			return false
		}
		if (is_ie) {
			return false;
		} else {
			return Reflect.ownKeys(obj).length === 0;
		}
	}
	var con = document.querySelector(el),
		g_conf = conf,
		slider = null,
		page = null,
		duration = conf.duration || 300,
		easing = conf.easing || "ease",
		isCube = conf.effect && conf.effect === 'cube',
		tm = getChild(el, ".swiper-wrapper"),
		_wc = tm.child;
	var th = null,
		setting = {
			index: 0,
			width: 0,
			height: 0,
			num: 1,
			duration: undefined,
			time: null,
			curIndex: 0,
			touchX: 0,
			position: 0,
			prevIndex: 0,
			offIndex: -1,
			loadEnd: false,
			prev: null,
			next: null,
			accelerate: true,
			events: ["start", "move", "end"],
			autoplay: function () {
				var time = typeof g_conf.autoplay === "number" ? g_conf.autoplay : 3500;
				th.time = setInterval(
					function () {
						th._next();
					},
					time > th.duration ? time : 1400
				);
			},
			init: function () {
				this.prev = this._prev;
				this.next = this._next;
				this.lastNode = slider.lastChild;
				th = this;
				th.duration = duration;
				th.num = _wc.length;
				th.width = getStyle(con, "width");
				th.height = getStyle(con, "height");
				if (th.is_horizontal()) {
					setStyle(slider, {
						width: isCube ? '100%' : this.width * (conf.loop ? _wc.length + 1 : _wc.length) +
							"px"
					});
				} else {
					setStyle(slider, {
						height: this.height * (conf.loop ? _wc.length + 1 : _wc.length) +
							"px"
					});
				}

				var _this = th;
				try {
					window.addEventListener("resize", function () {
						slider.style.transition = "all 0s";
					});
					if (conf.button) {
						if (conf.button.prev) {
							document.querySelector(
								"#" + con.id + ">" + conf.button["prev"]
							).addEventListener("click", function () {
								_this._prev();
							});
						}
						if (conf.button.next) {
							document.querySelector(
								"#" + con.id + ">" + conf.button["next"]
							).addEventListener(
								"click",
								function () {
									_this._next();
								},
								false
							);
						}
						if (!is_blank(conf.button.prevKey)) {
							document.addEventListener("keydown", function (t) {
								if (conf.button.prevKey === t.key) {
									t.preventDefault();
									th._prev()
								} else if (!is_blank(conf.button.nextKey) && t.key === conf.button
									.nextKey) {
									t.preventDefault()
									th._next()
								}
							})
						}
					}
				} catch (e) {
					throw new Error(e);
				}
				if (g_conf.autoplay) {
					th.boot();
					if (is_mobile()) {
						con.addEventListener("touchstart", th.stop, true);
						con.addEventListener("touchend", th.boot, true);
					} else {
						con.addEventListener("mouseenter", th.stop, false);
						con.addEventListener("mouseleave", th.boot, false);
					}
				}
				if (!conf.disabvarouch) {
					_this.touch_init();
				}
				if (g_conf.pagination && page && g_conf.pagination["el"] !== undefined) {
					page.childNodes[th.curIndex].classList.add("pagination-items-active");
					if (g_conf.pagination["click"] && g_conf.pagination["click"] !== false) {
						var poc = page.childNodes;
						var i = 0;
						for (; i < poc.length; i++) {
							poc[i].index = i;
							poc[i].onclick = function () {
								th.index = th.curIndex = this.index;
								th.goto();
							};
						}
					}
				}
				if (conf.init !== undefined && typeof conf.init === "function") {
					conf.init({
						el: slider.childNodes[th.curIndex],
						index: th.curIndex
					});
				}
				this.add(slider.firstElementChild);
				if (conf.loop) {
					this.add(slider.lastElementChild);
				}
				window.addEventListener("visibilitychange", function () {
					document.visibilityState === "visible" ? th.boot() : th.stop();
				});
				this.set_default_position();
				if (typeof conf.accelerate == 'boolean') {
					this.accelerate = conf.accelerate;
				}
				return this;
			},
			stop: function () {
				clearInterval(th.time);
			},
			boot: function () {
				if (th.time !== null) {
					clearInterval(th.time);
				}
				th.autoplay();
			},
			children: function (parent, name) {
				if (!parent) {
					return
				}
				var tagArr = [];
				function deep(_p) {
					var c = _p ? _p.children : parent.children;
					for (var it = 0; it < c.length; it++) {
						var ea = c[it];
						if (ea && ea.tagName.toLowerCase() === name) {
							tagArr.push(ea);
						} else if (ea) {
							deep(ea);
						}
					}
				}
				deep();
				return tagArr;
			},
			add: function (img_el) {
				if (th.loadEnd) {
					return;
				}
				if (!img_el) {
					return;
				} else {
					var t = null;
					clearTimeout(t);
					t = setTimeout(function () {
						var img = th.children(img_el, "img");
						if (img) {
							for (var i = 0; i < img.length; i++) {
								var _img = img[i];
								try {
									var at = _img.getAttribute('src');
									if (!at) {
										var prop = conf.lazy.prop || 'data-src';
										var url = _img.getAttribute(prop);
										_img.setAttribute('src', url);
										_img.removeAttribute(prop);
										_img.classList.remove('lazy');
									}
								} catch (e) {
									console.error(e);
									void (e)
								}
							}
							img_el.classList.remove('lazy')
							var path = root + ">.swiper-wrapper .lazy";
							var y = document.querySelectorAll(path).length;
							if (y <= 0) {
								th.loadEnd = true;
							}
						}
					}, Math.min((conf.duration || 0), 100))
				}
			},
			_prev: function () {
				var _ = this;
				_.index--;
				_.slide_to();
			},
			_next: function () {
				var _ = this;
				_.index++;
				_.slide_to();
			},
			play: function () {
				var _ = this;
				_.curIndex = _.index === _.num ? 0 : _.index;
				var c = slider.childNodes[th.curIndex];
				if (conf.pagination && page && conf.pagination.el) {
					var pc = page.childNodes;
					for (var i = 0; i < pc.length; i++) {
						if (i === th.curIndex) {
							pc[i].classList.add("pagination-items-active");
						} else {
							pc[i].classList.remove("pagination-items-active");
						}
					}
				}
				if (conf.lazy) {
					_.add(c);
				}
			},
			css: function (a, b, c) {
				if (!a || !b) {
					return
				}
				setStyle(a, b);
				if (c && typeof c === 'function') {
					c()
				}
			},
			slide_to: function () {
				var _t = this;
				var val;
				if (_t.index === _t.num + 1) {
					if (conf.loop) {
						val = 0;
						_t.transform(val, 0)
					}
					_t.index = 1;
					fun(el)
				} else if (_t.index < 0) {
					if (conf.loop) {
						val = _t.is_horizontal() ? _t.num * _t.width : _t.num * _t.height
						_t.transform(val, 0)
					}
					_t.index = _t.num - 1;
					fun(el);
				}
				_t.duration = duration;
				val = _t.is_horizontal() ? _t.index * _t.width : _t.index * _t.height
				_t.transform(val, _t.duration);
				th.setPosition();
				return _t;
			},
			is_horizontal: function () {
				return !conf.direction || conf.direction.toLowerCase() === 'horizontal'
			},
			set_default_position: function () {
				this.goto()
			},
			goto: function () {
				var __dis = this.index * (this.is_horizontal() ? this.width : this.height);
				this.transform(__dis, conf.duration || 300),
					this.position = __dis
			},
			transform: function (x, delay) {
				var t = this;
				var _prop = null;
				if (t.accelerate) {
					var ts = t.is_horizontal() ? "translate3d(" + (-x) + "px,0px,0px)" : "translate3d(0px," + (-x) + "px,0px)"
					_prop = {
						transform: ts,
						position: 'absolute',
						left: 0,
						top: 0,
						backfaceVisibility: 'hidden',
						transition: "all " + delay + "ms " + easing,
					}
				} else {
					_prop = {
						transform: "translate3d(0px,0px,0px)",
						position: 'absolute',
						backfaceVisibility: 'hidden',
						transition: "all " + delay + "ms " + easing,
					}
					_prop[t.is_horizontal() ? 'left' : 'top'] = -x + "px";
				}
				t.css(slider, _prop, function () {
					t.play();
				});
			},
			touch_init: function () {
				if (is_mobile()) {
					slider.addEventListener("touchstart", th.start, !1);
				} else {
					slider.addEventListener("mousedown", th.start, !1);
					slider.addEventListener("mouseleave", th.stop, !1);
				}
			},
			link_handler: function (b) {
				var ar = th.children(slider, "a");
				for (var key in ar) {
					if (typeof ar[key] === "object") {
						if (b) {
							ar[key].onclick = function (e) {
								e.preventDefault()
							}
						} else {
							ar[key].onclick = function () {
								return void (undefined)
							}
						}
					}
				}
			},
			start: function (e) {
				th.touchX = th.is_horizontal() ? e.clientX || e.touches[0].clientX : e.clientY || e.clientY || e.touches[0].clientY;
				if (!is_mobile()) {
					th.link_handler(false);
				}
				if (is_mobile()) {
					document.addEventListener("touchmove", th.move, {
						passive: false
					});
					document.addEventListener("touchend", th.end, {
						passive: false
					});
				} else if (!is_mobile() && e.button === 0) {
					e.preventDefault();
					document.addEventListener("mouseup", th.end, true);
					document.addEventListener("mousemove", th.move, {
						passive: false
					});
				}
				th.set_drab(true);
			},
			set_drab: function (b) {
				setStyle(slider, {
					cursor: b ? "grab" : "default"
				});
			},
			checked: function (n) {
				return !(Math.floor(n) === -1);
			},
			move: function (e) {
				try {
					e.preventDefault();
					var x = th.is_horizontal() ? (e.clientX || (e.touches ? e.touches[0].clientX : 0)) : (e.clientY || (e.touches ? e.touches[0].clientY : 0));
					var a = x - th.touchX - th.position;
					var __h = (th.is_horizontal() ? th.width : th.height)
					var t, per = (x - th.touchX) / __h;
					if (th.checked(per)) {
						t = -__h / 10;
					} else {
						t = __h + 100;
					}
					if (th.min(x)) {
						var u = Math.abs(parseInt((a - t) / __h));
						if (u > th.num) {
							th.index = th.num;
						} else {
							th.index = u;
						}
						if (!is_mobile()) {
							th.link_handler(true);
						}
					}
					var p = Math.abs(a) >= th.num * __h;
					if (p) {
						th.position = 0;
						th.index = 0;
						th.transform(0, 0, 0);
					} else if (a > 0) {
						th.position = th.num * __h;
						th.transform(th.position, 0, 0)
						th.index = th.num;
					} else {
						th.transform(-a, 0)
					}
				} catch (er) {
					th.transform(-a, 0)
					void er;
				}
			},
			setPosition: function () {
				this.position = this.index * (this.is_horizontal() ? this.width : this.height);
			},
			end: function () {
				th.transform(th.index * (th.is_horizontal() ? th.width : th.height), conf.duration || 300);
				th.setPosition();
				th.prevIndex = th.index;
				document.removeEventListener("touchmove", th.move);
				document.removeEventListener("touchend", th.end);
				document.removeEventListener("mousemove", th.move, is_ie);
				document.removeEventListener("mouseup", th.end);
				th.set_drab(false)
			},
			min: function (x) {
				var c = Math.abs(x - this.touchX);
				return c >= 5;
			}
		};
	var globa_this = null;
	(function () {
		var _vmNode = undefined;
		if (arguments.length !== 2) {
			el = ".simple-swiper-container";
		} else {
			g_conf = conf;
		}
		var _wrap = renderNode("div", {
			"class": "swiper-wrapper"
		}),
			_vmNode = renderNode(),
			_slider = renderNode("div", {
				"class": "swiper-slider"
			}),
			_ew = getStyle(con, 'width');
		if (!_wc) {
			return
		}
		try {
			for (var s in _wc) {
				var _i = _wc[s];
				if (setting.is_horizontal()) {
					setStyle(_i, {
						width: _ew + 'px',
						height: '100%',
						float: 'left'
					});
				} else {
					setStyle(_i, {
						width: _ew + 'px',
						height: getStyle(con, 'height') + 'px',
					});
				}
				_i.classList.add('lazy');
				_vmNode.appendChild(_i);
			}
		} catch (e) {
			void (e)
		}
		if (conf.loop) {
			var _c = _wc[0].cloneNode(true);
			_vmNode.appendChild(_c);
		}
		_slider.appendChild(_vmNode);
		_wrap.appendChild(_slider);
		con.replaceChild(_wrap, tm.wrap);
		slider = _slider;
		if (conf.pagination && conf.pagination.el) {
			var mx = tm.child.length,
				vo = renderNode();
			for (var p = 0; p < mx; p++) {
				var p_el = renderNode("span", {
					"class": "pagination-items"
				});
				vo.appendChild(p_el);
			}
			page = document.querySelector(conf.pagination.el);
			if (page) {
				page.appendChild(vo);
			}
		}
		globa_this = setting.init();
	})();

	function setStyle(el, props) {
		try {
			if (!el || !props) {
				return;
			}
			for (var key in props) {
				el.style[key] = props[key];
			}

		} catch (err) {
			void (err)
		}
	}
	function getStyle(el, prop) {
		return Math.ceil(parseFloat(window.getComputedStyle(el)[prop])) || el.getBoundingClientRect()[prop];
	};
	return globa_this;
});