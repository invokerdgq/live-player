"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function n(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}}(),_get=function e(t,o,n){null===t&&(t=Function.prototype);var r=Object.getOwnPropertyDescriptor(t,o);if(void 0===r){var a=Object.getPrototypeOf(t);return null===a?void 0:e(a,o,n)}if("value"in r)return r.value;var s=r.get;return void 0!==s?s.call(n):void 0},_index=require("../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_index3=require("../../utils/index.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var BackToTop=(_temp2=_class=function(e){function s(){var e,t,o;_classCallCheck(this,s);for(var n=arguments.length,r=Array(n),a=0;a<n;a++)r[a]=arguments[a];return(t=o=_possibleConstructorReturn(this,(e=s.__proto__||Object.getPrototypeOf(s)).call.apply(e,[this].concat(r)))).$usedState=["anonymousState__temp","anonymousState__temp2","show","bottom"],o.$$refs=[],_possibleConstructorReturn(o,t)}return _inherits(s,_index.Component),_createClass(s,[{key:"_constructor",value:function(e){_get(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),"_constructor",this).call(this,e)}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};arguments[2];var e=this.__props,t=e.show,o=(e.onClick,e.bottom),n=(0,_index3.classNames)("back-to-top",{"is-show":t}),r=(0,_index.internal_inline_style)((0,_index3.styleNames)(o?{bottom:""+_index2.default.pxTransform(o)}:null));return Object.assign(this.__state,{anonymousState__temp:n,anonymousState__temp2:r}),this.__state}},{key:"funPrivatezqEaX",value:function(){this.__triggerPropsFn("onClick",[].concat(Array.prototype.slice.call(arguments)))}}]),s}(),_class.properties={show:{type:null,value:null},onClick:{type:null,value:null},bottom:{type:null,value:null},__fn_onClick:{type:null,value:null}},_class.$$events=["funPrivatezqEaX"],_class.options={addGlobalClass:!0},_class.defaultProps={onClick:function(){}},_temp2);exports.default=BackToTop,Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(BackToTop));