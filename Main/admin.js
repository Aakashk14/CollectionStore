const admin_db = require("../Database/queries/admin")


async function islimit(){
    

    let limit = await admin_db.total_active();
    return new Promise(resolve=>{

    if(limit <8){
        resolve(0)
    }else{
        resolve(1)
    }

})
}

module.exports=islimit;