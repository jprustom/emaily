//Require modules
const http=require('http');
const mongoose=require('mongoose');


//Require from other scripts
const {mongoDbURI}=require('./configs/secrets.js');
const app=require('./app.js');

console.log('creating server')
const server=http.createServer(app);
mongoose.connect(mongoDbURI,
    { 
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
        .then(()=>{
            const PORT=process.env.PORT || 3000;
            server.listen(PORT,function(){
                console.log('listening on port '+PORT);
            });
        });
