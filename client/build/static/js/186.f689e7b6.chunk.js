"use strict";(self.webpackChunkwordle_collaborative=self.webpackChunkwordle_collaborative||[]).push([[186],{1186:function(e,t,n){n.r(t),n.d(t,{startInputShims:function(){return y}});var r=n(5861),o=n(7757),i=n.n(o),a=n(3743),u=n(1811),c=new WeakMap,s=function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;c.has(e)!==n&&(n?d(e,t,r):f(e,t))},l=function(e){return e===e.getRootNode().activeElement},d=function(e,t,n){var r=t.parentNode,o=t.cloneNode(!1);o.classList.add("cloned-input"),o.tabIndex=-1,r.appendChild(o),c.set(e,o);var i="rtl"===e.ownerDocument.dir?9999:-9999;e.style.pointerEvents="none",t.style.transform="translate3d(".concat(i,"px,").concat(n,"px,0) scale(0)")},f=function(e,t){var n=c.get(e);n&&(c.delete(e),n.remove()),e.style.pointerEvents="",t.style.transform=""},v=function(e,t,n){if(!n||!t)return function(){};var r=function(n){l(t)&&s(e,t,n)},o=function(){return s(e,t,!1)},i=function(){return r(!0)},a=function(){return r(!1)};return(0,u.a)(n,"ionScrollStart",i),(0,u.a)(n,"ionScrollEnd",a),t.addEventListener("blur",o),function(){(0,u.b)(n,"ionScrollStart",i),(0,u.b)(n,"ionScrollEnd",a),t.addEventListener("ionBlur",o)}},p="input, textarea, [no-blur], [contenteditable]",m=function(e,t,n){var r=e.closest("ion-item,[ion-item]")||e;return h(r.getBoundingClientRect(),t.getBoundingClientRect(),n,e.ownerDocument.defaultView.innerHeight)},h=function(e,t,n,r){var o=e.top,i=e.bottom,a=t.top,u=a+15,c=.75*Math.min(t.bottom,r-n)-i,s=u-o,l=Math.round(c<0?-c:s>0?-s:0),d=Math.min(l,o-a),f=Math.abs(d)/.3;return{scrollAmount:d,scrollDuration:Math.min(400,Math.max(150,f)),scrollPadding:n,inputSafeY:4-(o-u)}},w=function(e,t,n,r,o){var i,a=function(e){i=(0,u.p)(e)},c=function(a){if(i){var c=(0,u.p)(a);g(6,i,c)||l(t)||(a.stopPropagation(),b(e,t,n,r,o))}};return e.addEventListener("touchstart",a,!0),e.addEventListener("touchend",c,!0),function(){e.removeEventListener("touchstart",a,!0),e.removeEventListener("touchend",c,!0)}},b=function(){var e=(0,r.Z)(i().mark((function e(t,n,o,c,l){var d,f,v,p,h,w;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o||c){e.next=2;break}return e.abrupt("return");case 2:if(d=m(t,o||c,l),!(o&&Math.abs(d.scrollAmount)<4)){e.next=6;break}return n.focus(),e.abrupt("return");case 6:if(s(t,n,!0,d.inputSafeY),n.focus(),(0,u.r)((function(){return t.click()})),"undefined"===typeof window){e.next=22;break}if(v=function(){var e=(0,r.Z)(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0!==f&&clearTimeout(f),window.removeEventListener("ionKeyboardDidShow",p),window.removeEventListener("ionKeyboardDidShow",v),!o){e.next=6;break}return e.next=6,(0,a.b)(o,0,d.scrollAmount,d.scrollDuration);case 6:s(t,n,!1,d.inputSafeY),n.focus();case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),p=function e(){window.removeEventListener("ionKeyboardDidShow",e),window.addEventListener("ionKeyboardDidShow",v)},!o){e.next=21;break}return e.next=15,(0,a.g)(o);case 15:if(h=e.sent,w=h.scrollHeight-h.clientHeight,!(d.scrollAmount>w-h.scrollTop)){e.next=21;break}return"password"===n.type?(d.scrollAmount+=50,window.addEventListener("ionKeyboardDidShow",p)):window.addEventListener("ionKeyboardDidShow",v),f=setTimeout(v,1e3),e.abrupt("return");case 21:v();case 22:case"end":return e.stop()}}),e)})));return function(t,n,r,o,i){return e.apply(this,arguments)}}(),g=function(e,t,n){if(t&&n){var r=t.x-n.x,o=t.y-n.y;return r*r+o*o>e*e}return!1},E=function(e,t){var n,r;if("INPUT"===e.tagName&&(!e.parentElement||"ION-INPUT"!==e.parentElement.tagName)&&"ION-SEARCHBAR"!==(null===(r=null===(n=e.parentElement)||void 0===n?void 0:n.parentElement)||void 0===r?void 0:r.tagName)){var o=(0,a.a)(e);if(null!==o){var i=o.$ionPaddingTimer;i&&clearTimeout(i),t>0?o.style.setProperty("--keyboard-offset","".concat(t,"px")):o.$ionPaddingTimer=setTimeout((function(){o.style.setProperty("--keyboard-offset","0px")}),120)}}},y=function(e){var t=document,n=e.getNumber("keyboardHeight",290),o=e.getBoolean("scrollAssist",!0),c=e.getBoolean("hideCaretOnScroll",!0),s=e.getBoolean("inputBlurring",!0),l=e.getBoolean("scrollPadding",!0),d=Array.from(t.querySelectorAll("ion-input, ion-textarea")),f=new WeakMap,m=new WeakMap,h=function(){var e=(0,r.Z)(i().mark((function e(t){var r,s,l,d,p,h;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){return(0,u.c)(t,e)}));case 2:if(r=t.shadowRoot||t,s=r.querySelector("input")||r.querySelector("textarea"),l=(0,a.a)(t),d=l?null:t.closest("ion-footer"),s){e.next=8;break}return e.abrupt("return");case 8:l&&c&&!f.has(t)&&(p=v(t,s,l),f.set(t,p)),(l||d)&&o&&!m.has(t)&&(h=w(t,s,l,d,n),m.set(t,h));case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();s&&function(){var e=!0,t=!1,n=document,r=function(){t=!0},o=function(){e=!0},i=function(r){if(t)t=!1;else{var o=n.activeElement;if(o&&!o.matches(p)){var i=r.target;i!==o&&(i.matches(p)||i.closest(p)||(e=!1,setTimeout((function(){e||o.blur()}),50)))}}};(0,u.a)(n,"ionScrollStart",r),n.addEventListener("focusin",o,!0),n.addEventListener("touchend",i,!1)}(),l&&function(e){var t=document,n=function(t){E(t.target,e)},r=function(e){E(e.target,0)};t.addEventListener("focusin",n),t.addEventListener("focusout",r)}(n);for(var b=0,g=d;b<g.length;b++){var y=g[b];h(y)}t.addEventListener("ionInputDidLoad",(function(e){h(e.detail)})),t.addEventListener("ionInputDidUnload",(function(e){!function(e){if(c){var t=f.get(e);t&&t(),f.delete(e)}if(o){var n=m.get(e);n&&n(),m.delete(e)}}(e.detail)}))}}}]);
//# sourceMappingURL=186.f689e7b6.chunk.js.map