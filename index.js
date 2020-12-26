//Require modules
const http=require('http');
const mongoose=require('mongoose');


//Require from other scripts
const {secrets}=require('./configs.js');
const {mongoDbURI}=secrets;
const app=require('./app.js');


const server=http.createServer(app);
mongoose.connect(mongoDbURI,
    { 
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
        .then(()=>{
            const PORT=process.env.PORT || 4000;
            server.listen(PORT,function(){
                console.log('listening on port '+PORT);
            });
        });
