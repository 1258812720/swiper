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
	var root =el;
	function r(a, b) {
		var c = a.document, bn, bm,
			d = function () {
				function G() {
					if (!d.isReady) {
						try {
							c.documentElement.doScroll("left")
						} catch (a) {
							setTimeout(G, 1);
							return
						}
						d.ready()
					}
				}
				var d = function (a, b) {
					return new d.fn.init(a, b, g)
				},
					g, h = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,
					i = /\S/,
					m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
					r = /(webkit)[ \/]([\w.]+)/,
					s = /(opera)(?:.*version)?[ \/]([\w.]+)/,
					t = /(msie) ([\w.]+)/,
					u = /(mozilla)(?:.*? rv:([\w.]+))?/,
					v = navigator.userAgent,
					w, x, y, z = Object.prototype.toString,
					B = Array.prototype.push,
					E = Array.prototype.indexOf,
					F = {};
				d.fn = d.prototype = {
					constructor: d,
					init: function (a, e, f) {
						var g, i, j, k;
						if (!a) return this;
						if (a.nodeType) {
							this.context = this[0] = a, this.length = 1;
							return this
						}
						if (a === "body" && !e && c.body) {
							this.context = c, this[0] = c.body, this.selector = "body", this.length = 1;
							return this
						}
						if (typeof a === "string") {
							g = h.exec(a);
							if (!g || !g[1] && e) return !e || e.jquery ? (e || f).find(a) : this
								.constructor(e)
								.find(a);
							if (g[1]) {
								e = e instanceof d ? e[0] : e, k = e ? e.ownerDocument || e : c, j = m.exec(
									a),
									j ? d.isPlainObject(e) ? (a = [c.createElement(j[1])], d.fn.attr.call(a,
										e, !0)) : a = [k.createElement(j[1])] : (j = d.buildFragment([g[1]],
											[k]),
											a = (j.cacheable ? d.clone(j.fragment) : j.fragment).childNodes);
								return d.merge(this, a)
							}
							i = c.getElementById(g[2]);
							if (i && i.parentNode) {
								if (i.id !== g[2]) return f.find(a);
								this.length = 1, this[0] = i
							}
							this.context = c, this.selector = a;
							return this
						}
						if (d.isFunction(a)) return f.ready(a);
						a.selector !== b && (this.selector = a.selector, this.context = a.context);
						return d.makeArray(a, this)
					},

					pushStack: function (a, b, c) {
						var e = this.constructor();
						d.isArray(a) ? B.apply(e, a) : d.merge(e, a), e.prevObject = this, e.context = this
							.context, b === "find" ? e.selector = this.selector + (this.selector ? " " :
								"") +
								c : b && (e.selector = this.selector + "." + b + "(" + c + ")");
						return e
					},
					each: function (a, b) {
						return d.each(this, a, b)
					},
					ready: function (a) {
						d.bindReady(), x.done(a);
						return this
					},
					eq: function (a) {
						return a === -1 ? this.slice(a) : this.slice(a, +a + 1)
					},
					push: B,
					sort: [].sort,
					splice: [].splice
				}, d.fn.init.prototype = d.fn, d.extend = d.fn.extend = function () {
					var a, c, e, f, g, h, i = arguments[0] || {},
						j = 1,
						k = arguments.length,
						l = !1;
					typeof i === "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i !== "object" && !
						d
							.isFunction(i) && (i = {}), k === j && (i = this, --j);
					for (; j < k; j++)
						if ((a = arguments[j]) != null)
							for (c in a) {
								e = i[c], f = a[c];
								if (i === f) continue;
								l && f && (d.isPlainObject(f) || (g = d.isArray(f))) ? (g ? (g = !1, h = e && d
									.isArray(e) ? e : []) : h = e && d.isPlainObject(e) ? e : {}, i[c] =
									d
										.extend(l, h, f)) : f !== b && (i[c] = f)
							}
					return i
				}, d.extend({
					isReady: !1,
					readyWait: 1,
					bindReady: function () {
						if (!x) {
							x = d._Deferred();
							if (c.readyState === "complete") return setTimeout(d.ready, 1);
							if (c.addEventListener) c.addEventListener("DOMContentLoaded", y, !1), a
								.addEventListener("load", d.ready, !1);
							else if (c.attachEvent) {
								c.attachEvent("onreadystatechange", y), a.attachEvent("onload", d
									.ready);
								var b = !1;
								try {
									b = a.frameElement == null
								} catch (e) { }
								c.documentElement.doScroll && b && G()
							}
						}
					},
					isFunction: function (a) {
						return d.type(a) === "function"
					},
					isArray: Array.isArray || function (a) {
						return d.type(a) === "array"
					},
					type: function (a) {
						return a == null ? String(a) : F[z.call(a)] || "object"
					},
					each: function (a, c, e) {
						var f, g = 0,
							h = a.length,
							i = h === b || d.isFunction(a);
						if (e) {
							if (i) {
								for (f in a)
									if (c.apply(a[f], e) === !1) break
							} else
								for (; g < h;)
									if (c.apply(a[g++], e) === !1) break
						} else if (i) {
							for (f in a)
								if (c.call(a[f], f, a[f]) === !1) break
						} else
							for (var j = a[0]; g < h && c.call(j, g, j) !== !1; j = a[++g]) { }
						return a
					},
					merge: function (a, c) {
						var d = a.length,
							e = 0;
						if (typeof c.length === "number")
							for (var f = c.length; e < f; e++) a[d++] = c[e];
						else
							while (c[e] !== b) a[d++] = c[e++];
						a.length = d;
						return a
					},
					map: function (a, b, c) {
						var d = [],
							e;
						for (var f = 0, g = a.length; f < g; f++) e = b(a[f], f, c), e != null && (d[d
							.length] = e);
						return d.concat.apply([], d)
					},
					guid: 1,
					uaMatch: function (a) {
						a = a.toLowerCase();
						var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u
							.exec(a) || [];
						return {
							browser: b[1] || "",
							version: b[2] || "0"
						}
					},
					browser: {}
				}), d.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a,
					b) {
					F["[object " + b + "]"] = b.toLowerCase()
				}), w = d.uaMatch(v), w.browser && (d.browser[w.browser] = !0, d.browser.version = w.version), d
					.browser.webkit && (d.browser.safari = !0), E && (d.inArray = function (a, b) {
						return E.call(b, a)
					}), i.test(" ") && (j = /^[\s\xA0]+/, k = /[\s\xA0]+$/), g = d(c), c.addEventListener ? y =
						function () {
							c.removeEventListener("DOMContentLoaded", y, !1)
						} : c.attachEvent && (y = function () {
							c.readyState === "complete" && (c.detachEvent("onreadystatechange", y), d.ready())
						});
				return d
			}(),
			e = "0".split(" ")
		d.extend({
			_Deferred: function () {
				var a = [],
					b, e, f = {
						done: function () {
							if (!e) {
								var c = arguments,
									g, h, i, j, k;
								b && (k = b, b = 0);
								for (g = 0, h = c.length; g < h; g++) i = c[g], j = d.type(i), j ===
									"array" ? f.done.apply(f, i) : j === "function" && a.push(i);
								k && f.resolveWith(k[0], k[1])
							}
							return this
						},
					};
				return f
			}
		}),
			function () {
				d.support = {};
			}();
		var F = {
			focus: "focusin",
			blur: "focusout"
		};
		d.each(["live", "die"], function (a, c) {
			d.fn[c] = function (a, e, f, g) {
				var h, i = 0,
					j, k, l, m = g || this.selector,
					n = g ? this : d(this.context);
				if (typeof a === "object" && !a.preventDefault) {
					for (var o in a) n[c](o, e, a[o], m);
					return this
				}
				d.isFunction(e) && (f = e, e = b), a = (a || "").split(" ");
				while ((h = a[i++]) != null) {
					j = r.exec(h), k = "", j && (k = j[0], h = h.replace(r, ""));
					if (h === "hover") {
						a.push("mouseenter" + k, "mouseleave" + k);
						continue
					}
					l = h, h === "focus" || h === "blur" ? (a.push(F[h] + k), h = h + k) : h = (F[h] ||
						h) +
						k;
					if (c === "live")
						for (var p = 0, q = n.length; p < q; p++) d.event.add(n[p], "live." + H(h, m), {
							data: e,
							selector: m,
							handler: f,
							origType: h,
							origHandler: f,
							preType: l
						});
					else n.unbind("live." + H(h, m), f)
				}
				return this
			}
		}), d.each(
			""
				.split(" "),
			function (a, b) {
				d.fn[b] = function (a, c) {
					c == null && (c = a, a = null);
					return arguments.length > 0 ? this.bind(b, a, c) : this.trigger(b)
				}, d.attrFn && (d.attrFn[b] = !0)
			}),
			function () {
				var a =
					/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
					e = 0,
					f = Object.prototype.toString,
					g = !1,
					h = !0,
					i = /\\/g,
					j = /\W/;
				[0, 0].sort(function () {
					h = !1;
					return 0
				});
				var k = function (b, d, e, g) {
					e = e || [], d = d || c;
					var h = d;
					if (d.nodeType !== 1 && d.nodeType !== 9) return [];
					if (!b || typeof b !== "string") return e;
					var i, j, n, o, q, r, s, t, u = !0,
						w = k.isXML(d),
						x = [],
						y = b;
					do {
						a.exec(""), i = a.exec(y);
						if (i) {
							y = i[3], x.push(i[1]);
							if (i[2]) {
								o = i[3];
								break
							}
						}
					} while (i);
					if (x.length > 1 && m.exec(b))
						if (x.length === 2 && l.relative[x[0]]) j = v(x[0] + x[1], d);
						else {
							j = l.relative[x[0]] ? [d] : k(x.shift(), d);
							while (x.length) b = x.shift(), l.relative[b] && (b += x.shift()), j = v(b, j)
						}
					else {
						!g && x.length > 1 && d.nodeType === 9 && !w && l.match.ID.test(x[0]) && !l.match.ID
							.test(x[
								x.length - 1]) && (q = k.find(x.shift(), d, w), d = q.expr ? k.filter(q.expr, q
									.set)[0] : q.set[0]);
						if (d) {
							q = g ? {
								expr: x.pop(),
								set: p(g)
							} : k.find(x.pop(), x.length === 1 && (x[0] === "~" || x[0] === "+") && d
								.parentNode ? d.parentNode : d, w), j = q.expr ? k.filter(q.expr, q.set) : q
									.set, x.length > 0 ? n = p(j) : u = !1;
							while (x.length) r = x.pop(), s = r, l.relative[r] ? s = x.pop() : r = "", s ==
								null &&
								(s = d), l.relative[r](n, s, w)
						} else n = x = []
					}
					n || (n = j), n || k.error(r || b);
					if (f.call(n) === "[object Array]")
						if (u)
							if (d && d.nodeType === 1)
								for (t = 0; n[t] != null; t++) n[t] && (n[t] === !0 || n[t].nodeType === 1 && k
									.contains(d, n[t])) && e.push(j[t]);
							else
								for (t = 0; n[t] != null; t++) n[t] && n[t].nodeType === 1 && e.push(j[t]);
						else e.push.apply(e, n);
					else p(n, e);
					o && (k(o, h, e, g), k.uniqueSort(e));
					return e
				};
				k.uniqueSort = function (a) {
					if (r) {
						g = h, a.sort(r);
						if (g)
							for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1)
					}
					return a
				}, k.find = function (a, b, c) {
					var d;
					if (!a) return [];
					for (var e = 0, f = l.order.length; e < f; e++) {
						var g, h = l.order[e];
						if (g = l.leftMatch[h].exec(a)) {
							var j = g[1];
							g.splice(1, 1);
							if (j.substr(j.length - 1) !== "\\") {
								g[1] = (g[1] || "").replace(i, ""), d = l.find[h](g, b, c);
								if (d != null) {
									a = a.replace(l.match[h], "");
									break
								}
							}
						}
					}
					d || (d = typeof b.getElementsByTagName !== "undefined" ? b.getElementsByTagName("*") : []);
					return {
						set: d,
						expr: a
					}
				}, k.filter = function (a, c, d, e) {
					var f, g, h = a,
						i = [],
						j = c,
						m = c && c[0] && k.isXML(c[0]);
					while (a && c.length) {
						for (var n in l.filter)
							if ((f = l.leftMatch[n].exec(a)) != null && f[2]) {
								var o, p, q = l.filter[n],
									r = f[1];
								g = !1, f.splice(1, 1);
								if (r.substr(r.length - 1) === "\\") continue;
								j === i && (i = []);
								if (l.preFilter[n]) {
									f = l.preFilter[n](f, j, d, i, e, m);
									if (f) {
										if (f === !0) continue
									} else g = o = !0
								}
								if (f)
									for (var s = 0;
										(p = j[s]) != null; s++)
										if (p) {
											o = q(p, f, s, j);
											var t = e ^ !!o;
											d && o != null ? t ? g = !0 : j[s] = !1 : t && (i.push(p), g = !0)
										}
								if (o !== b) {
									d || (j = i), a = a.replace(l.match[n], "");
									if (!g) return [];
									break
								}
							}
						if (a === h)
							if (g == null) k.error(a);
							else break;
						h = a
					}
					return j
				}, k.error = function (a) {
					throw "Syntax error, unrecognized expression: " + a
				};
				var l = k.selectors = {
					order: ["ID", "NAME", "TAG"],
					match: {
						ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
						CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
						NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
						ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
						TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
						CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
						POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
						PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
					},
					leftMatch: {},

					find: {

					},
					preFilter: {

					},
					filters: {},
					setFilters: {
						eq: function (a, b, c) {
							return c[3] - 0 === b
						}
					},
					filter: {
						PSEUDO: function (a, b, c, d) {
							var e = b[1],
								f = l.filters[e];
							if (f) return f(a, c, b, d);
							if (e === "contains") return (a.textContent || a.innerText || k.getText([a]) ||
								"")
								.indexOf(b[3]) >= 0;
							if (e === "not") {
								var g = b[3];
								for (var h = 0, i = g.length; h < i; h++)
									if (g[h] === a) return !1;
								return !0
							}
							k.error(e)
						},
						CHILD: function (a, b) {
							var c = b[1],
								d = a;
							switch (c) {
								case "only":
								case "first":
									while (d = d.previousSibling)
										if (d.nodeType === 1) return !1;
									if (c === "first") return !0;
									d = a;
								case "last":
									while (d = d.nextSibling)
										if (d.nodeType === 1) return !1;
									return !0;
								case "nth":
									var e = b[2],
										f = b[3];
									if (e === 1 && f === 0) return !0;
									var g = b[0],
										h = a.parentNode;
									if (h && (h.sizcache !== g || !a.nodeIndex)) {
										var i = 0;
										for (d = h.firstChild; d; d = d.nextSibling) d.nodeType === 1 && (d
											.nodeIndex = ++i);
										h.sizcache = g
									}
									var j = a.nodeIndex - f;
									return e === 0 ? j === 0 : j % e === 0 && j / e >= 0
							}
						},
						ID: function (a, b) {
							return a.nodeType === 1 && a.getAttribute("id") === b
						},
						TAG: function (a, b) {
							return b === "*" && a.nodeType === 1 || a.nodeName.toLowerCase() === b
						},
						CLASS: function (a, b) {
							return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
						},
						ATTR: function (a, b) {
							var c = b[1],
								d = l.attrHandle[c] ? l.attrHandle[c](a) : a[c] != null ? a[c] : a
									.getAttribute(
										c),
								e = d + "",
								f = b[2],
								g = b[4];
							return d == null ? f === "!=" : f === "=" ? e === g : f === "*=" ? e.indexOf(
								g) >=
								0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !==
									g :
									f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g
										.length) ===
										g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 :
									e &&
									d !== !1
						},
						POS: function (a, b, c, d) {
							var e = b[2],
								f = l.setFilters[e];
							if (f) return f(a, c, b, d)
						}
					}
				},
					m = l.match.POS,
					n = function (a, b) {
						return "\\" + (b - 0 + 1)
					};
				for (var o in l.match) l.match[o] = new RegExp(l.match[o].source + /(?![^\[]*\])(?![^\(]*\))/
					.source), l
						.leftMatch[o] = new RegExp(/(^(?:.|\r|\n)*?)/.source + l.match[o].source.replace(/\\(\d+)/g,
							n));
				var p = function (a, b) {
					a = Array.prototype.slice.call(a, 0);
					if (b) {
						b.push.apply(b, a);
						return b
					}
					return a
				};
				try {
					Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
				} catch (q) {
					p = function (a, b) {
						var c = 0,
							d = b || [];
						if (f.call(a) === "[object Array]") Array.prototype.push.apply(d, a);
						else if (typeof a.length === "number")
							for (var e = a.length; c < e; c++) d.push(a[c]);
						else
							for (; a[c]; c++) d.push(a[c]);
						return d
					}
				}
				var r, s;
				c.documentElement.compareDocumentPosition ? r = function (a, b) {
					if (a === b) {
						g = !0;
						return 0
					}
					if (!a.compareDocumentPosition || !b.compareDocumentPosition) return a
						.compareDocumentPosition ?
						-1 : 1;
					return a.compareDocumentPosition(b) & 4 ? -1 : 1
				} : (r = function (a, b) {
					var c, d, e = [],
						f = [],
						h = a.parentNode,
						i = b.parentNode,
						j = h;
					if (a === b) {
						g = !0;
						return 0
					}
					if (h === i) return s(a, b);
					if (!h) return -1;
					if (!i) return 1;
					while (j) e.unshift(j), j = j.parentNode;
					j = i;
					while (j) f.unshift(j), j = j.parentNode;
					c = e.length, d = f.length;
					for (var k = 0; k < c && k < d; k++)
						if (e[k] !== f[k]) return s(e[k], f[k]);
					return k === c ? s(a, f[k], -1) : s(e[k], b, 1)
				}, s = function (a, b, c) {
					if (a === b) return c;
					var d = a.nextSibling;
					while (d) {
						if (d === b) return -1;
						d = d.nextSibling
					}
					return 1
				}), k.getText = function (a) {
					var b = "",
						c;
					for (var d = 0; a[d]; d++) c = a[d], c.nodeType === 3 || c.nodeType === 4 ? b += c
						.nodeValue : c
							.nodeType !== 8 && (b += k.getText(c.childNodes));
					return b
				},
					function () {
						var a = c.createElement("div"),
							d = "script" + (new Date).getTime(),
							e = c.documentElement;
						a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(
							d) && (
								l.find.ID = function (a, c, d) {
									if (typeof c.getElementById !== "undefined" && !d) {
										var e = c.getElementById(a[1]);
										return e ? e.id === a[1] || typeof e.getAttributeNode !== "undefined" && e
											.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
									}
								}, l.filter.ID = function (a, b) {
									var c = typeof a.getAttributeNode !== "undefined" && a.getAttributeNode("id");
									return a.nodeType === 1 && c && c.nodeValue === b
								}), e.removeChild(a), e = a = null
					}(),
					function () {
						var a = c.createElement("div");
						a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (l.find.TAG =
							function (a, b) {
								var c = b.getElementsByTagName(a[1]);
								if (a[1] === "*") {
									var d = [];
									for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
									c = d
								}
								return c
							}), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild
								.getAttribute !== "undefined" && a.firstChild.getAttribute("href") !== "#" && (l
									.attrHandle
									.href = function (a) {
										return a.getAttribute("href", 2)
									}), a = null
					}(), c.querySelectorAll && function () {
						var a = k,
							b = c.createElement("div"),
							d = "__sizzle__";
						b.innerHTML = "<p class='TEST'></p>";
						if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
							k = function (b, e, f, g) {
								e = e || c;
								if (!g && !k.isXML(e)) {
									var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
									if (h && (e.nodeType === 1 || e.nodeType === 9)) {
										if (h[1]) return p(e.getElementsByTagName(b), f);
										if (h[2] && l.find.CLASS && e.getElementsByClassName) return p(e
											.getElementsByClassName(h[2]), f)
									}
									if (e.nodeType === 9) {
										if (b === "body" && e.body) return p([e.body], f);
										if (h && h[3]) {
											var i = e.getElementById(h[3]);
											if (!i || !i.parentNode) return p([], f);
											if (i.id === h[3]) return p([i], f)
										}
										try {
											return p(e.querySelectorAll(b), f)
										} catch (j) { }
									} else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
										var m = e,
											n = e.getAttribute("id"),
											o = n || d,
											q = e.parentNode,
											r = /^\s*[+~]/.test(b);
										n ? o = o.replace(/'/g, "\\$&") : e.setAttribute("id", o), r && q && (
											e = e
												.parentNode);
										try {
											if (!r || q) return p(e.querySelectorAll("[id='" + o + "'] " + b),
												f)
										} catch (s) { } finally {
											n || m.removeAttribute("id")
										}
									}
								}
								return a(b, e, f, g)
							};
							for (var e in a) k[e] = a[e];
							b = null
						}
					}(),
					function () {
						var a = c.documentElement,
							b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a
								.msMatchesSelector;
						if (b) {
							var d = !b.call(c.createElement("div"), "div"),
								e = !1;
							try {
								b.call(c.documentElement, "[test!='']:sizzle")
							} catch (f) {
								e = !0
							}
							k.matchesSelector = function (a, c) {
								c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
								if (!k.isXML(a)) try {
									if (e || !l.match.PSEUDO.test(c) && !/!=/.test(c)) {
										var f = b.call(a, c);
										if (f || !d || a.document && a.document.nodeType !== 11) return f
									}
								} catch (g) { }
								return k(c, null, null, [a]).length > 0
							}
						}
					}(),
					function () {
						var a = c.createElement("div");
						a.innerHTML = "<div class='test e'></div><div class='test'></div>";
						if (a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
							a.lastChild.className = "e";
							if (a.getElementsByClassName("e").length === 1) return;
							l.order.splice(1, 0, "CLASS"), l.find.CLASS = function (a, b, c) {
								if (typeof b.getElementsByClassName !== "undefined" && !c) return b
									.getElementsByClassName(a[1])
							}, a = null
						}
					}(), c.documentElement.contains ? k.contains = function (a, b) {
						return a !== b && (a.contains ? a.contains(b) : !0)
					} : c.documentElement.compareDocumentPosition ? k.contains = function (a, b) {
						return !!(a.compareDocumentPosition(b) & 16)
					} : k.contains = function () {
						return !1
					}, k.isXML = function (a) {
						var b = (a ? a.ownerDocument || a : 0).documentElement;
						return b ? b.nodeName !== "HTML" : !1
					};
				var v = function (a, b) {
					var c, d = [],
						e = "",
						f = b.nodeType ? [b] : b;
					while (c = l.match.PSEUDO.exec(a)) e += c[0], a = a.replace(l.match.PSEUDO, "");
					a = l.relative[a] ? a + "*" : a;
					for (var g = 0, h = f.length; g < h; g++) k(a, f[g], d);
					return k.filter(e, d)
				};
				d.find = k, d.expr = k.selectors, d.expr[":"] = d.expr.filters, d.unique = k.uniqueSort
			}();
		d.fn.extend({
			find: function (a) {
				var b = this.pushStack("", "find", a),
					c = 0;
				for (var e = 0, f = this.length; e < f; e++) {
					c = b.length, d.find(a, this[e], b);
					if (e > 0)
						for (var g = c; g < b.length; g++)
							for (var h = 0; h < c; h++)
								if (b[h] === b[g]) {
									b.splice(g--, 1);
									break
								}
				}
				return b
			},
			has: function (a) {
				var b = d(a);
				return this.filter(function () {
					for (var a = 0, c = b.length; a < c; a++)
						if (d.contains(this, b[a])) return !0
				})
			},
			not: function (a) {
				return this.pushStack(Q(this, a, !1), "not", a)
			},
			filter: function (a) {
				return this.pushStack(Q(this, a, !0), "filter", a)
			},
			is: function (a) {
				return !!a && d.filter(a, this).length > 0
			}
		}),
			d.extend({
				cssHooks: {

				},
			}), d.support.opacity || (d.cssHooks.opacity = {

			}), d(function () {
				d.support.reliableMarginRight || (d.cssHooks.marginRight = {
					get: function (a, b) {
						var c;
						d.swap(a, {
							display: "inline-block"
						}, function () {
							b ? c = bm(a, "margin-right", "marginRight") : c = a.style
								.marginRight
						});
						return c
					}
				})
			}), c.defaultView && c.defaultView.getComputedStyle && (bn = function (a, c, e) {
				var f, g, h;
				e = e.replace(bg, "-$1").toLowerCase();
				if (!(g = a.ownerDocument.defaultView)) return b;
				if (h = g.getComputedStyle(a, null)) f = h.getPropertyValue(e), f === "" && !d.contains(a
					.ownerDocument.documentElement, a) && (f = d.style(a, e));
				return f
			}), c.documentElement.currentStyle && (bo = function (a, b) {
				var c, d = a.currentStyle && a.currentStyle[b],
					e = a.runtimeStyle && a.runtimeStyle[b],
					f = a.style;
				!bh.test(d) && bi.test(d) && (c = f.left, e && (a.runtimeStyle.left = a.currentStyle.left), f
					.left =
					b === "fontSize" ? "1em" : d || 0, d = f.pixelLeft + "px", f.left = c, e && (a
						.runtimeStyle
						.left = e));
				return d === "" ? "auto" : d
			}), bm = bn || bo, d.expr && d.expr.filters && (d.expr.filters.hidden = function (a) {
				var b = a.offsetWidth,
					c = a.offsetHeight;
				return b === 0 && c === 0 || !d.support.reliableHiddenOffsets && (a.style.display)
			}, d.expr.filters.visible = function (a) {
				return !d.expr.filters.hidden(a)
			});
		return d;

	}
	"use strict";
	var fun = r(window, undefined);

	conf.isT = true;
	if (window.navigator) {
		var nav = window.navigator.userAgent;
		var index = nav.indexOf("Chrome");
		if (index != -1) {
			var ch = nav.substr(index + 7, 9);
			if (typeof parseInt(ch)) {
				conf.isT = true;
			} else {
				conf.isT = false;
			}
		}
	}

	var getChild = function (el, name) {
		var c = el.children;
		var res = {
			child: null,
			self: null
		};
		if (name) {
			for (var a = 0; a < c.length; a++) {
				var i = c[a];
				if (i.className === 'swiper-wrapper') {
					res.child = document.querySelectorAll('#' + name + '>.' + i.firstElementChild.className);
					res.self = document.querySelector('#' + name);
				}
			}
		} else {
			res.self = c
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

	var con = document.querySelector(el),
		g_conf = conf,
		slider = null,
		page = null,
		duration = conf.duration || 300,
		easing = conf.easing || "ease",
		isCube = conf.effect && conf.effect === 'cube',
		tm = getChild(con, con.id + " >.swiper-wrapper"),
		_wc = tm.child;
	var th = null,
		setting = {
			prev: null,
			next: null,
			index: 0,
			width: 0,
			num: 1,
			duration: undefined,
			time: null,
			curIndex: 0,
			touchX: 0,
			position: 0,
			prevIndex: 0,
			loadEnd: false,
			autoplay: function () {
				var time = typeof g_conf.autoplay === "number" ? g_conf.autoplay : 3500;
				th.time = setInterval(
					function () {
						th._next();
					},
					time > th.duration ? time : 1200
				);
			},
			init: function () {
				this.lastNode = slider.lastChild;
				th = this;
				th.duration = duration;
				th.num = _wc.length;
				th.width = getStyle(con, "width");
				setStyle(slider, "width", isCube ? '100%' : this.width * (conf.loop ? _wc.length + 1 : _wc.length) + "px");
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
					}
				} catch (e) {
					throw new Error(e);
				}
				if (g_conf.autoplay) {
					th.boot();
					con.addEventListener("mousedown", th.stop, false);
					con.addEventListener("mouseup", th.boot, false);
					con.addEventListener("mouseleave", th.boot, false);
					con.addEventListener("touchstart", th.stop, false);
					con.addEventListener("touchend", th.boot, false);
					window.addEventListener(
						"visibilitychange",
						function () {
							var is = document.visibilityState;
							is === "visible" ? th.boot() : th.stop();
						},
						false
					);
				}
				if (!conf.disableTouch) {
					_this.touchInit();
				}
				if (g_conf.pagination && g_conf.pagination["el"] !== undefined) {
					page.childNodes[th.curIndex].classList.add("pagination-items-active");
					if (g_conf.pagination["click"]) {
						var poc = page.childNodes;
						for (var i = 0; i < poc.length; i++) {
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
				slider.addEventListener("transitionrun", function () {
					if (conf.lazy) {
						var c = slider.childNodes;
						th.add(c[th.curIndex])
					}
				})
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
				if (!parent) { return }
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
							} catch (e) { void (e) }
						}
						img_el.classList.remove('lazy')
						var path = root +">.swiper-wrapper .lazy";
						var y = document.querySelectorAll(path).length;						
						if (y <= 0) {
							th.loadEnd = true;
						}
					}
				}, conf.duration || 0)
			},
			_prev: function () {
				var _ = this;
				_.index--;
				_.onChange();
			},
			_next: function () {
				var _ = this;
				_.index++;
				_.onChange();
			},
			play: function () {
				th.curIndex = th.index === this.num ? 0 : th.index;
				if (conf.pagination && conf.pagination.el) {
					var pc = page.childNodes;
					for (var i = 0; i < pc.length; i++) {
						if (i === th.curIndex) {
							pc[i].classList.add("pagination-items-active");
						} else {
							pc[i].classList.remove("pagination-items-active");
						}
					}
				}
				if (conf.change !== undefined && typeof conf.change === "function") {
					conf.change({
						index: th.curIndex,
						el: slider.childNodes[th.curIndex],
					});
				}
			},
			css: function (a, b, c) {
				if (!a || !b) { return }
				for (var p in b) {
					a.style[p] = b[p];
				}
				if (c && typeof c === 'function') {
					c()
				}
			},
			onChange: function () {
				var _t = this;
				if (_t.index === _t.num + 1) {
					if (conf.loop) {
						_t.transform(0, 0, 0)
					}
					_t.index = 1;
					fun(el).find(":visible")
				}
				else if (_t.index < 0) {
					if (conf.loop) {
						_t.transform(_t.num * _t.width, 0, 0)
					}
					_t.index = _t.num - 1;
					fun(el).find(":visible")
				}
				_t.duration = duration;
				_t.transform(_t.index * _t.width, 0, _t.duration);
				th.setPosition();
				return _t;
			},
			goto: function () {
				this.transform(this.index * this.width, 0, conf.duration || 300)
			},
			transform: function (x, y, delay) {
				var t = this;
				t.css(slider, {
					transform: "translate3d(-" + x + "px,-" + y + "px,0px)",
					transition: "all " + delay + "ms " + easing,
				}, function () {
					t.play();
				})
			},
			touchInit: function () {
				slider.addEventListener("mousedown", th.start, false);
				slider.addEventListener("touchstart", th.start, false);
				slider.addEventListener("mouseleave", th.stop, false);
			},
			start: function (e) {
				th.touchX = e.clientX || e.touches[0].clientX;
				if (e.button === 0) {
					document.addEventListener("mouseup", th.end, false);
					document.addEventListener("mousemove", th.move, false);
				}
				document.addEventListener("touchmove", th.move, false);
				document.addEventListener("touchend", th.end, false);
				e.preventDefault()
			},
			checked: function (n) {
				return !(Math.floor(n) === -1);
			},
			move: function (e) {
				try {
					e.preventDefault();
					var x = (e.clientX || e.touches[0].clientX); // 移动距离
					var a = x - th.touchX - th.position; // 移动距离
					var t, per = (x - th.touchX) / th.width; // 宽度
					if (th.checked(per)) {
						t = -th.width / 10;
					} else {
						t = th.width + 100;// 右划
					}
					if (th.min(x)) {
						e.preventDefault();
						th.index = Math.abs(parseInt((a - t) / th.width));;
						slider.classList.add("through");
						th.event();
					}
					if (Math.abs(a) > th.num * th.width) {
						th.position = 0;
						th.index = 0;
						th.transform(0, 0, 0);// 返回到第一章
					}  if (a > 0) {
						th.position = th.num * th.width;
						th.index = th.num;
						th.transform(-th.position, 0, 0)
					} else {
						th.transform(-a, 0, 0)
					}
				} catch (e) {
					void e;
				}
			},
			setPosition: function () {
				this.position = this.index * this.width;
			},
			event: function () {
				var nodes = slider.children;
				var _thisNode = nodes[th.prevIndex];
				var a = th.children(_thisNode, "a");
				if (a && a.length > 0) {
					for (var _a in a) {
						a[_a].onclick = function () { return false; };
					}
					for (var k = 0; k < nodes.length; k++) {
						if (k !== th.prevIndex) {
							var oa = nodes[k];
							var b = th.children(oa, "a");
							for (var _b in b) {
								b[_b].onclick = function () { };
							}
						}
					};
				}
			},
			end: function () {
				th.transform(th.index * th.width, 0, conf.duration || 300);
				th.setPosition();
				th.prevIndex = th.index;
				slider.classList.remove("through");
				document.removeEventListener("touchmove", th.move);
				document.removeEventListener("touchend", th.end);
				document.removeEventListener("mousemove", th.move, false);
				document.removeEventListener("mouseup", th.end, false);
			},
			min: function (x) {
				var c = Math.abs(x - this.touchX);
				return c > 120;
			}
		};
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
		if (!_wc) { return }
		try {
			for (var s in _wc) {
				var _i = _wc[s];
				setStyle(_i, 'width', _ew + 'px');
				setStyle(_i, 'height', '100%');
				setStyle(_i, 'display', 'inline-block');
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
		con.replaceChild(_wrap, tm.self);
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
			page.appendChild(vo);
		}
		setting.init();
	})();

	function setStyle(el, prop, value) {
		try {
			el.style[prop] = value;
		} catch (err) {
			void (err)
		}
	}
	function getStyle(el, prop) {
		return Math.ceil(parseFloat(window.getComputedStyle(el)[prop])) || el.getBoundingClientRect()[prop];
	};
});
