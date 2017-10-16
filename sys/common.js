import SystemJS from "../systemjs.config"
// 所有页面都会引入的公共脚本

// export default Promise.all(
//     [
//         SystemJS.import("jquery"),
//         SystemJS.import("layer"),
//         SystemJS.import('axios'),
//         SystemJS.import("_"),
//         SystemJS.import("vue"),
//     ]
// );

export default SystemJS.import("jquery").then(res=>{
    return SystemJS.import("layer");
}).then(res=>{
    return SystemJS.import("axios");
}).then(res=>{
    return SystemJS.import("_");
}).then(res=>{
    return SystemJS.import("vue");
})