export default {
  "publicPath": "/static/",
  "proxy": {
    "/api": {
      "target": "http://jsonplaceholder.typicode.com/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
  theme: {
    "primary-color": "#303c5f",
    "success-color": "#303c5f",
    "error-color": "#fa5343"
  }
}
