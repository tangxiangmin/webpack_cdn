import requirejs from "requirejs"

requirejs.config({
    baseUrl: '/',
    paths: {
        jquery: '//cdn.bootcss.com/jquery/3.2.1/jquery',
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

define("math", [], function(){
    return {
        test(){
            console.log("this is test");
        }
    }
})


requirejs(["jquery", "math"], function($){
    $("#test").text("Hello this is jquery");


    var math = requirejs('math');
    math.test();
    
})