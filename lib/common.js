// 这个一个所有页面公共的脚本文件
// 开发期间位于本地，后续可能会迁移到CDN
// 使用requirejs可以轻松完成路径替换


import "../require.config"

define("common", ["jquery"], function($){
    console.log($);
})