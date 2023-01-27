const process = require("process");
const proxyTargetUrl = process.env.BQ_MATERIAL_NG_PROXY_TARGET_URL || "http://localhost:9090";
const PROXY_CONFIG = [
  {
    context: [
      "/runtime",
    ],
    target: proxyTargetUrl,
    "pathRewrite": {
      "^/runtime/(.*?)/": "/runtime/$1/server/"
    },
    "secure": false,
    "logLevel": "debug"
  },
  {
    context: [
      "/dashboards"
    ],
    target: proxyTargetUrl,
    "pathRewrite": {
      "^/dashboards": ""
    },
    "secure": false,
    "logLevel": "debug"
  },
  {
    context: [
      "/auth"
    ],
    target: proxyTargetUrl,
    "pathRewrite": {
      "^/auth": ""
    },
    "secure": false,
    "logLevel": "debug"
  },
  {
    context: [
      "/realms",
      "/resources",
      "/login",
      "/logout",
      "/oauth2",
      "/gateway"
    ],
    target: proxyTargetUrl,
    "secure": false,
    "logLevel": "debug"
  }
];
module.exports = PROXY_CONFIG;
