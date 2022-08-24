const db_account = require("../models/accounts")
const db_bots = require("../models/bot")
const db_services = require("../models/services")


function myprofile(user){
    return new Promise(resolve=>{
db_account.find({
    user:user
}).then((data)=>{
    resolve(data)
})
})
}

function my_keys(user){
    return new Promise(resolve=>{
        db_bots.find({
            user:user
        },'key').then((data)=>{
        
        resolve(data.length>0?data[0].key:0)
    })

})
}
function myservices(user){
    return new Promise(resolve=>{
        db_services.find({
            user:user
        }).then((data)=>{
        resolve(data)
    })
})
}
function unsubscribe(user,service){
    return new Promise(resolve=>{
        db_bots.findOneAndUpdate({
            user:user
        },{$pull:{Subscription:service}}).exec()
        resolve(1)
    })
}

function subscriptions(user){
    return new Promise(resolve=>{
        db_bots.find({
            user:user
        },'Subscription').then((data)=>{
            resolve(data.length >0?data:0)
        })
    })
}




module.exports={
    myprofile:myprofile,
    my_keys:my_keys,
    subscriptions:subscriptions,
    myservices:myservices,
    unsubscribe:unsubscribe
}