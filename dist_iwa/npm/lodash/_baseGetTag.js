var Symbol=require("./_Symbol.js"),getRawTag=require("./_getRawTag.js"),objectToString=require("./_objectToString.js"),nullTag="[object Null]",undefinedTag="[object Undefined]",symToStringTag=Symbol?Symbol.toStringTag:void 0;function baseGetTag(e){return null==e?void 0===e?undefinedTag:nullTag:symToStringTag&&symToStringTag in Object(e)?getRawTag(e):objectToString(e)}module.exports=baseGetTag;