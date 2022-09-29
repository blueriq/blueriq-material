module.exports = PROXY_CONFIG = [
  {
    context: [
      "/runtime"
    ],
    target: "http://localhost:9082",
    "pathRewrite": {
      "^/runtime": "/runtime/server"
    },
    "secure": false
  },
];
