var process = require("process");
var proxyTargetUrl = process.env.BQ_MATERIAL_NG_PROXY_TARGET_URL || "http://localhost:92";

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

var PROXY_CONFIG_LOCAL_RUNTIME = [
  {
    context: [
      "/"
    ],
    target: "http://localhost:8081",
    "pathRewrite": {
      "^/Runtime": "/server"
    },
    "secure": false
  },
];


module.exports = PROXY_CONFIG;
