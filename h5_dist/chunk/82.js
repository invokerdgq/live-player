(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{"356":function(e,t,n){"use strict";n.d(t,"a",function(){return delayQuerySelector}),n.d(t,"e",function(){return uuid}),n.d(t,"c",function(){return initTestEnv}),n.d(t,"d",function(){return isTest}),n.d(t,"b",function(){return handleTouchScroll});var o=n(4),r=n(363),a=o.a.getEnv();function delay(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:500;return new Promise(function(t){[o.a.ENV_TYPE.WEB,o.a.ENV_TYPE.SWAN].includes(a)?setTimeout(function(){t()},e):t()})}function delayQuerySelector(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:500,i=a===o.a.ENV_TYPE.WEB?e:e.$scope,s=Object(r.a)().in(i);return new Promise(function(e){delay(n).then(function(){s.select(t).boundingClientRect().exec(function(t){e(t)})})})}function uuid(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:8,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:16,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),o=[],r=0;if(t=t||n.length,e)for(r=0;r<e;r++)o[r]=n[0|Math.random()*t];else{var a=void 0;for(o[8]=o[13]=o[18]=o[23]="-",o[14]="4",r=0;r<36;r++)o[r]||(a=0|16*Math.random(),o[r]=n[19===r?3&a|8:a])}return o.join("")}function initTestEnv(){0}function isTest(){return!1}var i=0;function handleTouchScroll(e){a===o.a.ENV_TYPE.WEB&&(e?(i=document.documentElement.scrollTop,document.body.classList.add("at-frozen"),document.body.style.top=-i+"px"):(document.body.style.top=null,document.body.classList.remove("at-frozen"),document.documentElement.scrollTop=i))}},"362":function(e,t,n){"use strict";var o=n(3),r=n(4),a=n(747),i=n(456),s=n(553),c=n(350),l=n.n(c),u=n(49),p=n.n(u),f=n(349),d=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();var h=function(e){function AtLoading(){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AtLoading),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(AtLoading.__proto__||Object.getPrototypeOf(AtLoading)).apply(this,arguments))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AtLoading,f["a"]),d(AtLoading,[{"key":"render","value":function render(){var e=this.props,t=e.color,n=e.size,i={"width":n?""+r.a.pxTransform(parseInt(n)):"","height":n?""+r.a.pxTransform(parseInt(n)):""},s={"border":t?"1px solid "+t:"","border-color":t?t+" transparent transparent transparent":""},c=Object.assign({},s,i);return o.l.createElement(a.a,{"className":"at-loading","style":i},o.l.createElement(a.a,{"className":"at-loading__ring","style":c}),o.l.createElement(a.a,{"className":"at-loading__ring","style":c}),o.l.createElement(a.a,{"className":"at-loading__ring","style":c}))}}]),AtLoading}();h.defaultProps={"size":0,"color":""},h.propTypes={"size":l.a.oneOfType([l.a.string,l.a.number]),"color":l.a.oneOfType([l.a.string,l.a.number])},n.d(t,"a",function(){return g});var m=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{"value":n,"enumerable":!0,"configurable":!0,"writable":!0}):e[t]=n,e}var b={"normal":"normal","small":"small"},y={"primary":"primary","secondary":"secondary"},g=function(e){function AtButton(){!function button_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AtButton);var e=function button_possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(AtButton.__proto__||Object.getPrototypeOf(AtButton)).apply(this,arguments));return e.state={"isWEB":r.a.getEnv()===r.a.ENV_TYPE.WEB,"isWEAPP":r.a.getEnv()===r.a.ENV_TYPE.WEAPP,"isALIPAY":r.a.getEnv()===r.a.ENV_TYPE.ALIPAY},e}return function button_inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AtButton,f["a"]),m(AtButton,[{"key":"onClick","value":function onClick(){var e;this.props.disabled||this.props.onClick&&(e=this.props).onClick.apply(e,arguments)}},{"key":"onGetUserInfo","value":function onGetUserInfo(){var e;this.props.onGetUserInfo&&(e=this.props).onGetUserInfo.apply(e,arguments)}},{"key":"onContact","value":function onContact(){var e;this.props.onContact&&(e=this.props).onContact.apply(e,arguments)}},{"key":"onGetPhoneNumber","value":function onGetPhoneNumber(){var e;this.props.onGetPhoneNumber&&(e=this.props).onGetPhoneNumber.apply(e,arguments)}},{"key":"onError","value":function onError(){var e;this.props.onError&&(e=this.props).onError.apply(e,arguments)}},{"key":"onOpenSetting","value":function onOpenSetting(){var e;this.props.onOpenSetting&&(e=this.props).onOpenSetting.apply(e,arguments)}},{"key":"onSumit","value":function onSumit(){this.state.isWEAPP&&this.$scope.triggerEvent("submit",arguments[0].detail,{"bubbles":!0,"composed":!0})}},{"key":"onReset","value":function onReset(){this.state.isWEAPP&&this.$scope.triggerEvent("reset",arguments[0].detail,{"bubbles":!0,"composed":!0})}},{"key":"render","value":function render(){var e,t=this.props,n=t.size,r=void 0===n?"normal":n,c=t.type,l=void 0===c?"":c,u=t.circle,f=t.full,d=t.loading,m=t.disabled,g=t.customStyle,v=t.formType,_=t.openType,E=t.lang,P=t.sessionFrom,C=t.sendMessageTitle,O=t.sendMessagePath,w=t.sendMessageImg,k=t.showMessageCard,T=t.appParameter,S=this.state,A=S.isWEAPP,N=S.isALIPAY,j=["at-button"],I=(_defineProperty(e={},"at-button--"+b[r],b[r]),_defineProperty(e,"at-button--disabled",m),_defineProperty(e,"at-button--"+l,y[l]),_defineProperty(e,"at-button--circle",u),_defineProperty(e,"at-button--full",f),e),R="primary"===l?"#fff":"",F="small"===r?"30":0,x=void 0;d&&(x=o.l.createElement(a.a,{"className":"at-button__icon"},o.l.createElement(h,{"color":R,"size":F})),j.push("at-button--icon"));var L=o.l.createElement(i.a,{"className":"at-button__wxbutton","formType":v,"openType":_,"lang":E,"sessionFrom":P,"sendMessageTitle":C,"sendMessagePath":O,"sendMessageImg":w,"showMessageCard":k,"appParameter":T,"onGetUserInfo":this.onGetUserInfo.bind(this),"onGetPhoneNumber":this.onGetPhoneNumber.bind(this),"onOpenSetting":this.onOpenSetting.bind(this),"onError":this.onError.bind(this),"onContact":this.onContact.bind(this)});return o.l.createElement(a.a,{"className":p()(j,I,this.props.className),"style":g,"onClick":this.onClick.bind(this)},A&&!m&&o.l.createElement(s.a,{"reportSubmit":!0,"onSubmit":this.onSumit.bind(this),"onReset":this.onReset.bind(this)},L),N&&!m&&L,x,o.l.createElement(a.a,{"className":"at-button__text"},this.props.children))}}]),AtButton}();g.defaultProps={"size":"normal","type":"","circle":!1,"full":!1,"loading":!1,"disabled":!1,"customStyle":{},"onClick":function onClick(){},"formType":"","openType":"","lang":"en","sessionFrom":"","sendMessageTitle":"","sendMessagePath":"","sendMessageImg":"","showMessageCard":!1,"appParameter":"","onGetUserInfo":function onGetUserInfo(){},"onContact":function onContact(){},"onGetPhoneNumber":function onGetPhoneNumber(){},"onError":function onError(){},"onOpenSetting":function onOpenSetting(){}},g.propTypes={"size":l.a.oneOf(["normal","small"]),"type":l.a.oneOf(["primary","secondary",""]),"circle":l.a.bool,"full":l.a.bool,"loading":l.a.bool,"disabled":l.a.bool,"onClick":l.a.func,"customStyle":l.a.oneOfType([l.a.object,l.a.string]),"formType":l.a.oneOf(["submit","reset",""]),"openType":l.a.oneOf(["contact","share","getUserInfo","getPhoneNumber","launchApp","openSetting","feedback","getRealnameAuthInfo",""]),"lang":l.a.string,"sessionFrom":l.a.string,"sendMessageTitle":l.a.string,"sendMessagePath":l.a.string,"sendMessageImg":l.a.string,"showMessageCard":l.a.bool,"appParameter":l.a.string,"onGetUserInfo":l.a.func,"onContact":l.a.func,"onGetPhoneNumber":l.a.func,"onError":l.a.func,"onOpenSetting":l.a.func}},"363":function(e,t,n){"use strict";n.d(t,"a",function(){return createSelectorQuery});var o=n(3),r=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function filter(e,t,n){if(!t)return null;var o=e.id,r=e.dataset,a=e.rect,i=e.size,s=e.scrollOffset,c=e.properties,l=void 0===c?[]:c,u=e.computedStyle,p=void 0===u?[]:u,f=t.getBoundingClientRect(),d=f.left,h=f.right,m=f.top,b=f.bottom,y=f.width,g=f.height,v="html"===n,_={};if(o&&(_.id=t.id),r&&(_.dataset=Object.assign({},t.dataset)),a&&(v?(_.left=0,_.right=0,_.top=0,_.bottom=0):(_.left=d,_.right=h,_.top=m,_.bottom=b)),i&&(v?(_.width=t.clientWidth,_.height=t.clientHeight):(_.width=y,_.height=g)),s&&(_.scrollLeft=t.scrollLeft,_.scrollTop=t.scrollTop),l.length&&l.forEach(function(e){var n=t.getAttribute(e);n&&(_[e]=n)}),p.length){var E=window.getComputedStyle(t);p.forEach(function(e){var t=E.getPropertyValue(e);t&&(_[e]=t)})}return _}var a=function(){function Query(){_classCallCheck(this,Query),this._defaultWebviewId=null,this._webviewId=null,this._queue=[],this._queueCb=[],this._component=null}return r(Query,[{"key":"in","value":function _in(e){return this._component=e,this}},{"key":"select","value":function select(e){return"string"==typeof e&&(e=e.replace(">>>",">")),new i(e,this,!0)}},{"key":"selectAll","value":function selectAll(e){return"string"==typeof e&&(e=e.replace(">>>",">")),new i(e,this,!1)}},{"key":"selectViewport","value":function selectViewport(){return new i("html",this,!0)}},{"key":"exec","value":function exec(e){var t=this;!function queryBat(e,t){var n=[];e.forEach(function(e){var t=e.selector,r=e.single,a=e.fields,i=e.component,s=null!==i&&o.l.findDOMNode(i)||document,c=!1;if(s!==document)for(var l=s.parentNode.querySelectorAll(t),u=0,p=l.length;u<p;++u)if(s===l[u]){c=!0;break}if(r){var f=!0===c?s:s.querySelector(t);n.push(filter(a,f,t))}else{var d=s.querySelectorAll(t),h=[];!0===c&&h.push(s);for(var m=0,b=d.length;m<b;++m)h.push(d[m]);n.push(h.map(function(e){return filter(a,e)}))}}),t(n)}(this._queue,function(n){var o=t._queueCb;n.forEach(function(e,n){"function"==typeof o[n]&&o[n].call(t,e)}),"function"==typeof e&&e.call(t,n)})}},{"key":"_push","value":function _push(e,t,n,o){var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;this._queue.push({"component":t,"selector":e,"single":n,"fields":o}),this._queueCb.push(r)}}]),Query}(),i=function(){function NodesRef(e,t,n){_classCallCheck(this,NodesRef),this._component=t._component,this._selector=e,this._selectorQuery=t,this._single=n}return r(NodesRef,[{"key":"boundingClientRect","value":function boundingClientRect(e){var t=this._selector,n=this._component,o=this._single,r=this._selectorQuery;return r._push(t,n,o,{"id":!0,"dataset":!0,"rect":!0,"size":!0},e),r}},{"key":"scrollOffset","value":function scrollOffset(e){var t=this._selector,n=this._component,o=this._single,r=this._selectorQuery;return r._push(t,n,o,{"id":!0,"dataset":!0,"scrollOffset":!0},e),r}},{"key":"fields","value":function fields(e,t){var n=this._selector,o=this._component,r=this._single,a=this._selectorQuery,i=e.id,s=e.dataset,c=e.rect,l=e.size,u=e.scrollOffset,p=e.properties,f=void 0===p?[]:p,d=e.computedStyle,h=void 0===d?[]:d;return a._push(n,o,r,{"id":i,"dataset":s,"rect":c,"size":l,"scrollOffset":u,"properties":f,"computedStyle":h},t),a}}]),NodesRef}();function createSelectorQuery(){return new a}},"371":function(e,t,n){"use strict";var o=n(3),r=n(747),a=(n(354),function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}());var i=function(e){function Label(){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Label),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Label.__proto__||Object.getPrototypeOf(Label)).apply(this,arguments))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Label,o["l"].Component),a(Label,[{"key":"render","value":function render(){var e=function _objectWithoutProperties(e,t){var n={};for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o]);return n}(this.props,[]);return o.l.createElement("label",e,this.props.children)}}]),Label}(),s=n(464),c=n(376),l=n(350),u=n.n(l),p=n(49),f=n.n(p),d=n(349);n.d(t,"a",function(){return m});var h=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();function input_possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var m=function(e){function AtInput(){var e,t,n;!function input_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AtInput);for(var o=arguments.length,r=Array(o),a=0;a<o;a++)r[a]=arguments[a];return t=n=input_possibleConstructorReturn(this,(e=AtInput.__proto__||Object.getPrototypeOf(AtInput)).call.apply(e,[this].concat(r))),n.onInput=function(e){return n.props.onChange(e.target.value,e)},n.onFocus=function(e){return n.props.onFocus(e.target.value,e)},n.onBlur=function(e){n.props.onBlur(e.target.value,e),n.props.onChange(e.target.value,e)},n.onConfirm=function(e){return n.props.onConfirm(e.target.value,e)},n.onClick=function(){return!n.props.editable&&n.props.onClick()},n.clearValue=function(){return n.props.onChange("")},n.onErrorClick=function(){return n.props.onErrorClick()},input_possibleConstructorReturn(n,t)}return function input_inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AtInput,d["a"]),h(AtInput,[{"key":"render","value":function render(){var e=this.props,t=e.className,n=e.customStyle,a=e.name,l=e.cursorSpacing,u=e.confirmType,p=e.cursor,d=e.selectionStart,h=e.selectionEnd,m=e.adjustPosition,b=e.border,y=e.title,g=e.error,v=e.clear,_=e.placeholder,E=e.placeholderStyle,P=e.placeholderClass,C=e.autoFocus,O=e.focus,w=e.value,k=function getInputProps(e){var t={"type":e.type,"maxLength":e.maxLength,"disabled":e.disabled,"password":!1};switch(t.type){case"phone":t.type="number",t.maxLength=11;break;case"password":t.password=!0}return e.disabled||e.editable||(t.disabled=!0),t}(this.props),T=k.type,S=k.maxLength,A=k.disabled,N=k.password,j=f()("at-input",{"at-input--without-border":!b},t),I=f()("at-input__container",{"at-input--error":g,"at-input--disabled":A}),R=f()("at-input__overlay",{"at-input__overlay--hidden":!A}),F=f()("placeholder",P);return o.l.createElement(r.a,{"className":j,"style":n},o.l.createElement(r.a,{"className":I},o.l.createElement(r.a,{"className":R,"onClick":this.onClick}),y&&o.l.createElement(i,{"className":"at-input__title","for":a},y),o.l.createElement(s.a,{"className":"at-input__input","id":a,"name":a,"type":T,"password":N,"placeholderStyle":E,"placeholderClass":F,"placeholder":_,"cursorSpacing":l,"maxLength":S,"autoFocus":C,"focus":O,"value":w,"confirmType":u,"cursor":p,"selectionStart":d,"selectionEnd":h,"adjustPosition":m,"onInput":this.onInput,"onFocus":this.onFocus,"onBlur":this.onBlur,"onConfirm":this.onConfirm}),v&&w&&o.l.createElement(r.a,{"className":"at-input__icon","onTouchStart":this.clearValue},o.l.createElement(c.a,{"className":"at-icon at-icon-close-circle at-input__icon-close"})),g&&o.l.createElement(r.a,{"className":"at-input__icon","onTouchStart":this.onErrorClick},o.l.createElement(c.a,{"className":"at-icon at-icon-alert-circle at-input__icon-alert"})),o.l.createElement(r.a,{"className":"at-input__children"},this.props.children)))}}]),AtInput}();m.defaultProps={"className":"","customStyle":"","value":"","name":"","placeholder":"","placeholderStyle":"","placeholderClass":"","title":"","cursorSpacing":50,"confirmType":"完成","cursor":0,"selectionStart":-1,"selectionEnd":-1,"adjustPosition":!0,"maxLength":140,"type":"text","disabled":!1,"border":!0,"editable":!0,"error":!1,"clear":!1,"autoFocus":!1,"focus":!1,"onChange":function onChange(){},"onFocus":function onFocus(){},"onBlur":function onBlur(){},"onConfirm":function onConfirm(){},"onErrorClick":function onErrorClick(){},"onClick":function onClick(){}},m.propTypes={"className":u.a.oneOfType([u.a.string,u.a.array]),"customStyle":u.a.oneOfType([u.a.string,u.a.object]),"value":u.a.oneOfType([u.a.string,u.a.number]),"name":u.a.string,"placeholder":u.a.string,"placeholderStyle":u.a.string,"placeholderClass":u.a.string,"title":u.a.string,"confirmType":u.a.string,"cursor":u.a.oneOfType([u.a.string,u.a.number]),"selectionStart":u.a.oneOfType([u.a.string,u.a.number]),"selectionEnd":u.a.oneOfType([u.a.string,u.a.number]),"adjustPosition":u.a.bool,"cursorSpacing":u.a.oneOfType([u.a.string,u.a.number]),"maxLength":u.a.oneOfType([u.a.string,u.a.number]),"type":u.a.string,"disabled":u.a.bool,"border":u.a.bool,"editable":u.a.bool,"error":u.a.bool,"clear":u.a.bool,"backgroundColor":u.a.string,"autoFocus":u.a.bool,"focus":u.a.bool,"onChange":u.a.func,"onFocus":u.a.func,"onBlur":u.a.func,"onConfirm":u.a.func,"onErrorClick":u.a.func,"onClick":u.a.func}},"467":function(e,t,n){"use strict";n.d(t,"a",function(){return p});var o=n(3),r=n(553),a=n(350),i=n.n(a),s=n(49),c=n.n(s),l=n(349),u=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();var p=function(e){function AtForm(){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AtForm),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(AtForm.__proto__||Object.getPrototypeOf(AtForm)).apply(this,arguments))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AtForm,l["a"]),u(AtForm,[{"key":"onSubmit","value":function onSubmit(){var e;(e=this.props).onSubmit.apply(e,arguments)}},{"key":"onReset","value":function onReset(){var e;(e=this.props).onReset.apply(e,arguments)}},{"key":"render","value":function render(){var e=this.props,t=e.customStyle,n=e.className,a=e.reportSubmit,i=c()("at-form",n);return o.l.createElement(r.a,{"className":i,"style":t,"onSubmit":this.onSubmit.bind(this),"reportSubmit":a,"onReset":this.onReset.bind(this)},this.props.children)}}]),AtForm}();p.defaultProps={"customStyle":"","className":"","reportSubmit":!1,"onSubmit":function onSubmit(){},"onReset":function onReset(){}},p.propTypes={"customStyle":i.a.oneOfType([i.a.object,i.a.string]),"className":i.a.oneOfType([i.a.array,i.a.string]),"reportSubmit":i.a.bool,"onSubmit":i.a.func,"onReset":i.a.func}},"499":function(e,t,n){"use strict";n.d(t,"a",function(){return o}),n.d(t,"b",function(){return r}),n.d(t,"d",function(){return a}),n.d(t,"c",function(){return i});var o=6e4,r={"UNSENT":0,"OPENED":1,"HEADERS_RECEIVED":2,"LOADING":3,"DONE":4},a=function setHeader(e,t){var n=void 0;for(n in t)e.setRequestHeader(n,t[n])},i=function convertObjectUrlToBlob(e){return new Promise(function(t,n){var o=new XMLHttpRequest;o.open("GET",e,!0),o.responseType="blob",o.onload=function(e){200===this.status?t(this.response):n({"status":this.status})},o.send()})}},"746":function(e,t,n){"use strict";var o=n(3),r=n(4),a=n(1);var i=function chooseImage(e){var t=Object(a.l)(e);if(!t.res){var n={"errMsg":"chooseImage"+t.msg};return console.error(n.errMsg),Promise.reject(n)}var o=e.count,r=void 0===o?1:o,i=e.success,s=e.fail,c=e.complete,l=e.imageId,u=void 0===l?"taroChooseImage":l,p={"errMsg":"chooseImage:ok","tempFilePaths":[],"tempFiles":[]};if(r&&"number"!=typeof r)return p.errMsg=Object(a.e)({"name":"chooseImage","para":"count","correct":"Number","wrong":r}),console.error(p.errMsg),"function"==typeof s&&s(p),"function"==typeof c&&c(p),Promise.reject(p);var f=document.getElementById(u);if(!f){var d=document.createElement("input");d.setAttribute("type","file"),d.setAttribute("id",u),r>1&&d.setAttribute("multiple","multiple"),d.setAttribute("accept","image/*"),d.setAttribute("style","position: fixed; top: -4000px; left: -3000px; z-index: -300;"),document.body.appendChild(d),f=document.getElementById(u)}var h=void 0,m=new Promise(function(e){h=e}),b=document.createEvent("MouseEvents");return b.initEvent("click",!0,!0),f.dispatchEvent(b),f.onchange=function(e){var t=[].concat(function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(e.target.files));t&&t.forEach(function(e){var t=new Blob([e],{"type":e.type}),n=URL.createObjectURL(t);p.tempFilePaths.push(n),p.tempFiles.push({"path":n,"size":e.size,"type":e.type})}),"function"==typeof i&&i(p),"function"==typeof c&&c(p),h(p),e.target.value=""},m},s=n(747),c=n(462),l=n(350),u=n.n(l),p=n(49),f=n.n(p),d=n(349),h=n(356);n.d(t,"a",function(){return y});var m=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var b=r.a.getEnv(),y=function(e){function AtImagePicker(){var e,t,n;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AtImagePicker);for(var o=arguments.length,a=Array(o),s=0;s<o;s++)a[s]=arguments[s];return t=n=_possibleConstructorReturn(this,(e=AtImagePicker.__proto__||Object.getPrototypeOf(AtImagePicker)).call.apply(e,[this].concat(a))),n.chooseFile=function(){var e=n.props,t=e.files,o=void 0===t?[]:t,a=e.multiple,s=e.count,c=e.sizeType,l=e.sourceType,u=b===r.a.ENV_TYPE.ALIPAY?"apFilePaths":"tempFiles",p={};a&&(p.count=99),s&&(p.count=s),c&&(p.sizeType=c),l&&(p.sourceType=l),i(p).then(function(e){var t=e.tempFilePaths.map(function(t,n){return{"url":t,"file":e[u][n]}}),r=o.concat(t);n.props.onChange(r,"add")}).catch(n.props.onFail)},n.handleImageClick=function(e){return n.props.onImageClick(e,n.props.files[e])},n.handleRemoveImg=function(e){var t=n.props.files,o=void 0===t?[]:t;b===r.a.ENV_TYPE.WEB&&window.URL.revokeObjectURL(o[e].url);var a=o.filter(function(t,n){return n!==e});n.props.onChange(a,"remove",e)},_possibleConstructorReturn(n,t)}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AtImagePicker,d["a"]),m(AtImagePicker,[{"key":"render","value":function render(){var e=this,t=this.props,n=t.className,r=t.customStyle,a=t.files,i=t.mode,l=t.length,u=t.showAddBtn,p=function generateMatrix(e,t,n){for(var o=[],r=n?e.length+1:e.length,a=Math.ceil(r/t),i=0;i<a;i++)if(i===a-1){var s=e.slice(i*t);if(s.length<t){n&&s.push({"type":"btn","uuid":Object(h.e)()});for(var c=s.length;c<t;c++)s.push({"type":"blank","uuid":Object(h.e)()})}o.push(s)}else o.push(e.slice(i*t,(i+1)*t));return o}(a,l,u),d=f()("at-image-picker",n);return o.l.createElement(s.a,{"className":d,"style":r},p.map(function(t,n){return o.l.createElement(s.a,{"className":"at-image-picker__flex-box","key":n+1},t.map(function(t,r){return t.url?o.l.createElement(s.a,{"className":"at-image-picker__flex-item","key":n*l+r},o.l.createElement(s.a,{"className":"at-image-picker__item"},o.l.createElement(s.a,{"className":"at-image-picker__remove-btn","onClick":e.handleRemoveImg.bind(e,n*l+r)}),o.l.createElement(c.a,{"className":"at-image-picker__preview-img","mode":i,"src":t.url,"onClick":e.handleImageClick.bind(e,n*l+r)}))):o.l.createElement(s.a,{"className":"at-image-picker__flex-item","key":n*l+r},"btn"===t.type&&o.l.createElement(s.a,{"className":"at-image-picker__item at-image-picker__choose-btn","onClick":e.chooseFile},o.l.createElement(s.a,{"className":"add-bar"}),o.l.createElement(s.a,{"className":"add-bar"})))}))}))}}]),AtImagePicker}();y.defaultProps={"isTest":!1,"className":"","customStyle":"","files":[],"mode":"aspectFill","showAddBtn":!0,"multiple":!1,"length":4,"onChange":function onChange(){},"onImageClick":function onImageClick(){},"onFail":function onFail(){}},y.propTypes={"className":u.a.oneOfType([u.a.string,u.a.array]),"customStyle":u.a.oneOfType([u.a.string,u.a.object]),"isTest":u.a.bool,"files":u.a.array,"mode":u.a.oneOf(["scaleToFill","aspectFit","aspectFill","widthFix","top","bottom","center","left","right","top left","top right","bottom left","bottom right"]),"showAddBtn":u.a.bool,"multiple":u.a.bool,"length":u.a.number,"onChange":u.a.func,"onImageClick":u.a.func,"onFail":u.a.func,"count":u.a.number,"sizeType":u.a.array,"sourceType":u.a.array}},"786":function(e,t,n){"use strict";var o=n(1),r=n(499),a=function createUploadTask(e){var t=e.url,n=e.filePath,a=e.formData,i=e.name,s=e.header,c=e.success,l=e.error,u=void 0,p=void 0,f="uploadFile",d=new XMLHttpRequest,h=new FormData,m={"headersReceived":Object(o.a)(),"progressUpdate":Object(o.a)()};for(p in d.open("POST",t),Object(r.d)(d,s),a)h.append(p,a[p]);d.upload.onprogress=function(e){var t=e.loaded,n=e.total;m.progressUpdate.trigger({"progress":Math.round(t/n*100),"totalBytesSent":t,"totalBytesExpectedToSent":n})},d.onreadystatechange=function(){d.readyState===r.b.HEADERS_RECEIVED&&m.headersReceived.trigger({"header":d.getAllResponseHeaders()})},d.onload=function(){var e=d.status;c({"errMsg":f+":ok","statusCode":e,"data":d.responseText||d.response})},d.onabort=function(){clearTimeout(u),l({"errMsg":f+":fail abort"})},d.onerror=function(e){l({"errMsg":f+":fail "+e.message})};Object(r.c)(n).then(function(e){h.append(i,e,e.name||"file-"+Date.now()),function send(){d.send(h),u=setTimeout(function(){d.onabort=null,d.onload=null,d.upload.onprogress=null,d.onreadystatechange=null,d.onerror=null,b(),l({"errMsg":f+":fail timeout"})},r.a)}()}).catch(function(e){l({"errMsg":f+":fail "+e.message})});var b=function abort(){d.abort()},y=m.headersReceived.add,g=m.headersReceived.remove,v=m.progressUpdate.add,_=m.progressUpdate.remove;return{"abort":b,"onHeadersReceived":y,"offHeadersReceived":g,"onProgressUpdate":v,"offProgressUpdate":_}};t.a=function uploadFile(e){var t=e.url,n=e.filePath,o=e.name,r=e.header,i=e.formData,s=e.success,c=e.fail,l=e.complete,u=void 0,p=new Promise(function(e,p){u=a({"url":t,"header":r,"name":o,"filePath":n,"formData":i,"success":function success(t){s&&s(t),l&&l(),e(t)},"error":function error(e){c&&c(e),l&&l(),p(e)}})});return p.headersReceive=u.onHeadersReceived,p.progress=u.onProgressUpdate,p.abort=u.abort,p}}}]);