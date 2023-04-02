const rateLimit = require('express-rate-limit')
const {logEvents} = require('./logger');

const loginLimiter = rateLimit({
    windowMS :60*1000,
    max:5,
    message:{
        message:'Too many attempts from this IP,please try again after some time'
    },
    handler:(req,res,next,options) =>{
        console.log(options)
        logEvents(`Too Many Requests: ${options.message.message}\t\t ${req.method}\t\t ${req.url} \t ${req.headers.origin}`,'errLog.log')
        res.send(options.message)
    },
    standardHeaders: true,
    legacyHeaders:false,
})
module.exports = loginLimiter