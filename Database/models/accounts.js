const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/datasource',{autoIndex:true})



const account_schema = new mongoose.Schema({
    userid:Number,
    Name:String,
    email:{type:String,unique:true},
    password:String,
    pending:String,
})


const accounts_model = mongoose.model("accounts",account_schema)


accounts_model.on('index',function(err){
    if(err){
        console.log('err'.err)
    }else{
        console.log("done")
    }
})
module.exports=accounts_model