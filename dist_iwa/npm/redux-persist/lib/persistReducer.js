"use strict";exports.__esModule=!0;var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i])}return e};exports.default=persistReducer;var _constants=require("./constants.js"),_autoMergeLevel=require("./stateReconciler/autoMergeLevel1.js"),_autoMergeLevel2=_interopRequireDefault(_autoMergeLevel),_createPersistoid=require("./createPersistoid.js"),_createPersistoid2=_interopRequireDefault(_createPersistoid),_getStoredState=require("./getStoredState.js"),_getStoredState2=_interopRequireDefault(_getStoredState),_purgeStoredState=require("./purgeStoredState.js"),_purgeStoredState2=_interopRequireDefault(_purgeStoredState);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _objectWithoutProperties(e,t){var r={};for(var i in e)0<=t.indexOf(i)||Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=e[i]);return r}var DEFAULT_TIMEOUT=5e3;function persistReducer(c,f){var l=void 0!==c.version?c.version:_constants.DEFAULT_VERSION,v=(c.debug,void 0===c.stateReconciler?_autoMergeLevel2.default:c.stateReconciler),S=c.getStoredState||_getStoredState2.default,y=void 0!==c.timeout?c.timeout:DEFAULT_TIMEOUT,g=null,h=!1,R=!0,x=function(e){return e._persist.rehydrated&&g&&!R&&g.update(e),e};return function(e,r){var t=e||{},i=t._persist,s=_objectWithoutProperties(t,["_persist"]);if(r.type===_constants.PERSIST){var n=!1,o=function(e,t){n||(r.rehydrate(c.key,e,t),n=!0)};if(y&&setTimeout(function(){!n&&o(void 0,new Error('redux-persist: persist timed out for persist key "'+c.key+'"'))},y),R=!1,g||(g=(0,_createPersistoid2.default)(c)),i)return e;if("function"!=typeof r.rehydrate||"function"!=typeof r.register)throw new Error("redux-persist: either rehydrate or register is not a function on the PERSIST action. This can happen if the action is being replayed. This is an unexplored use case, please open an issue and we will figure out a resolution.");return r.register(c.key),S(c).then(function(e){(c.migrate||function(e,t){return Promise.resolve(e)})(e,l).then(function(e){o(e)},function(e){o(void 0,e)})},function(e){o(void 0,e)}),_extends({},f(s,r),{_persist:{version:l,rehydrated:!1}})}if(r.type===_constants.PURGE)return h=!0,r.result((0,_purgeStoredState2.default)(c)),_extends({},f(s,r),{_persist:i});if(r.type===_constants.FLUSH)return r.result(g&&g.flush()),_extends({},f(s,r),{_persist:i});if(r.type===_constants.PAUSE)R=!0;else if(r.type===_constants.REHYDRATE){if(h)return _extends({},s,{_persist:_extends({},i,{rehydrated:!0})});if(r.key===c.key){var u=f(s,r),a=r.payload,d=!1!==v&&void 0!==a?v(a,e,u,c):u,_=_extends({},d,{_persist:_extends({},i,{rehydrated:!0})});return x(_)}}if(!i)return f(e,r);var p=f(s,r);return p===s?e:(p._persist=i,x(p))}}