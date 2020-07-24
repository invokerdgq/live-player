(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{"362":function(e,t,n){"use strict";var r=n(3),a=n(4),o=n(747),i=n(456),s=n(553),l=n(350),c=n.n(l),u=n(49),d=n.n(u),p=n(349),f=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();var m=function(e){function AtLoading(){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AtLoading),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(AtLoading.__proto__||Object.getPrototypeOf(AtLoading)).apply(this,arguments))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AtLoading,p["a"]),f(AtLoading,[{"key":"render","value":function render(){var e=this.props,t=e.color,n=e.size,i={"width":n?""+a.a.pxTransform(parseInt(n)):"","height":n?""+a.a.pxTransform(parseInt(n)):""},s={"border":t?"1px solid "+t:"","border-color":t?t+" transparent transparent transparent":""},l=Object.assign({},s,i);return r.l.createElement(o.a,{"className":"at-loading","style":i},r.l.createElement(o.a,{"className":"at-loading__ring","style":l}),r.l.createElement(o.a,{"className":"at-loading__ring","style":l}),r.l.createElement(o.a,{"className":"at-loading__ring","style":l}))}}]),AtLoading}();m.defaultProps={"size":0,"color":""},m.propTypes={"size":c.a.oneOfType([c.a.string,c.a.number]),"color":c.a.oneOfType([c.a.string,c.a.number])},n.d(t,"a",function(){return b});var _=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{"value":n,"enumerable":!0,"configurable":!0,"writable":!0}):e[t]=n,e}var h={"normal":"normal","small":"small"},y={"primary":"primary","secondary":"secondary"},b=function(e){function AtButton(){!function button_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AtButton);var e=function button_possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(AtButton.__proto__||Object.getPrototypeOf(AtButton)).apply(this,arguments));return e.state={"isWEB":a.a.getEnv()===a.a.ENV_TYPE.WEB,"isWEAPP":a.a.getEnv()===a.a.ENV_TYPE.WEAPP,"isALIPAY":a.a.getEnv()===a.a.ENV_TYPE.ALIPAY},e}return function button_inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AtButton,p["a"]),_(AtButton,[{"key":"onClick","value":function onClick(){var e;this.props.disabled||this.props.onClick&&(e=this.props).onClick.apply(e,arguments)}},{"key":"onGetUserInfo","value":function onGetUserInfo(){var e;this.props.onGetUserInfo&&(e=this.props).onGetUserInfo.apply(e,arguments)}},{"key":"onContact","value":function onContact(){var e;this.props.onContact&&(e=this.props).onContact.apply(e,arguments)}},{"key":"onGetPhoneNumber","value":function onGetPhoneNumber(){var e;this.props.onGetPhoneNumber&&(e=this.props).onGetPhoneNumber.apply(e,arguments)}},{"key":"onError","value":function onError(){var e;this.props.onError&&(e=this.props).onError.apply(e,arguments)}},{"key":"onOpenSetting","value":function onOpenSetting(){var e;this.props.onOpenSetting&&(e=this.props).onOpenSetting.apply(e,arguments)}},{"key":"onSumit","value":function onSumit(){this.state.isWEAPP&&this.$scope.triggerEvent("submit",arguments[0].detail,{"bubbles":!0,"composed":!0})}},{"key":"onReset","value":function onReset(){this.state.isWEAPP&&this.$scope.triggerEvent("reset",arguments[0].detail,{"bubbles":!0,"composed":!0})}},{"key":"render","value":function render(){var e,t=this.props,n=t.size,a=void 0===n?"normal":n,l=t.type,c=void 0===l?"":l,u=t.circle,p=t.full,f=t.loading,_=t.disabled,b=t.customStyle,v=t.formType,E=t.openType,g=t.lang,O=t.sessionFrom,w=t.sendMessageTitle,C=t.sendMessagePath,P=t.sendMessageImg,T=t.showMessageCard,k=t.appParameter,N=this.state,S=N.isWEAPP,j=N.isALIPAY,A=["at-button"],D=(_defineProperty(e={},"at-button--"+h[a],h[a]),_defineProperty(e,"at-button--disabled",_),_defineProperty(e,"at-button--"+c,y[c]),_defineProperty(e,"at-button--circle",u),_defineProperty(e,"at-button--full",p),e),x="primary"===c?"#fff":"",R="small"===a?"30":0,I=void 0;f&&(I=r.l.createElement(o.a,{"className":"at-button__icon"},r.l.createElement(m,{"color":x,"size":R})),A.push("at-button--icon"));var M=r.l.createElement(i.a,{"className":"at-button__wxbutton","formType":v,"openType":E,"lang":g,"sessionFrom":O,"sendMessageTitle":w,"sendMessagePath":C,"sendMessageImg":P,"showMessageCard":T,"appParameter":k,"onGetUserInfo":this.onGetUserInfo.bind(this),"onGetPhoneNumber":this.onGetPhoneNumber.bind(this),"onOpenSetting":this.onOpenSetting.bind(this),"onError":this.onError.bind(this),"onContact":this.onContact.bind(this)});return r.l.createElement(o.a,{"className":d()(A,D,this.props.className),"style":b,"onClick":this.onClick.bind(this)},S&&!_&&r.l.createElement(s.a,{"reportSubmit":!0,"onSubmit":this.onSumit.bind(this),"onReset":this.onReset.bind(this)},M),j&&!_&&M,I,r.l.createElement(o.a,{"className":"at-button__text"},this.props.children))}}]),AtButton}();b.defaultProps={"size":"normal","type":"","circle":!1,"full":!1,"loading":!1,"disabled":!1,"customStyle":{},"onClick":function onClick(){},"formType":"","openType":"","lang":"en","sessionFrom":"","sendMessageTitle":"","sendMessagePath":"","sendMessageImg":"","showMessageCard":!1,"appParameter":"","onGetUserInfo":function onGetUserInfo(){},"onContact":function onContact(){},"onGetPhoneNumber":function onGetPhoneNumber(){},"onError":function onError(){},"onOpenSetting":function onOpenSetting(){}},b.propTypes={"size":c.a.oneOf(["normal","small"]),"type":c.a.oneOf(["primary","secondary",""]),"circle":c.a.bool,"full":c.a.bool,"loading":c.a.bool,"disabled":c.a.bool,"onClick":c.a.func,"customStyle":c.a.oneOfType([c.a.object,c.a.string]),"formType":c.a.oneOf(["submit","reset",""]),"openType":c.a.oneOf(["contact","share","getUserInfo","getPhoneNumber","launchApp","openSetting","feedback","getRealnameAuthInfo",""]),"lang":c.a.string,"sessionFrom":c.a.string,"sendMessageTitle":c.a.string,"sendMessagePath":c.a.string,"sendMessageImg":c.a.string,"showMessageCard":c.a.bool,"appParameter":c.a.string,"onGetUserInfo":c.a.func,"onContact":c.a.func,"onGetPhoneNumber":c.a.func,"onError":c.a.func,"onOpenSetting":c.a.func}},"450":function(e,t,n){"use strict";n.d(t,"a",function(){return d});var r,a,o=n(3),i=n(4),s=n(747),l=n(376),c=n(351),u=(n(451),function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}());var d=(a=r=function(e){function OrderItem(){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,OrderItem),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(OrderItem.__proto__||Object.getPrototypeOf(OrderItem)).apply(this,arguments))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(OrderItem,i["a"].Component),u(OrderItem,[{"key":"render","value":function render(){var e=this.props,t=e.info,n=e.onClick,r=e.payType,a=e.showExtra,i=e.customFooter;if(!t)return null;var u=t.pic_path?t.pic_path:Array.isArray(t.pics)?t.pics[0]:t.pics;return o.l.createElement(s.a,{"className":"order-item","onClick":n},o.l.createElement(s.a,{"className":"order-item__hd"},o.l.createElement(c.m,{"img-class":"order-item__img","src":u,"mode":"aspectFill","width":"100","lazyLoad":!0})),o.l.createElement(s.a,{"className":"order-item__bd"},o.l.createElement(l.a,{"className":"order-item__title"},t.title),this.props.renderDesc,a&&o.l.createElement(s.a,{"className":"order-item__extra"},o.l.createElement(l.a,{"className":"order-item__desc"},t.goods_props),t.num&&o.l.createElement(l.a,{"className":"order-item__num"},"数量：",t.num))),i?this.props.renderFooter:o.l.createElement(s.a,{"className":"order-item__ft"},"point"===r?o.l.createElement(c.l,{"className":"order-item__price","appendText":"积分","noSymbol":!0,"noDecimal":!0,"value":t.point}):o.l.createElement(c.l,{"className":"order-item__price","value":t.price}),o.l.createElement(l.a,{"className":"order-item__pay-type"},"dhpoint"===r?"积分支付":"微信支付")))}}]),OrderItem}(),r.defaultProps={"onClick":function onClick(){},"payType":"","showExtra":!0,"info":null},r.options={"addGlobalClass":!0},a)},"451":function(e,t,n){},"461":function(e,t,n){"use strict";var r=n(3),a=n(350),o=n.n(a),i=n(747),s=n(49),l=n.n(s),c=n(349),u=n(376),d=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();var p=function(e){function AtCountdownItem(){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AtCountdownItem),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(AtCountdownItem.__proto__||Object.getPrototypeOf(AtCountdownItem)).apply(this,arguments))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AtCountdownItem,c["a"]),d(AtCountdownItem,[{"key":"formatNum","value":function formatNum(e){return e<=9?"0"+e:""+e}},{"key":"render","value":function render(){var e=this.props,t=e.num,n=e.separator;return r.l.createElement(i.a,{"className":"at-countdown__item"},r.l.createElement(i.a,{"className":"at-countdown__time-box"},r.l.createElement(u.a,{"className":"at-countdown__time"},this.formatNum(t))),r.l.createElement(u.a,{"className":"at-countdown__separator"},n))}}]),AtCountdownItem}();p.defaultProps={"num":0,"separator":":"},p.propTypes={"num":o.a.number.isRequired,"separator":o.a.string};var f=p;n.d(t,"a",function(){return h});var m=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();var _=function toSeconds(e,t,n,r){return 60*e*60*24+60*t*60+60*n+r},h=function(e){function AtCountdown(){!function countdown_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AtCountdown);var e=function countdown_possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(AtCountdown.__proto__||Object.getPrototypeOf(AtCountdown)).apply(this,arguments)),t=e.props,n=t.day,r=t.hours,a=t.minutes,o=t.seconds;e.seconds=_(n,r,a,o);var i=e.calculateTime(),s=i.day,l=i.hours,c=i.minutes,u=i.seconds;return e.state={"_day":s,"_hours":l,"_minutes":c,"_seconds":u},e.timer=null,e}return function countdown_inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AtCountdown,c["a"]),m(AtCountdown,[{"key":"setTimer","value":function setTimer(){this.timer||this.countdonwn()}},{"key":"clearTimer","value":function clearTimer(){this.timer&&(clearTimeout(this.timer),this.timer=null)}},{"key":"calculateTime","value":function calculateTime(){var e=0,t=0,n=0,r=0;return this.seconds>0&&(e=this.props.isShowDay?Math.floor(this.seconds/86400):0,t=Math.floor(this.seconds/3600)-24*e,n=Math.floor(this.seconds/60)-24*e*60-60*t,r=Math.floor(this.seconds)-24*e*60*60-60*t*60-60*n),{"day":e,"hours":t,"minutes":n,"seconds":r}}},{"key":"countdonwn","value":function countdonwn(){var e=this,t=this.calculateTime(),n=t.day,r=t.hours,a=t.minutes,o=t.seconds;if(this.setState({"_day":n,"_hours":r,"_minutes":a,"_seconds":o}),this.seconds--,this.seconds<0)return this.clearTimer(),void this.props.onTimeUp();this.timer=setTimeout(function(){e.countdonwn()},1e3)}},{"key":"componentWillReceiveProps","value":function componentWillReceiveProps(e){if(JSON.stringify(this.props)!==JSON.stringify(e)){var t=e.day,n=e.hours,r=e.minutes,a=e.seconds;this.seconds=_(t,n,r,a),this.clearTimer(),this.setTimer()}}},{"key":"componentDidMount","value":function componentDidMount(){this.setTimer()}},{"key":"componentWillUnmount","value":function componentWillUnmount(){this.clearTimer()}},{"key":"componentDidHide","value":function componentDidHide(){this.clearTimer()}},{"key":"componentDidShow","value":function componentDidShow(){this.setTimer()}},{"key":"render","value":function render(){var e=this.props,t=e.className,n=e.customStyle,a=e.format,o=e.isShowDay,s=e.isCard,c=e.isShowHour,u=this.state,d=u._day,p=u._hours,m=u._minutes,_=u._seconds;return r.l.createElement(i.a,{"className":l()({"at-countdown":!0,"at-countdown--card":s},t),"style":n},o&&r.l.createElement(f,{"num":d,"separator":a.day}),c&&r.l.createElement(f,{"num":p,"separator":a.hours}),r.l.createElement(f,{"num":m,"separator":a.minutes}),r.l.createElement(f,{"num":_,"separator":a.seconds}))}}]),AtCountdown}();h.defaultProps={"customStyle":"","className":"","isCard":!1,"isShowDay":!1,"isShowHour":!0,"format":{"day":"天","hours":"时","minutes":"分","seconds":"秒"},"day":0,"hours":0,"minutes":0,"seconds":0,"onTimeUp":function onTimeUp(){}},h.propTypes={"customStyle":o.a.oneOfType([o.a.object,o.a.string]),"className":o.a.oneOfType([o.a.array,o.a.string]),"isCard":o.a.bool,"isShowDay":o.a.bool,"isShowHour":o.a.bool,"format":o.a.object,"day":o.a.number,"hours":o.a.number,"minutes":o.a.number,"seconds":o.a.number,"onTimeUp":o.a.func}},"511":function(e,t,n){"use strict";n.d(t,"a",function(){return a});var r=n(1),a=Object(r.i)("chooseWXPay",void 0,void 0,function(e){return Object.assign(e,{"timestamp":Number.parseInt(e.timeStamp,10)})})},"726":function(e,t,n){},"728":function(e,t,n){},"827":function(e,t,n){"use strict";n.r(t);var r,a,o=n(3),i=n(21),s=n(511),l=n(347),c=n(4),u=n(747),d=n(376),p=n(456),f=n(461),m=n(362),_=n(351),h=n(13),y=n(15),b=n(16),v=n(450),E=(n(726),function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}());function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var g=(a=r=function(e){function DetailItem(){var e,t,n;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,DetailItem);for(var r=arguments.length,a=Array(r),o=0;o<r;o++)a[o]=arguments[o];return t=n=_possibleConstructorReturn(this,(e=DetailItem.__proto__||Object.getPrototypeOf(DetailItem)).call.apply(e,[this].concat(a))),n.handleClickAfterSale=function(e){var t=n.props.info.tid;e.aftersales_status&&"SELLER_REFUSE_BUYER"!==e.aftersales_status?c.a.navigateTo({"url":"/pages/trade/refund-detail?order_id="+t+"&item_id="+e.item_id}):c.a.navigateTo({"url":"/pages/trade/refund?order_id="+t+"&item_id="+e.item_id})},_possibleConstructorReturn(n,t)}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(DetailItem,c["a"].Component),E(DetailItem,[{"key":"render","value":function render(){var e=this,t=this.props,n=(t.customHeader,t.customFooter),r=(t.noHeader,t.onClick,t.info);t.showActions;return o.l.createElement(u.a,{"className":"detail-item"},r&&r.orders.map(function(t,a){return o.l.createElement(u.a,{"className":"detail-item-good","key":a},o.l.createElement(d.a,{"className":"detail-item__title"},"第",a+1,"件商品"),o.l.createElement(v.a,{"key":a,"info":t}),!n&&"dhpoint"!==r.pay_type&&("TRADE_SUCCESS"===r.status||"WAIT_BUYER_CONFIRM_GOODS"===r.status)&&o.l.createElement(u.a,{"className":"order-item__ft"},o.l.createElement(m.a,{"circle":!0,"type":"primary","size":"small","onClick":e.handleClickAfterSale.bind(e,t)},t.aftersales_status&&"SELLER_REFUSE_BUYER"!==t.aftersales_status?"售后详情":"申请售后")))}))}}]),DetailItem}(),r.options={"addGlobalClass":!0},r.defaultProps={"customFooter":!1},a);n(728);n.d(t,"default",function(){return C});var O=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),w=function get(e,t,n){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,t);if(void 0===r){var a=Object.getPrototypeOf(e);return null===a?void 0:get(a,t,n)}if("value"in r)return r.value;var o=r.get;return void 0!==o?o.call(n):void 0};function _asyncToGenerator(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function step(r,a){try{var o=t[r](a),i=o.value}catch(e){return void n(e)}if(!o.done)return Promise.resolve(i).then(function(e){step("next",e)},function(e){step("throw",e)});e(i)}("next")})}}var C=function(e){function TradeDetail(e){var t=this;!function detail_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,TradeDetail);var n=function detail_possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(TradeDetail.__proto__||Object.getPrototypeOf(TradeDetail)).call(this,e));return n.handleCopy=_asyncToGenerator(regeneratorRuntime.mark(function _callee(){var e,r;return regeneratorRuntime.wrap(function _callee$(t){for(;;)switch(t.prev=t.next){case 0:return e=n.state.info,r="收货人："+e.receiver_name+" "+e.receiver_mobile+"\n收货地址："+e.receiver_state+e.receiver_city+e.receiver_district+e.receiver_address+"\n订单编号："+e.tid+"\n创建时间："+e.created_time_str+"\n",t.next=4,Object(h.e)(r);case 4:case"end":return t.stop()}},_callee,t)})),n.handleClickDelivery=function(){},n.handleClickToDelivery=function(){},n.handleClickCopy=function(e){Object(h.e)(e),b.a.toast("复制成功")},n.countDownEnd=function(){n.fetch()},n.state={"info":null,"timer":null,"payLoading":!1,"sessionFrom":""},n}return function detail_inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(TradeDetail,c["a"].Component),O(TradeDetail,[{"key":"componentDidShow","value":function componentDidShow(){this.fetch()}},{"key":"calcTimer","value":function calcTimer(e){var t=e,n=Math.floor(e/24/3600);t-=3600*n*24;var r=Math.floor(t/3600);t-=3600*r;var a=Math.floor(t/60);return t-=60*a,{"dd":n,"hh":r,"mm":a,"ss":Math.floor(t)}}},{"key":"fetch","value":function(){var e=_asyncToGenerator(regeneratorRuntime.mark(function _callee2(){var e,t,n,r,a,o;return regeneratorRuntime.wrap(function _callee2$(s){for(;;)switch(s.prev=s.next){case 0:return e=this.$router.params.id,s.next=3,y.a.trade.detail(e);case 3:t=s.sent,n="",r=Object(h.q)(t.orderInfo,{"tid":"order_id","created_time_str":function created_time_str(e){var t=e.create_time;return Object(h.g)(1e3*t)},"auto_cancel_seconds":"auto_cancel_seconds","receiver_name":"receiver_name","receiver_mobile":"receiver_mobile","receiver_state":"receiver_state","discount_fee":function discount_fee(e){return(+e.discount_fee/100).toFixed(2)},"receiver_city":"receiver_city","receiver_district":"receiver_district","receiver_address":"receiver_address","status_desc":"order_status_msg","delivery_code":"delivery_code","delivery_corp":"delivery_corp","order_type":"order_type","order_status_msg":"order_status_msg","order_status_des":"order_status_des","item_fee":function item_fee(e){return(+e.item_fee/100).toFixed(2)},"coupon_discount":function coupon_discount(e){return(+e.coupon_discount/100).toFixed(2)},"freight_fee":function freight_fee(e){return(+e.freight_fee/100).toFixed(2)},"payment":function payment(e){var t=e.pay_type,n=e.total_fee;return"dhpoint"===t?Math.floor(n):(+n/100).toFixed(2)},"pay_type":"pay_type","invoice_content":"invoice.content","point":"point","status":function status(e){var t=e.order_status;return Object(h.r)(t)},"orders":function orders(e){var t=e.items;return Object(h.q)(t,{"order_id":"order_id","item_id":"item_id","aftersales_status":"aftersales_status","pic_path":"pic","title":"item_name","delivery_status":"delivery_status","price":function price(e){return(+e.item_fee/100).toFixed(2)},"point":"item_point","num":"num"})}}),a=null,r.auto_cancel_seconds&&(a=this.calcTimer(r.auto_cancel_seconds),this.setState({"timer":a})),o=(r.status||"").toLowerCase(),r.auto_cancel_seconds<=0&&"NOTPAY"===r.order_status_des&&(r.status="TRADE_CLOSED",r.order_status_msg="已取消"),r.status_img="ico_"+("trade_success"===o?"wait_rate":o)+".png",h.n.debug("[trade info] info: ",r),n+="{",Object(i.b)("userinfo")&&(n+='"nickName": "'+Object(i.b)("userinfo").username+'", '),n+='"商品": "'+r.orders[0].title+'"',n+='"订单号": "'+r.orders[0].order_id+'"',n+="}",this.setState({"info":r,"sessionFrom":n});case 18:case"end":return s.stop()}},_callee2,this)}));return function fetch(){return e.apply(this,arguments)}}()},{"key":"handlePay","value":function(){var e=_asyncToGenerator(regeneratorRuntime.mark(function _callee3(){var e,t,n,r,a,o,i,u,d;return regeneratorRuntime.wrap(function _callee3$(p){for(;;)switch(p.prev=p.next){case 0:return e=this.state.info,this.setState({"payLoading":!0}),t=e.tid,n=e.order_type,r={"pay_type":"wxpay","order_id":t,"order_type":n},p.next=6,y.a.cashier.getPayment(r);case 6:return a=p.sent,this.setState({"payLoading":!1}),o=void 0,p.prev=9,p.next=12,Object(s.a)(a);case 12:i=p.sent,h.n.debug("[order pay]: ",i),p.next=20;break;case 16:p.prev=16,p.t0=p.catch(9),o=p.t0,p.t0.errMsg.indexOf("cancel")<0&&Object(l.d)({"title":p.t0.err_desc||p.t0.errMsg||"支付失败","icon":"none"});case 20:if(o){p.next=25;break}return p.next=23,Object(l.d)({"title":"支付成功","icon":"success"});case 23:u=Object(h.h)(this.$router),d=u.fullPath,c.a.redirectTo({"url":d});case 25:case"end":return p.stop()}},_callee3,this,[[9,16]])}));return function handlePay(){return e.apply(this,arguments)}}()},{"key":"handleClickBtn","value":function(){var e=_asyncToGenerator(regeneratorRuntime.mark(function _callee4(e){var t,n,r,a;return regeneratorRuntime.wrap(function _callee4$(o){for(;;)switch(o.prev=o.next){case 0:if(t=this.state.info,"home"!==e){o.next=4;break}return c.a.redirectTo({"url":"/pages/index"}),o.abrupt("return");case 4:if("pay"!==e){o.next=8;break}return o.next=7,this.handlePay();case 7:return o.abrupt("return");case 8:if("cancel"!==e){o.next=11;break}return c.a.navigateTo({"url":"/pages/trade/cancel?order_id="+t.tid}),o.abrupt("return");case 11:if("confirm"!==e){o.next=22;break}return o.next=14,Object(l.c)({"title":"确认收货？","content":""});case 14:if(n=o.sent,!n.confirm){o.next=21;break}return o.next=19,y.a.trade.confirm(t.tid);case 19:r=Object(h.h)(this.$router),a=r.fullPath,c.a.redirectTo({"url":a});case 21:return o.abrupt("return");case 22:case"end":return o.stop()}},_callee4,this)}));return function handleClickBtn(t){return e.apply(this,arguments)}}()},{"key":"handleClickRefund","value":function(){var e=_asyncToGenerator(regeneratorRuntime.mark(function _callee5(e,t){var n;return regeneratorRuntime.wrap(function _callee5$(r){for(;;)switch(r.prev=r.next){case 0:n=this.state.info.tid,"refund"===e?c.a.navigateTo({"url":"/pages/trade/refund?order_id="+n+"&item_id="+t}):"refundDetail"===e&&c.a.navigateTo({"url":"/pages/trade/refund-detail?order_id="+n+"&item_id="+t});case 2:case"end":return r.stop()}},_callee5,this)}));return function handleClickRefund(t,n){return e.apply(this,arguments)}}()},{"key":"render","value":function render(){var e=this.state,t=e.info,n=e.timer,r=e.payLoading;if(!t)return o.l.createElement(_.j,null);var a="dhpoint"===t.pay_type;return o.l.createElement(u.a,{"className":"trade-detail"},o.l.createElement(_.k,{"title":"订单详情","leftIconType":"chevron-left","fixed":"true"}),"WAIT_BUYER_PAY"===t.status&&o.l.createElement(u.a,{"className":Object(h.d)("trade-detail-header","trade-detail-header__waitpay")},o.l.createElement(u.a,null,"该订单将为您保留",o.l.createElement(f.a,{"format":{"hours":":","minutes":":","seconds":""},"hours":n.hh,"minutes":n.mm,"seconds":n.ss,"onTimeUp":this.countDownEnd.bind(this)}),"分钟")),"WAIT_BUYER_PAY"!==t.status&&o.l.createElement(u.a,{"className":Object(h.d)("trade-detail-header")},o.l.createElement(u.a,{"className":"trade-detail-waitdeliver"},o.l.createElement(u.a,null),o.l.createElement(u.a,{"className":"delivery-infos"},o.l.createElement(u.a,{"className":"delivery-infos__status"},o.l.createElement(d.a,{"className":"delivery-infos__text text-status"},t.order_status_msg),o.l.createElement(d.a,{"className":"delivery-infos__text"},"WAIT_SELLER_SEND_GOODS"===t.status?"正在审核订单":null,"WAIT_BUYER_CONFIRM_GOODS"===t.status?"正在派送中":null,"TRADE_CLOSED"===t.status?"订单已取消":null,"TRADE_SUCCESS"===t.status?"物流单号："+t.delivery_code:null))))),o.l.createElement(u.a,{"className":"trade-detail-address","onClick":this.handleClickDelivery.bind(this)},o.l.createElement(u.a,{"className":"address-receive"},o.l.createElement(d.a,null,"收货地址："),o.l.createElement(u.a,{"className":"info-trade"},o.l.createElement(u.a,{"className":"user-info-trade"},o.l.createElement(d.a,null,t.receiver_name),o.l.createElement(d.a,null,t.receiver_mobile)),o.l.createElement(d.a,{"className":"address-detail"},t.receiver_state,t.receiver_city,t.receiver_district,t.receiver_address)))),o.l.createElement(u.a,{"className":"trade-detail-goods"},o.l.createElement(g,{"info":t})),o.l.createElement(u.a,{"className":"trade-money"},"总计：",o.l.createElement(d.a,{"className":"trade-money__num"},"￥",t.item_fee)),o.l.createElement(u.a,{"className":"trade-detail-info"},o.l.createElement(d.a,{"className":"info-text"},"订单号：",t.tid),o.l.createElement(d.a,{"className":"info-text"},"下单时间：",t.created_time_str),t.invoice_content?o.l.createElement(d.a,{"className":"info-text"},"发票信息：",t.invoice_content):null,o.l.createElement(d.a,{"className":"info-text"},"商品金额：￥",t.item_fee),o.l.createElement(d.a,{"className":"info-text"},"运费：￥",t.freight_fee),o.l.createElement(d.a,{"className":"info-text"},"优惠：-￥",t.discount_fee),a?o.l.createElement(d.a,{"className":"info-text","space":!0},"支付：",t.payment," "," 积分支付"):o.l.createElement(d.a,{"className":"info-text","space":!0},"支付：￥",t.payment," "," 微信支付"),t.delivery_code?o.l.createElement(u.a,{"className":"delivery_code_copy"},o.l.createElement(d.a,{"className":"info-text"},"物流单号：",t.delivery_code),o.l.createElement(d.a,{"className":"info-text","onClick":this.handleClickCopy.bind(this,t.delivery_code)},"复制")):null),!a&&"WAIT_BUYER_PAY"===t.status&&o.l.createElement(u.a,{"className":"trade-detail__footer"},o.l.createElement(d.a,{"className":"trade-detail__footer__btn","onClick":this.handleClickBtn.bind(this,"cancel")},"取消订单"),o.l.createElement(m.a,{"className":"trade-detail__footer__btn trade-detail__footer_active","type":"primary","loading":r,"onClick":this.handleClickBtn.bind(this,"pay")},"立即支付")),a&&"WAIT_BUYER_PAY"===t.status&&o.l.createElement(u.a,{"className":"trade-detail__footer"},o.l.createElement(m.a,{"className":"trade-detail__footer__btn trade-detail__footer__btn-inline trade-detail__footer_active","type":"primary","loading":r,"onClick":this.handleClickBtn.bind(this,"pay")},"立即支付")),!a&&"WAIT_SELLER_SEND_GOODS"===t.status&&o.l.createElement(u.a,{"className":"trade-detail__footer"},"PAYED_WAIT_PROCESS"!==t.order_status_des&&o.l.createElement(d.a,{"className":"trade-detail__footer__btn","onClick":this.handleClickBtn.bind(this,"cancel")},"取消订单"),o.l.createElement(d.a,{"className":"trade-detail__footer__btn trade-detail__footer_active "+("PAYED_WAIT_PROCESS"===t.order_status_des?"trade-detail__footer_allWidthBtn":"")+" ","onClick":this.handleClickBtn.bind(this,"home")},"继续购物")),a&&"WAIT_SELLER_SEND_GOODS"===t.status&&o.l.createElement(u.a,{"className":"trade-detail__footer"},o.l.createElement(d.a,{"className":"trade-detail__footer__btn trade-detail__footer__btn-inline trade-detail__footer_active","onClick":this.handleClickBtn.bind(this,"home")},"继续购物")),"WAIT_BUYER_CONFIRM_GOODS"===t.status&&o.l.createElement(u.a,{"className":"trade-detail__footer"},o.l.createElement(d.a,{"className":"trade-detail__footer__btn trade-detail__footer__btn-inline trade-detail__footer_active","onClick":this.handleClickBtn.bind(this,"confirm")},"确认收货")),"TRADE_SUCCESS"===t.status&&o.l.createElement(u.a,{"className":"trade-detail__footer"},o.l.createElement(p.a,{"openType":"contact","className":"trade-detail__footer__btn trade-detail__footer_active trade-detail__footer_allWidthBtn"},"联系客服")),o.l.createElement(_.f,null,o.l.createElement(_.e,{"iconPrefixClass":"icon","icon":"headphones","openType":"contact"})),o.l.createElement(_.t,null))}},{"key":"componentDidMount","value":function componentDidMount(){w(TradeDetail.prototype.__proto__||Object.getPrototypeOf(TradeDetail.prototype),"componentDidMount",this)&&w(TradeDetail.prototype.__proto__||Object.getPrototypeOf(TradeDetail.prototype),"componentDidMount",this).call(this)}},{"key":"componentDidHide","value":function componentDidHide(){w(TradeDetail.prototype.__proto__||Object.getPrototypeOf(TradeDetail.prototype),"componentDidHide",this)&&w(TradeDetail.prototype.__proto__||Object.getPrototypeOf(TradeDetail.prototype),"componentDidHide",this).call(this)}}]),TradeDetail}()}}]);