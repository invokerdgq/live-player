"use strict";var isSymbol=require("./is-symbol.js");module.exports=function(r){if(!isSymbol(r))throw new TypeError(r+" is not a symbol");return r};