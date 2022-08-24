const db = require("../Database/models/accounts")
const fs = require('fs')
const db_key = require("../Database/models/bot")
const account_db = require("../Database/models/accounts")




function seqid(){
    
    return new Promise(resolve=>{
    db.find({}).sort({userid:-1}).then((res)=>{
       resolve(res.length==0?1:res[0].userid+1)

    })
})
}

function service_log(user,service,status,details){
    fs.readFile(`./Storage/${user}/log.json`,'utf-8',(err,data)=>{
        if(err){
            let services=[{
                "Name":service,
                "Status":status,
                "Details":details
            }]
          services=  JSON.stringify(services)
          console.log("saving",service)
          fs.writeFile(`./Storage/${user}/log.json`,services,(err)=>{
              if(err){}
          })
        }else{
            let tmp = {
                "Name":service,
                "Status":status,
                "Details":details
            }
            let d = JSON.parse(data);
            d.push(tmp)
            d=JSON.stringify(d)
            fs.writeFile(`./Storage/${user}/log.json`,d,(err)=>{
                if(err){}
            })
            
        }
    })

}
function del_service_log(user,service){
    fs.readFile(`./Storage/${user}/log.json`,(err,data)=>{
       
        let d = JSON.parse(data);

        for(let i=0;i<d.length;i++){
            if(d[i].Name==service){
                d.splice(i,1)
                break;

            }
        }
        d= JSON.stringify(d);
        fs.writeFile(`./Storage/${user}/log.json`,d,(err)=>{
            if(err) console.log(err)
        })
    })
}
function result_log(user,service,result){

result=JSON.stringify(result)
fs.writeFile(`./Storage/${user}/${service}.json`,result,(err)=>{
    if(err) { console.log(err)}
})
}

function randpass(){
    return new Promise(resolve=>{
    var str=""
    var tmp ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"

    for(let i=0;i<4;i++){
        var rand = (Math.random()*60).toString().split(".")
        str=str+tmp[rand[0]]
    }
    db_key.find({
        key:str
    }).then((res)=>{
        if(res.length==0){
            resolve(str)
        }else{
            randpass()
        }
    })
})
}

function email_token(){
    return new Promise(resolve=>{
    var str=""
    var tmp ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"

    for(let i=0;i<4;i++){
        var rand = (Math.random()*60).toString().split(".")
        str=str+tmp[rand[0]]
    }
    if(str!="false"){
    account_db.find({
        pending:str
    }).then((res)=>{
        if(res.length==0){
            resolve(str)
        }else{
            email_token()
        }
    })
}else{
    email_token()
}
})
}
module.exports={
    seqid:seqid,
    service_log:service_log,
    del_service_log:del_service_log,
    result_log:result_log,
    randpass:randpass,
    email_token:email_token
}