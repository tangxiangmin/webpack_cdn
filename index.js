

// console.log(require === window.require); // true

// 外部CDN文件
import require from "./require.config"

// 内置需要合并打包的本地文件
// 这种不需要依赖CDN模块
import math from "./src/math.js"


// import red from "./src/red"
// 依赖第三方模块的文件只能通过AMD形式定义模块，
// 这里有点坑，需要记住对应的模块名称
import "./src/blue"
import "./src/api"

require(["common"],function(common){
    var sum = math.add(1, 2);
    console.log(sum);
})

require(["blue"], function(blue){
    blue.blueify("#test");
    blue.msg("#test");

    // 假如有多个依赖可以使用嵌套
    require(['apiTest'], function(apiTest){
        apiTest.index().then(res=>{
            console.log(res);
        })
    })
})

