const account_db = require("../models/accounts")
const {seqid,email_token} = require("../../Main/fn")
const services_db=require("../models/services")
const bot_db = require("../queries/bot_queries")

const fs = require('fs')
async function create(name,email,password){

    return new Promise(async resolve=>{
    let userid = await seqid()
    let token = await email_token()
        let tn =new account_db({
            userid:userid,
            Name:name,
            email:email,
            password:password,
            pending:token
        })
        tn.save((err)=>{
            if(err) resolve(0)
        
        })
        resolve(token)
       services_db.create({
           user:id
       })
        fs.mkdir(`./Storage/${id}`,{recursive:true},(err)=>{
            if(err) {}
        })
        bot_db.new_bot(id)
        
    })

}

function login(email,password){
    return new Promise(resolve=>{
        account_db.find({
            email:email,
            password:password
        }).then((result)=>{
            resolve(result.length==0?0:result)
        })
    })
}

function change_password(email,password){
   
        account_db.findOneAndUpdate({
            email:email
        },{password:password}).exec()
    
}
function profile_update(user,name,email){
    return new Promise(resolve=>{
    account_db.findOneAndUpdate({
        user:user
    },{Name:name,email:email}).exec()
    resolve(1)
})
}

module.exports={
    create:create,
    change_password:change_password,
    login:login,
    profile_update:profile_update
}