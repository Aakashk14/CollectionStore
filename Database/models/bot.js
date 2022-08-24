const mongoose = require('mongoose')
mongoose.set('debug',true)



const user_subscription = mongoose.Schema({
    Service:String,
    Status:Boolean
})
const user_key = mongoose.Schema({
    user:Number,
    key:String,
    chatid:String,
    Subscription:[user_subscription]
})

const bot_keys= mongoose.model("bot_keys",user_key)


// bot_keys.create({
//     user:3,
//     Subscription:{
//         Service:"fb",
//         Status:true
//     }
// })

// bot_keys.findOneAndUpdate({
//     user:3
// },{$push:{Subscription:{Service:"twitter"}}}).exec()
// bot_keys.findOneAndUpdate({
//     user:3,

// },{$pull:{Subscription:{Service:"twitter"}}}).exec()
module.exports=bot_keys