const allowOrigin = require('./allowedOrigin');

const corsOptions = {
    origin :(origin,callback) =>{
        if(allowOrigin.indexOf(origin) !== -1 || !origin){
            callback(null,true)
        }else{
            callback(new Error ('Not allowed by CORS'))
        } 
    },
    Credential:true,
    optionsSuccessStatus : 200
}
module.exports = corsOptions;
