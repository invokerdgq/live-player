"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _extends=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},_index=require("../npm/redux-create-reducer/index.js");function _defineProperty(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var initState={land_params:null},user=(0,_index.createReducer)(initState,_defineProperty({},"user/landing",function(e,r){var t=r.payload;return _extends({},e,{land_params:t})}));exports.default=user;