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

export default require;