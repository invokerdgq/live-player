"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),_get=function e(t,r,n){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,r);if(void 0===o){var l=Object.getPrototypeOf(t);return null===l?void 0:e(l,r,n)}if("value"in o)return o.value;var s=o.get;return void 0!==s?s.call(n):void 0},_index=require("../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_index3=require("../../utils/index.js"),_index4=require("../../service/index.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var FormIdCollector=(_temp2=_class=function(e){function s(){var e,t,n;_classCallCheck(this,s);for(var r=arguments.length,o=Array(r),l=0;l<r;l++)o[l]=arguments[l];return(t=n=_possibleConstructorReturn(this,(e=s.__proto__||Object.getPrototypeOf(s)).call.apply(e,[this].concat(o)))).$usedState=["anonymousState__temp","sync","children"],n.handleSubmit=function(e){var t=e.detail.formId,r=n.props.sync;_index4.FormIds.collectFormIds(t,r)},n.$$refs=[],_possibleConstructorReturn(n,t)}return _inherits(s,_index.Component),_createClass(s,[{key:"_constructor",value:function(e){_get(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),"_constructor",this).call(this,e)}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};arguments[2];if(_index2.default.getEnv()===_index2.default.ENV_TYPE.WEAPP)return{children:this.__props.children};var e=(0,_index3.classNames)("form-id-collector","classes");return Object.assign(this.__state,{anonymousState__temp:e}),this.__state}},{key:"funPrivategypHD",value:function(){this.__triggerPropsFn("onClick",[].concat(Array.prototype.slice.call(arguments)))}}]),s}(),_class.properties={sync:{type:null,value:null},children:{type:null,value:null},onClick:{type:null,value:null},__fn_onClick:{type:null,value:null}},_class.$$events=["handleSubmit","funPrivategypHD"],_class.options={addGlobalClass:!0},_class.defaultProps={sync:!1,onClick:function(){}},_class.externalClasses=["classes"],_temp2);exports.default=FormIdCollector,Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(FormIdCollector));