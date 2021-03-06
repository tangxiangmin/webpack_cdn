
var path = require("path")

module.exports = {
    entry: {
        // index: path.resolve(__dirname, "./index.js"),
        // common: path.resolve(__dirname, "./lib/common.js"),
        sys: path.resolve(__dirname, "./sysDemo.js"),
    },
    output: {   
        filename: "[name].js",
        path: path.resolve(__dirname, './dist/')
    },
    externals: {    
        systemjs: 'SystemJS',
        jquery: 'jQuery',
        layer: 'layer'
    }

}