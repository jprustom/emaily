module.exports={
    secrets:require('./secrets'),
    domain:process.env.NODE_ENV=='production'
        ?'https://damp-plains-08828.herokuapp.com'
        :'http://localhost:3000',
    tapChargeApiEndpoint:'https://api.tap.company/v2/charges',

}