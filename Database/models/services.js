const mongoose = require('mongoose')


const services_schema = mongoose.Schema({
    Name:String,
    Status:Boolean
})

const user_services=mongoose.Schema({
    user:Number,
    services:[services_schema]
})

const user_s = mongoose.model("user_s",user_services,"user_s")



module.exports=user_s