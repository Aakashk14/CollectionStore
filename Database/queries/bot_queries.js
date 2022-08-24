
const key_db = require("../models/bot")
const {randpass} = require("../../Main/fn")


function new_telbot(key,chatid){
    return new Promise(resolve=>{
        key_db.find({
            key:key
        },'user').then((data)=>{
    if(data.length!=0){
    key_db.findOneAndUpdate({
        user:data[0].user,
        key:key
    },{chatid:chatid}).exec()
    resolve(data[0].user)
}else {
    resolve(0)

}
    
})
    })
}

function subscribe_service(user,service){
    return new Promise(resolve=>{
        key_db.findOneAndUpdate({
            user:user
        },{$push:{Subscription:{Service:service,Status:false}}}).exec()
resolve(1)
    })
}




function service(user,service){
    return new Promise(resolve=>{
    key_db.find({
        user:user,
        'Subscription.Service':service
    },'Subscription.Service').then((data)=>{
        resolve(data.length>0?data[0]:-1)
    })
})
}

function all_subscriptions(user){
    return new Promise(resolve=>{
        key_db.find({
            user:user
        },'Subscription').then((data)=>{
            console.log("all sub",data)
            resolve(data[0])
        })
    })
}
function new_bot(user){
    return randpass().then((key)=>{
    key_db.create({
        user:user,
        key:key
    })
 

})
}

function tel_subscription(user,service,status){
    key_db.findOneAndUpdate({
        user:user,
        'Subscription.Service':service
    },{'Subscription.$.Status':status}).exec()
}

// s


module.exports={
    new_bot:new_bot,
    new_telbot:new_telbot,
    subscribe_service:subscribe_service,
    service:service,
    all_subscriptions:all_subscriptions,
    tel_subscription:tel_subscription
}