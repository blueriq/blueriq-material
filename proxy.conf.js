const process = require("process");
const proxyTargetUrl = process.env.BQ_MATERIAL_NG_PROXY_TARGET_URL || "http://localhost:9090";
const PROXY_CONFIG = [
  {
    context: [
      "/server",
    ],
    target: proxyTargetUrl,
    "pathRewrite": {
      "^/server/": "/runtime/server/"
    },
    "secure": false,
    "logLevel": "debug"
  },
  {
    context: [
      "/devtools",
    ],
    target: proxyTargetUrl,
    "pathRewrite": {
      "^/devtools/": "/runtime/server/devtools/"
    },
    "secure": false,
    "logLevel": "debug"
  },
  {
    context: [
      "/runtime",
    ],
    target: proxyTargetUrl,
    "pathRewrite": {
      "^/runtime/([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/)?(server/)?(.*)$": "/runtime/$1server/$3"
    },
    "secure": false,
    "logLevel": "debug"
  },
  {
    context: [
      "/dcm-dashboard"
    ],
    target: proxyTargetUrl,
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
  },
  {
    context: [
      "/event-bus"
    ],
    target: proxyTargetUrl,
    "secure": false,
    "ws": true
  },
];
module.exports = PROXY_CONFIG;
