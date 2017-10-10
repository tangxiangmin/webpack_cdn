/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var require = window.require;

// 外部CDN文件
require.config({
    baseUrl: '/',
    paths: {
        jquery: 'https://cdn.bootcss.com/jquery/3.2.1/jquery',
        layer: 'https://cdn.bootcss.com/layer/3.0.3/layer',
        axios: 'http://doufuweb.la/assets/js/lib/axios.min',
        common: 'dist/common'
    },
    shim: {
        layer: {
            deps: ["jquery"],
            exports: "layer"
        }
    }
})

/* harmony default export */ __webpack_exports__["a"] = (require);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__require_config__ = __webpack_require__(0);



define("apiTest", ['axios'], function(axios){

    return {
        index: function(){
            return axios.get("/api.php").then(res=>res.data)
        }
    }

})

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__require_config__ = __webpack_require__(0);



define("blue", ['jquery', 'layer'], function($){

    var blueify = function(el){
        $(el).css("color", "blue");
    }

    var msg = function(el){
        $(el).on("click", function(){
            layer.confirm($(this).text());
        })
    }
    
    return {
        blueify,
        msg
    }    
})


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


var add = function(a, b){
    return a + b;
}
/* harmony default export */ __webpack_exports__["a"] = ({
    add
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__require_config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_math_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_blue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_api__ = __webpack_require__(1);


// console.log(require === window.require); // true

// 外部CDN文件


// 内置需要合并打包的本地文件
// 这种不需要依赖CDN模块



// import red from "./src/red"
// 依赖第三方模块的文件只能通过AMD形式定义模块，
// 这里有点坑，需要记住对应的模块名称



__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__require_config__["a" /* default */])(["common"],function(common){
    var sum = __WEBPACK_IMPORTED_MODULE_1__src_math_js__["a" /* default */].add(1, 2);
    console.log(sum);
})

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__require_config__["a" /* default */])(["blue"], function(blue){
    blue.blueify("#test");
    blue.msg("#test");

    // 假如有多个依赖可以使用嵌套
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__require_config__["a" /* default */])(['apiTest'], function(apiTest){
        apiTest.index().then(res=>{
            console.log(res);
        })
    })
})



/***/ })
/******/ ]);