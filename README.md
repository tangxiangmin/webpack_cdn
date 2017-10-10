webpack第三方模块加载
===

## 目标
webpack在提供便利的同时会带来一些新的问题，将所有的工具代码打包到不同的页面文件中，会导致页面脚本体积太大，且不利于缓存。一种解决思路是将很常用的模块（以及整个项目的依赖库文件）放在CDN，通过导入`externals`来使用外部模块，对于那些只在几个页面内公用的模块，可以将他们进行打包。

然而，webpack只是打包工具，对于`externals`的外部模块，不提供对应的模块加载器功能，而手动在页面上导入大量的外部脚本不是一件很合理的事儿。

这里可以把模块分成三类：
* CDN模块，通过AMD外部引入模块
* 纯粹的本地模块，不依赖任何CDN模块，可以使用`ES6`模块或`CommonJS`规范定义
* 依赖于CDN模块的本地模块，需要遵循`AMD`规范

现在在项目中，采用的是手动将CDN模块以`script`标签引入，然后在`externals`声明外部模块。
如何科学地管理第三方模块呢？下面是一点思考。

## 方案一
* 使用`AMD`加载第三方CDN文件
* 使用`webpack`打包本地模块

### 评估
优点：
* 不需要将所有文件都打包，统一管理CDN文件，维护成本更低
* 通过`AMD`，不需要管理外部文件的相互依赖
* 通过webpack进行打包本地模块，不需要使用r.js

缺点：
* 依赖于CDN模块的本地模块，只能遵循`AMD`规范定义，即使用`define`，因此需要准确区分模块的id
* 现有的`Commonjs`迁移到`AMD`模块，工作量比较大，手动迁移容易出问题

### 纯粹的本地模块
```js
// math.js
var add = function(a, b){
    return a + b;
}
export default {
    add
}
```

### 依赖于CDN模块的本地模块

```js
// red.js
// 由于jquery文件是AMD形式加入的，而打包的代码是按脚本插入先后顺序执行的，
// 因此这里会出现 "$ is not a function"的错误

import $ from "jquery";

var redify = function(el){
    $(el).css("color", "red");
}

export default {
    redify
}
```

无法通过下面配置解决
```js
externals: {
    jquery: 'jQuery'
}
```
只能遵循AMD规范
```js
// 引入配置文件
import "../require.config"

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
```
### 打包
除了CDN模块，后面两种类型的模块都需要进行打包，这可以通过`webpack`简单实现

### 使用

建立一个`require.config.js`的配置文件，用于管理所有的外部文件
```js
var require = window.require;

// 外部CDN文件
require.config({
    baseUrl: '/',
    paths: {
        jquery: 'https://cdn.bootcss.com/jquery/3.2.1/jquery',
        layer: 'https://cdn.bootcss.com/layer/3.0.3/layer',
        axios: 'http://doufuweb.la/assets/js/lib/axios.min'
    },
    shim: {
        layer: {
            deps: ["jquery"],
            exports: "layer"
        }
    }
})

export default require;
```

每个页面都对应一个入口文件，这个入口文件是通过`webpack`输出的
```html
<script src="./src/require.js" data-main='/dist/index'></script>
```

在对应的入口文件源文件中，引入本地模块

```js
import require from "./require.config"

import math from "./src/math.js"
import "./src/blue"

require([],function(){
    var sum = math.add(1, 2);
    console.log(sum);
})

require(["blue"], function(blue){
    blue.blueify("#test");
    blue.msg("#test");
})
```
在`webpack.config.js`中，为每个页面配置对应的输入和输出
```js
var path = require("path")

module.exports = {
    entry: {
        // 多个页面导入即可
        index: path.resolve(__dirname, "./index.js")
    },
    output: {   
        filename: "[name].js",
        path: path.resolve(__dirname, './dist/')
    },
    externals: {
        jquery: 'jQuery'
    }
}
```


### 疑问
为什么webpack没有提供类似的功能，即在加载`externals`的时候，如果没有找到全局变量，则通过AMD加载对应的文件~

webpack内置了`require`和`define`的方法，但是不能指定url，这样就无法实现上面的功能。正在重新翻文档，希望一切顺利。

然后找到了方案二。


## 方案二
通过`SystemJS`与`externals`。

### 思路
回到`webpack`，之所以我们需要在页面中手动引入脚本，是因为`externals`需要获取对应模块的全局变量，然后才能在其他模块中使用。其实现类似于
```js
module.exports = window.jQuery;
```

换个思路，只要在执行`webpack`的加载对应，内存中存在对应的全局变量即可，这并不需要我们手动去在页面上添加链接，也就是说，我们只需要一个脚本加载器，可以在对应的依赖脚本加载完毕之后再执行我们的本地模块即可。之前把事情想得太复杂了。

然后发现了[SystemJS](https://www.npmjs.com/package/systemjs)， 这是一款用来加载脚本的插件，对应的浏览器版本提供了与`requirejs`的`load`类似的异步加载功能。

没错，就是你了。

### 使用方式
对着文档，跟`requirejs`的模块加载方式比较类似，

同样先定义一个配置文件，参考[配置参数文档](https://github.com/systemjs/systemjs/blob/aa6d18cfac1c4c1fcd3abe23d3353853edbdadf8/docs/config-api.md)
```js
import SystemJS from "systemjs"

SystemJS.config({
    map: {
        // jquery: "//code.jquery.com/jquery.js",
        jquery: "//imgdh.doufu.la/jquery/jquery-3.2.1.min.js"
    }
})

export default SystemJS
```
然后在对应的页面文件上按需引入
```js
import SystemJS from "./systemjs.config"

// 测试加载时间
console.time("sc");
SystemJS.import('jquery').then($=>{
    console.timeEnd("sc")
    console.log("this is index");

    // 这里使用对应的逻辑
    console.log($);
})
```

### 评估

优点：
* 由于只是在执行`externals`之前控制脚本加载，对具体的模块基本没有影响，因此迁移成本低
* 每个页面文件手动`SystemJS.import`依赖文件，按需加载，方便维护

缺点：
* ES6的`import`和`export`只能出现在`top level`即最上层，因此本地的模块如果依赖CDN模块，需要使用`CommonJS`的方式定义和使用
* 需要通过维护`SystemJS.config`和`externals`两个地方的模块声明

总体来说要比方案一的迁移成本低得多。
## 最后

最后决定采用**方案二**，这样，貌似解决了困扰我很久的一个问题~