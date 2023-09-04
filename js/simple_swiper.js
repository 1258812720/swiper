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

	function r(a, b) {
		var c = a.document,
			bn, bm,
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
					g, h = /^($)/,
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
						if (typeof a === "string") {
							g = h.exec(a);
							if (!g || !g[1] && e) return !e || e.jquery ? (e || f).find(a) : this
								.constructor(e)
								.find(a);
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
					}), i.test("聽"), g = d(c), c.addEventListener ? y =
						function () {
							c.removeEventListener("DOMContentLoaded", y, !1)
						} : c.attachEvent && (y = function () {
							c.readyState === "compvare" && (c.detachEvent("onreadystatechange", y), d.ready())
						});
				return d
			}();
		d.support = {};
		d.each(
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
						m = c && c[0]; //&& k.isXML(c[0])
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
						var r = b ? b.nodeName !== "HTML" : !1
						return r
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
		var c, bo;
		d.fn.extend({
			find: function (a) {
				var b = this.pushStack("", "find", a),
					c = 0;
				for (var e = 0, f = this.length; e < f; e++) {
					c = b.length, d.find(a, this[e], b);
					return b;
				}
				return b
			}
		}),
			d.extend({
				cssHooks: {},
			}), c.defaultView && c.defaultView.getComputedStyle && (bn = function (a, c, e) {
				var f, g, h;
				e = e.replace(bg, "-$1").toLowerCase();
				if (!(g = a.ownerDocument.defaultView)) return b;
				if (h === g.getComputedStyle(a, null)) f = h.getPropertyValue(e), f === "" && !d.contains(a
					.ownerDocument.documentElement, a) && (f = d.style(a, e));
				return f
			}), bm = bn || bo, d.expr && d.expr.filters && (d.expr.filters.hidden = function (a) {
				var b = a.offsetWidth,
					c = a.offsetHeight;
				return b === 0 && c === 0 || !d.support.reliableHiddenOffsets && (a.style.display)
			}, d.expr.filters.visible = function (a) {
				return !d.expr.filters.hidden(a)
			});
		return d;
	}
	var fun = r(window, undefined);
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
	var th = {
		index: 0,
		width: 0,
		height: 0,
		num: 1,
		duration: undefined,
		time: null,
		curIndex: 0,// 真的下标
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
			this.duration = duration;
			this.num = _wc.length;
			this.width = getStyle(con, "width");
			this.height = getStyle(con, "height");
			if (this.is_horizontal()) {
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
			if (isCube) {
				if (con.className === 'simple-swiper-container') {
					con.classList.add('simple-swiper-cube')
				}
			}

			try {
				window.addEventListener("resize", function () {
					slider.style.transition = "all 0s";
				});
				if (conf.button) {
					if (conf.button.prev) {
						document.querySelector(
							"#" + con.id + ">" + conf.button["prev"]
						).addEventListener("click", function () {
							th._prev();
						});
					}
					if (conf.button.next) {
						document.querySelector(
							"#" + con.id + ">" + conf.button["next"]
						).addEventListener(
							"click",
							function () {
								th._next();
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
				this.touch_init();
			}
			if (g_conf.pagination && page && g_conf.pagination["el"] !== undefined) {
				page.childNodes[th.curIndex].classList.add("pagination-items-active");
				if (g_conf.pagination["click"] && g_conf.pagination["click"] !== false) {
					var poc = page.childNodes;
					var i = 0;
					for (; i < poc.length; i++) {
						poc[i].index = i;
						poc[i].onclick = function () {
							th.index = th.curIndex = th.index;
							th.goto();
						};
					}
				}
			}
			if (conf.init !== undefined && typeof conf.init === "function") {
				conf.init({
					el: slider.childNodes[this.curIndex],
					index: this.curIndex
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
			if (typeof conf.accelerate === 'boolean') {
				this.accelerate = conf.accelerate;
			}
			if (isCube) {
				this.index++;
				this.curIndex++;
				this.set_cube_style(0);
			}
			return this;
		},
		stop: function () {
			clearInterval(this.time);
		},
		boot: function () {
			if (th.time !== null) {
				th.stop();
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
		hook: function (type) {
			/* event hooks */
			var on = conf.on;
			if (!object_empty(on)) {
				var events = _.events;
				var r = events.length;
				var s = 0;
				for (; s < r; s++) {
					var _r = events[s];
					if (typeof _r !== 'string') {
						break;
					}
					for (var p in on) {
						if (on[p].name.toLowerCase() === _r) {
							on[p]('只因');
						}
					}
				}
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
				fun(el).find(":visible")
			} else if (_t.index < 0) {
				if (conf.loop) {
					val = _t.is_horizontal() ? _t.num * _t.width : _t.num * _t.height
					_t.transform(val, 0)
				}
				_t.index = _t.num - 1;
				fun(el).find(":visible");
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
		set_cube_style: function (a) {
			var i = 0;
			// 真的下标
			if (a > th.num) {
				a = 0;
			}
			
			
			for (; i < _wc.length; i++) {
				var _this_node = _wc[i];
				if (i === a) {
					_this_node.classList.add('swiper-item-active');
					setStyle(_this_node, {
						transform: "translate3d(0px,0px,0px) scale(1)",
						zIndex: 2
					});
				} else {
					_this_node.classList.remove('swiper-item-active');
					var _dis = 0;
					if (i < a) { // 左边
						_dis = -th.index * 120;
						// 到达最后一个，第一个节点到后面去
						
					} else {
						_dis = th.index * 120
					}
					setStyle(_this_node, {
						zIndex: 1,
						transform: "translate3d(" + _dis + "px,0px,0px) scale(.5)",
						transition: "all .3s linear"
					});
				}
			}
			if (a === th.num - 1) {
				console.log('到最后一个了');
				setStyle(_wc[0], {
					zIndex: 1,
					transform: "translate3d(" + th.index*120 + "px,0px,0px) scale(.5)",
					transition: "all .3s linear"
				});
			}
		},
		cube: function (a, b, c) {
			this.set_cube_style(a);
		},
		transform: function (x, delay) {
			if (isCube) {
				this.cube(this.curIndex, x, delay);
				this.play();
			} else {
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
			}

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
				if (th.is_horizontal()) {
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
			_wc.push(_c);
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
		globa_this = th.init();
	})();
	/**
	 * 
	 * @param {*} el 设置样式的节点
	 * @param {*} props style样式 k:v
	 * @returns 
	 */
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