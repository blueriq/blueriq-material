var process = require("process");
var proxyTargetUrl = process.env.BQ_MATERIAL_NG_PROXY_TARGET_URL || "http://localhost:10080";

var PROXY_CONFIG = [
  {
    context: [
      "/Runtime"
    ],
    target: proxyTargetUrl,
    "pathRewrite": {
      "^/Runtime": "/Runtime/server"
    },
    "secure": false
  },
];
module.exports = PROXY_CONFIG;
