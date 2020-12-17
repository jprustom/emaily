module.exports=
    process.env.NODE_ENV=='production'
    ?require('./secrets-prod.js')
    :require('./secrets-dev.js');