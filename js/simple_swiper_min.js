!function(t,e){"use strict";void 0===t.__proto__?(t.SimSwiper=e,SimSwiper):"undefined"!=typeof module?module.exports=e:t.__proto__.SimSwiper=e}(this,function(d,h){"use strict";var n,o,r,i,t,a,p,f,m,v,s,u,l,g,x,c,y,b,_=d;if(document.querySelector(d))return n=function(t){var e=null;"string"==typeof t?e=document.querySelector(t):t.nodeType&&(e=t),I(e,"top")},h=h||{loop:!0,duration:300,autoplay:!0,easing:"ease"},o=function(t,e){var n=!1;return t.length&&t.forEach(function(t){t===e&&(n=!0)}),n},r=["visibilitychange","scroll","touchstart","transitionend","click","touchmove","touchend","mouseup","mousedown","mouseleave","mousemove","mouseout","resize","keydown"],i=function(t,e,n,i){t&&"object"==typeof t&&e&&"string"==typeof e&&o(r,e)&&t.addEventListener(e,n,{passive:i||!1,capture:i})},t=function(t,e,n){t&&"object"==typeof t&&e&&"string"==typeof e&&o(r,e)&&t.removeEventListener(e,n,/Trident/i.test(navigator.userAgent)||a())},a=function(){return/Android|iPhone|iPad|X11|Mac OS X/i.test(navigator.userAgent)},p=document.querySelector(d),v=m=null,s=(f=h)&&h.duration?h.duration:300,u=h&&h.easing?h.easing:"ease",l=!!h&&h.effect&&"cube"===h.effect,g=function(t,e){var n={child:null,self:"string"==typeof t?document.querySelector(t):t,wrap:null};if(!n.self)return null;var i=n.self.children;if(n.self)for(var o=0;o<i.length;o++){var r=i[o];if(r.className===e.replace(".","")){var a=r.children;void 0===Array.from?n.child=function(t){if(!t)return[];for(var e=[],n=0,i=t.length;n<i;n++)e.push(t[n]);return e}(a):n.child=Array.from(a),n.wrap=r;break}}return n}(d,".swiper-wrapper"),x=g.child,y={index:0,width:0,height:0,num:1,duration:void 0,time:c=null,curIndex:0,touchX:0,position:0,prevIndex:0,offIndex:-1,loadEnd:!1,prev:null,next:null,accelerate:!0,timer:null,is_move:!1,autoplay:function(){var t="number"==typeof f.autoplay?f.autoplay:3500;c.time=setInterval(function(){c._next()},t>c.duration?t:1400)},init:function(){var t=this;this.prev=this._prev,this.next=this._next,this.lastNode=m.lastChild,(c=this).duration=s,c.num=x.length,c.width=I(p,"width"),c.height=I(p,"height"),c.is_horizontal()?k(m,{width:l?"100%":this.width*(h&&h.loop?x.length+1:x.length)+"px"}):k(m,{height:this.height*(h&&h.loop?x.length+1:x.length)+"px"});try{i(window,"resize",function(){m.style.transition="all 0s"}),h&&h.button&&(h.button.prev&&i(document.querySelector(_+">"+h.button.prev),"click",function(){t._prev()}),h&&h.button.next&&i(document.querySelector(_+">"+h.button.next),"click",function(){t._next()},!1),z(h.button.prevKey)||i(document,"keydown",function(t){h.button.prevKey===t.key?(t.preventDefault(),c._prev()):z(h.button.nextKey)||t.key!==h.button.nextKey||(t.preventDefault(),c._next())}))}catch(t){throw new Error(t)}if(f.autoplay&&c.boot(),h.disabvarouch||this.touch_init(),f.pagination&&v&&void 0!==f.pagination.el&&(v.childNodes[c.curIndex].classList.add("pagination-items-active"),f.pagination.click)&&!1!==f.pagination.click)for(var e=v.childNodes,n=0;n<e.length;n++)e[n].index=n,e[n].onclick=function(){c.index=c.curIndex=this.index,c.goto()};return void 0!==h.init&&"function"==typeof h.init&&h.init({el:m.childNodes[c.curIndex],index:c.curIndex}),this.add(m.firstElementChild),h&&h.loop&&this.add(m.lastElementChild),i(window,"visibilitychange",function(){"visible"===document.visibilityState?c.boot():c.stop()}),this.set_default_position(),"boolean"==typeof h.accelerate&&(this.accelerate=h.accelerate),this},stop:function(){clearInterval(c.time)},boot:function(){f&&"boolean"==typeof f.autoplay&&!1===f.autoplay||(null!==c.time&&clearInterval(c.time),c.autoplay())},children:function(r,a){var s;if(r)return s=[],function t(e){for(var n=(e||r).children,i=0;i<n.length;i++){var o=n[i];o&&o.tagName.toLowerCase()===a?s.push(o):o&&t(o)}}(),s},add:function(r){!c.loadEnd&&f.lazy&&r&&(clearTimeout(null),setTimeout(function(){var t=c.children(r,"img");if(t){for(var e=0;e<t.length;e++){var n,i,o=t[e];try{o.getAttribute("src")||(n=h.lazy.prop||"data-src",i=o.getAttribute(n),o.setAttribute("src",i),o.removeAttribute(n),o.classList.remove("lazy"))}catch(t){console.error(t)}}r.classList.remove("lazy"),document.querySelectorAll(_+">.swiper-wrapper .lazy").length<=0&&(c.loadEnd=!0)}},Math.min(h.duration||0,100)))},_prev:function(){this.index--,this.slide_to()},_next:function(){this.index++,this.slide_to()},play:function(){var t=this;if(v){t.curIndex=t.index===t.num?0:t.index;var e=m.childNodes,n=e[c.curIndex],i=v.childNodes,o={curNodes:[],siblings:[],curIndex:t.curIndex};if(h.pagination&&v&&h.pagination.el)for(var r=0;r<i.length;r++)r===c.curIndex?(o.curNodes.push(e[t.curIndex]),0===t.curIndex&&o.curNodes.push(m.lastChild),i[r].classList.add("pagination-items-active")):(i[r].classList.remove("pagination-items-active"),o.siblings.push(e[r]));h.lazy&&t.add(n),h&&h.on&&"function"==typeof h.on.change&&(t.timer=setTimeout(function(){h.on.change(o),clearTimeout(t.timer)},t.duration))}},css:function(t,e,n){t&&e&&(k(t,e),n)&&"function"==typeof n&&n()},slide_to:function(){var t,e=this;return e.index===e.num+1?(h.loop&&e.transform(t=0,0),e.index=1,n(_)):e.index<0&&(h.loop&&(t=e.is_horizontal()?e.num*e.width:e.num*e.height,e.transform(t,0)),e.index=e.num-1,n(_)),e.duration=s,t=e.is_horizontal()?e.index*e.width:e.index*e.height,e.transform(t,e.duration),c.setPosition(),e},is_horizontal:function(){return!h.direction||"horizontal"===h.direction.toLowerCase()},set_default_position:function(){this.goto()},goto:function(){var t=this.index*(this.is_horizontal()?this.width:this.height);this.transform(t,h.duration||300),this.position=t},transform:function(t,e){var n=this,i=null;n.accelerate?i={transform:n.is_horizontal()?"translate3d("+-t+"px,0px,0px)":"translate3d(0px,"+-t+"px,0px)",position:"absolute",left:0,top:0,backfaceVisibility:"hidden",transition:"all "+e+"ms "+u}:(i={transform:"translate3d(0px,0px,0px)",position:"absolute",backfaceVisibility:"hidden",transition:"all "+e+"ms "+u})[n.is_horizontal()?"left":"top"]=-t+"px",n.css(m,i),n.play()},touch_init:function(){a()?(i(m,"touchstart",c.start,!1),i(document,"touchend",c.end,!1)):(i(m,"mousedown",c.start,!1),i(m,"mouseleave",c.stop,!1),i(document,"mouseup",c.end,!1))},link_handler:function(t){var e,n=c.children(m,"a");for(e in n)"object"==typeof n[e]&&(n[e].onclick=t?function(t){t.preventDefault()}:function(){})},set_drab:function(t){k(m,{cursor:t?"grab":"default"})},checked:function(t){return!(-1===Math.floor(t))},start:function(t){var e;t&&(c.stop(),/Firefox/i.test(navigator.userAgent)&&t.preventDefault(),e=t.touches?t.touches.length-1:0,c.touchX=c.is_horizontal()?t.clientX||t.targetTouches[e].clientX:t.clientY||t.clientY||t.targetTouches[e].clientY,a()?i(this,"touchmove",c.move,!1):(t.preventDefault(),i(document,"mousemove",c.move,!1),c.link_handler(!1)),c.set_drab(!0))},move:function(t){try{t.preventDefault();var e,n=c.is_horizontal()?t.clientX||(t.touches?t.targetTouches[0].clientX:0):t.clientY||(t.touches?t.targetTouches[0].clientY:0),i=n-c.touchX-c.position,o=c.is_horizontal()?c.width:c.height,r=(n-c.touchX)/o,a=c.checked(r)?-o/10:o+100;c.min(n)&&((e=Math.abs(parseInt((i-a)/o)))>c.num?c.index=c.num:c.index=e,c.link_handler(!0)),Math.abs(i)>=c.num*o?(c.position=0,c.index=0,c.transform(0,0,0)):0<i?(c.position=c.num*o,c.transform(c.position,0,0),c.index=c.num):c.transform(-i,0)}catch(t){c.transform(-i,0)}},end:function(){c.transform(c.index*(c.is_horizontal()?c.width:c.height),h.duration||300),c.prevIndex=c.index,c.setPosition(),t(m,"touchmove",c.move),t(document,"mousemove",c.move),t(m,"mousemove",c.move),c.set_drab(!1),c.boot()},min:function(t){return 5<=Math.abs(t-this.touchX)},setPosition:function(){this.position=this.index*(this.is_horizontal()?this.width:this.height)}},b=null,function(){var t,e=void 0,n=(2!==arguments.length?d=".simple-swiper-container":f=h,w("div",{class:"swiper-wrapper"})),e=w(),i=w("div",{class:"swiper-slider"}),o=I(p,"width");if(x){try{for(var r in x){var a=x[r];y.is_horizontal()?k(a,{width:o+"px",height:"100%",float:"left"}):k(a,{width:o+"px",height:I(p,"height")+"px"}),a.classList.add("lazy"),e.appendChild(a)}}catch(t){}if(h.loop&&(t=x[0].cloneNode(!0),e.appendChild(t)),i.appendChild(e),n.appendChild(i),p.replaceChild(n,g.wrap),m=i,(v=document.querySelector(h&&h.pagination?h.pagination.el:null))&&h.pagination&&h.pagination.el){for(var s=g.child.length,u=w(),l=0;l<s;l++){var c=w("span",{class:"pagination-items"});u.appendChild(c)}v.appendChild(u)}b=y.init()}}(),b;function w(t,e){if(!t&&!e)return document.createDocumentFragment();var n=document.createElement(t);if(e)for(var i in e)n.setAttribute(i,e[i]);return n}function z(t){return!t||""===t.trim()}function k(t,e){try{if(t&&e)for(var n in e)t.style[n]=e[n]}catch(t){}}function I(t,e){return Math.ceil(parseFloat(window.getComputedStyle(t)[e]))||t.getBoundingClientRect()[e]}console.error("找不到父容器",d)});  
