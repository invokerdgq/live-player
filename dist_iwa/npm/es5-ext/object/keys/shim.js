"use strict";var isValue=require("../is-value.js"),keys=Object.keys;module.exports=function(e){return keys(isValue(e)?Object(e):e)};