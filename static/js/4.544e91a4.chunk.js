(this.webpackJsonpplanatrip=this.webpackJsonpplanatrip||[]).push([[4],{43:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(44);function c(e,t){if(e){if("string"===typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},44:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},45:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(43);function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,c=!1,i=void 0;try{for(var a,o=e[Symbol.iterator]();!(r=(a=o.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(s){c=!0,i=s}finally{try{r||null==o.return||o.return()}finally{if(c)throw i}}return n}}(e,t)||Object(r.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},49:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return f}));var r=n(44);var c=n(43);function i(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(c.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var u=n(45),l=n(7),b=n(1),j=n.n(b),d=n(4),p=n(24);function f(){var e=Object(d.f)(),t=Object(b.useState)(!0),n=Object(u.a)(t,2),r=n[0],c=n[1],o=Object(b.useState)(null),f=Object(u.a)(o,2),h=f[0],O=f[1],v=Object(b.useState)(null),m=Object(u.a)(v,2),g=m[0],y=m[1],x=Object(d.g)().id,S=Object(b.useContext)(p.a),w=Object(b.useState)(!1),D=Object(u.a)(w,2),N=D[0],A=D[1],I=Object(b.useState)({name:"",driver:0,brings:[],drivingWith:""}),P=Object(u.a)(I,2),C=P[0],E=P[1];function k(e){var t;E(s(s({},C),{},a({},e.target.name,(t=e.target.value,"driver"===e.target.name?Number.isNaN(parseInt(t))?0:parseInt(t):"brings"===e.target.name?t.replace(" ","").split(","):t))))}var L,q=Object(b.useCallback)((function(){null===S||void 0===S||S.storage.collection("trips").doc(x).get().then((function(e){if(!e.exists)throw new Error("No such trip");return e})).then((function(e){return e.data()})).then((function(e){y(e)})).catch((function(e){return O(e.message)})).finally((function(){return c(!1)}))}),[null===S||void 0===S?void 0:S.storage,x]);return j.a.useEffect((function(){return q()}),[q]),Object(l.jsx)("div",{className:"App",children:Object(l.jsx)("header",{className:"App-header",children:r?Object(l.jsx)("p",{children:"Loading.."}):g&&!h?Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("span",{className:"chungus",children:g.title}),Object(l.jsx)("i",{children:(L=g,L.startDate&&L.endDate?"".concat(L.startDate.toDate().toLocaleDateString("he-IL"),"-").concat(L.endDate.toDate().toLocaleDateString("he-IL")):"")}),Object(l.jsxs)("span",{children:[function(e){return e.participants.reduce((function(e,t){return e+t.driver-1}),0)}(g)," seats left"]}),Object(l.jsx)("p",{children:g.description}),Object(l.jsxs)("span",{children:[Object(l.jsx)("strong",{children:"We need"}),": ",function(e){var t=e.participants.reduce((function(e,t){return e.concat(t.brings)}),[]);return e.requirements.filter((function(e){var n=t.findIndex((function(t){return t===e}));return t=[].concat(i(t.slice(0,n)),i(t.slice(n+1))),-1===n})).toString()||"Nothing more"}(g)]}),Object(l.jsxs)("span",{children:[Object(l.jsx)("strong",{children:"We have"}),": ",function(e){return e.participants.reduce((function(e,t){return e.concat(t.brings)}),[]).toString()}(g)]}),Object(l.jsxs)("span",{children:[Object(l.jsx)("strong",{children:"Going"}),": ",g.participants.map((function(e){return" ".concat(e.name," ").concat(e.driver>0?"\ud83d\ude98":"")})).toString()]}),Object(l.jsxs)("form",{onSubmit:function(t){t.preventDefault(),null===S||void 0===S||S.storage.collection("trips").doc(x).update({participants:null===g||void 0===g?void 0:g.participants.concat(C)}).finally((function(){return e.push("/thanks")}))},children:[Object(l.jsxs)("div",{className:"row",children:[Object(l.jsx)("label",{children:Object(l.jsx)("small",{children:"Name"})}),Object(l.jsx)("input",{required:!0,onChange:k,value:C.name,name:"name",type:"text",placeholder:"EYAL!"})]}),Object(l.jsxs)("div",{className:"row",children:[Object(l.jsx)("label",{children:Object(l.jsx)("small",{children:"Brings"})}),Object(l.jsx)("input",{required:!0,onChange:k,value:C.brings,name:"brings",type:"text",placeholder:"".concat(null===g||void 0===g?void 0:g.requirements.slice(0,3),"...")})]}),Object(l.jsxs)("div",{children:[Object(l.jsx)("span",{children:"Driver? "}),Object(l.jsx)("input",{name:"driver",onChange:function(){return(e=N)&&E((function(e){return s(s({},e),{},{driver:0})})),void A(!e);var e},type:"checkbox"})]}),Object(l.jsx)("div",{className:"row",style:{visibility:N?"visible":"collapse"},children:Object(l.jsx)("input",{onChange:k,name:"driver",type:"text",value:0!==C.driver?C.driver:"",placeholder:"Passengers (number)"})}),Object(l.jsx)("div",{children:Object(l.jsxs)("button",{type:"submit",children:["You son of a bitch, I'm in! ",Object(l.jsx)("span",{className:"chungus",children:"\ud83d\udc48"})]})})]})]}):Object(l.jsx)("p",{children:h||"No such trip"})})})}}}]);
//# sourceMappingURL=4.544e91a4.chunk.js.map