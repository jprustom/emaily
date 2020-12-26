const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api/auth/google", { target: "http://localhost:4000/" }),
        createProxyMiddleware("/api/auth/user", { target: "http://localhost:4000/" }),
        createProxyMiddleware("/api/auth/logout", { target: "http://localhost:4000/" }),
        createProxyMiddleware("/api/payment/charge", { target: "http://localhost:4000/" }),
        createProxyMiddleware("/api/surveys/thanks", { target: "http://localhost:4000/" }),
        createProxyMiddleware("/api/surveys", { target: "http://localhost:4000/" })
        
    );
};