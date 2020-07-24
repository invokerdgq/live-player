"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function o(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(t,e,n){return e&&o(t.prototype,e),n&&o(t,n),t}}(),_get=function t(e,n,o){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,n);if(void 0===r){var s=Object.getPrototypeOf(e);return null===s?void 0:t(s,n,o)}if("value"in r)return r.value;var a=r.get;return void 0!==a?a.call(o):void 0},_extends=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},_index=require("../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_index3=require("../../utils/index.js");function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function resolveState(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return _extends({},t,e)}var SpToast=(_temp2=_class=function(t){function a(){var t,e,n;_classCallCheck(this,a);for(var o=arguments.length,r=Array(o),s=0;s<o;s++)r[s]=arguments[s];return(e=n=_possibleConstructorReturn(this,(t=a.__proto__||Object.getPrototypeOf(a)).call.apply(t,[this].concat(r)))).$usedState=["icon","image","status","duration","hasMask","showToast","text","__fn_on"],n.handleShow=function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};"string"==typeof t?e=_extends({},e,{text:t}):(0,_index3.isObject)(t)&&(e=_extends({},e,t)),n.setState(_extends({showToast:!0},e))},n.handleClose=function(){n.setState({showToast:!1})},n.$$refs=[],_possibleConstructorReturn(n,e)}return _inherits(a,_index.Component),_createClass(a,[{key:"_constructor",value:function(t){_get(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"_constructor",this).call(this,t),this.state={showToast:!1,text:""},_index2.default.eventCenter.on("sp-toast:show",this.handleShow),_index2.default.eventCenter.on("sp-toast:close",this.handleClose)}},{key:"componentWillUnmount",value:function(){_index2.default.eventCenter.off("sp-toast:show",this.handleShow),_index2.default.eventCenter.off("sp-toast:close",this.handleClose)}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};arguments[2];var t=this.__state,e=(t.showToast,t.text,resolveState(this.__props,this.__state)),n=e.icon,o=e.image,r=e.status,s=e.duration,a=e.hasMask;return Object.assign(this.__state,{icon:n,image:o,status:r,duration:s,hasMask:a}),this.__state}}]),a}(),_class.properties={__fn_on:{type:null,value:null}},_class.$$events=["handleClose"],_temp2);exports.default=SpToast,Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(SpToast));