const services_db= require("../models/services")
const fn = require("../../Main/fn")
function new_service(user,service,details){
    services_db.findOneAndUpdate({
        user:user
    },{$push:{services:{Name:service,Status:true}}}).exec()
    fn.service_log(user,service,"Running",details)

}



function fetch_services(user){
    return new Promise(resolve=>{
        services_db.find({
            user:user
        }).then((data)=>{
            resolve(data.length>0?data:0)
        })
    })
}

function single_service(user,service){
    return new Promise(resolve=>{
        services_db.find({
            user:user,
            'services.Name':service
        },'services.Status').then((data)=>{
            resolve(data.length>0?data[0].services[0].Status:-1)
        })
    })
}


function service_status(user,service){
    return new Promise(resolve=>{
    services_db.findOneAndUpdate({
        user:user,
        'services.Name':service
    },{'services.$.Status':false}).exec()
    fn.del_service_log(user,service)
    resolve(1)
})
}

function del_service(user,service){
    return new Promise(resolve=>{
    services_db.findOneAndUpdate({
        user:user
    },{$pull:{services:{Name:service}}}).exec()
resolve(1)
})
}


module.exports={
    new_service:new_service,
    fetch_services:fetch_services,
    single_service:single_service,
    service_status:service_status,
    del_service:del_service

}