
// 内置插件使用cdn变量

// 由于jquery文件是AMD形式加入的，而打包的代码是按脚本插入先后顺序执行的，因此这里会出现 "$ is not a function"的错误

import $ from "jquery";
// var $ = window.jQuery;

var redify = function(el){
    $(el).css("color", "red");
}

export default {
    redify
}
