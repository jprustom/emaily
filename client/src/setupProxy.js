const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/auth/google", { target: "http://localhost:4000/" }),
        createProxyMiddleware("/auth/user", { target: "http://localhost:4000/" }),
        createProxyMiddleware("/auth/logout", { target: "http://localhost:4000/" }),
        createProxyMiddleware("/payment/charge", { target: "http://localhost:4000/" })
    );
};