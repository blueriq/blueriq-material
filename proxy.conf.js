var process = require("process");
var proxyTargetUrl = process.env.BQ_MATERIAL_NG_PROXY_TARGET_URL || "http://localhost:8080";

var PROXY_CONFIG = [
  {
    context: [
      "/runtime"
    ],
    target: proxyTargetUrl,
    "pathRewrite": {
      "^/runtime": "/runtime/server"
    },
    "secure": false
  }
];
module.exports = PROXY_CONFIG;
