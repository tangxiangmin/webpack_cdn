

import SystemJS from "systemjs"


SystemJS.config({

    map: {
        jquery: "https://cdn.bootcss.com/jquery/3.2.1/jquery.js",
        layer: 'https://cdn.bootcss.com/layer/3.0.3/layer.js',
        axios: 'https://cdn.bootcss.com/axios/0.16.2/axios.js',
        _: 'https://cdn.bootcss.com/underscore.js/1.8.3/underscore.js',
        vue: 'https://cdn.bootcss.com/vue/2.4.4/vue.js'
    },
    depCache: {
        // layer: ['jquery']
    }

})

export default SystemJS