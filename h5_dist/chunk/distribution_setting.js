(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{"694":function(e,t,n){},"791":function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return p});var i=n(3),o=n(4),r=n(747),a=n(376),l=n(371),s=n(15),c=(n(694),function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}()),u=function get(e,t,n){null===e&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(void 0===i){var o=Object.getPrototypeOf(e);return null===o?void 0:get(o,t,n)}if("value"in i)return i.value;var r=i.get;return void 0!==r?r.call(n):void 0};var p=function(e){function DistributionSetting(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,DistributionSetting);var t=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(DistributionSetting.__proto__||Object.getPrototypeOf(DistributionSetting)).call(this,e));return t.handleChange=function(e){t.setState({"shop_name":e})},t.handleClick=function(){var e=t.state,n=e.isEdit,i=e.shop_name;t.setState({"isEdit":!n}),n&&s.a.distribution.update({"shop_name":i})},t.state={"info":{},"shop_name":"","isEdit":!1},t}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(DistributionSetting,o["a"].Component),c(DistributionSetting,[{"key":"componentDidMount","value":function componentDidMount(){this.fetch()}},{"key":"fetch","value":function(){var e=function _asyncToGenerator(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function step(i,o){try{var r=t[i](o),a=r.value}catch(e){return void n(e)}if(!r.done)return Promise.resolve(a).then(function(e){step("next",e)},function(e){step("throw",e)});e(a)}("next")})}}(regeneratorRuntime.mark(function _callee(){var e,t,n,i,o,r,a;return regeneratorRuntime.wrap(function _callee$(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,s.a.distribution.info();case 2:e=l.sent,t=e.parent_info,n=void 0===t?null:t,i=e.bind_date,o=e.mobile,r=e.shop_name,a=void 0===r?"":r,this.setState({"info":{"parent_info":n,"bind_date":i,"mobile":o},"shop_name":a});case 5:case"end":return l.stop()}},_callee,this)}));return function fetch(){return e.apply(this,arguments)}}()},{"key":"render","value":function render(){var e=this.state,t=e.info,n=e.shop_name,o=e.isEdit;return i.l.createElement(r.a,{"className":"page-distribution-setting"},i.l.createElement(r.a,{"className":"content-padded"},"会员资料"),i.l.createElement(r.a,{"className":"section"},i.l.createElement(r.a,{"className":"list"},i.l.createElement(r.a,{"className":"list-item"},i.l.createElement(r.a,{"className":"label"},"推荐人"),i.l.createElement(r.a,{"className":"list-item-txt text-right"},t.parent_info?i.l.createElement(a.a,null,t.parent_info.username,"(",t.parent_info.mobile,")"):i.l.createElement(a.a,null,"--"))),i.l.createElement(r.a,{"className":"list-item"},i.l.createElement(r.a,{"className":"label"},"注册时间"),i.l.createElement(r.a,{"className":"list-item-txt text-right"},t.bind_date)),i.l.createElement(r.a,{"className":"list-item"},i.l.createElement(r.a,{"className":"label"},"手机号"),i.l.createElement(r.a,{"className":"list-item-txt text-right"},t.mobile?i.l.createElement(a.a,null,t.mobile):i.l.createElement(a.a,null,"--"))))),i.l.createElement(r.a,{"className":"content-padded"},"店铺资料"),i.l.createElement(r.a,{"className":"section"},i.l.createElement(r.a,{"className":"list"},i.l.createElement(r.a,{"className":"list-item"},i.l.createElement(r.a,{"className":"input-content"},i.l.createElement(l.a,{"title":"小店名称","disabled":!o,"placeholder":"请为你的小店设置名字","onChange":this.handleChange.bind(this),"value":n})),i.l.createElement(r.a,{"className":"input-edit","onClick":this.handleClick.bind(this)},o?"保存":"修改")))))}},{"key":"componentDidShow","value":function componentDidShow(){u(DistributionSetting.prototype.__proto__||Object.getPrototypeOf(DistributionSetting.prototype),"componentDidShow",this)&&u(DistributionSetting.prototype.__proto__||Object.getPrototypeOf(DistributionSetting.prototype),"componentDidShow",this).call(this)}},{"key":"componentDidHide","value":function componentDidHide(){u(DistributionSetting.prototype.__proto__||Object.getPrototypeOf(DistributionSetting.prototype),"componentDidHide",this)&&u(DistributionSetting.prototype.__proto__||Object.getPrototypeOf(DistributionSetting.prototype),"componentDidHide",this).call(this)}}]),DistributionSetting}()}}]);