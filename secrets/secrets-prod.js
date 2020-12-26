module.exports={
    googleClientSecret:process.env.GOOGLE_CLIENT_SECRET,
    googleClientID:process.env.GOOGLE_CLIENT_ID,
    mongoDbURI:process.env.MONGODB_URI,
    cookieKey:process.env.COOKIE_KEY,
    tapSecretKey:process.env.TAP_SECRET_KEY || 'sk_test_MfpFv1ruqAojDtgK3ziXnh46',
    sendGridKey:process.env.SEND_GRID_KEY
}
