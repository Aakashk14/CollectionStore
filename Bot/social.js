const bot_db = require("../Database/queries/bot_queries")
const services_db = require("../Database/queries/services")
const fs = require('fs')


async function bot_domains(){

    let user = await bot_db.bot_events(key)
    return new Promise(async resolve=>{
    if(user!=0){
        let service_status = await services_db.single_service(user,"Domains");
        if(service_status==false){
           fs.readFile(`./Storage/${user}/domains.json`,'utf-8',(err,data)=>{
               resolve(JSON.parse(data))
           })
        }
    }
})
}


module.exports={
    bot_domains:bot_domains
}