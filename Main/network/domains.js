const {exec, execFile} = require('child_process');
const services_db= require("../../Database/queries/services")
const fn = require("../../Main/fn")

var network_limit=0;

module.exports=function fetch_domains(domain,user){
return new Promise(resolve=>{

if(network_limit ==10){
reset()
resolve(-1)

}
network_limit++;
execFile(`subfinder`,['-d',domain],(err,stdout,stderr)=>{
    
services_db.service_status(user,"Domains")
    let result = stdout.split("\n")
    if(stdout.length!=0){
    fn.result_log(user,"Domains",result)
    
    resolve(result)
    }else{
        resolve(0)
    }
})
})
}

function reset(){
    setTimeout(() => {
        
        network_limit=0;
    }, 1800000);
}