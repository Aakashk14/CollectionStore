const express = require('express')

const router = express.Router()

const settings_db = require("../../Database/queries/settings")
const bot_db = require("../../Database/queries/bot_queries")
const account_db=require("../../Database/queries/accounts")
const service_db=require("../../Database/queries/services")
router.get("/my/settings",async(req,res)=>{
    let user = await settings_db.myprofile(req.session.myid)
    let keys = await settings_db.my_keys(req.session.myid)
   let services =await service_db.fetch_services(req.session.myid)
  let subscriptions = await bot_db.all_subscriptions(req.session.myid)

    res.render("settings.ejs",{user:user,keys:keys,subscriptions:subscriptions,services:services})
})

//settings api


router.post("/api/my/password",async(req,res)=>{
    let access = account_db.login(req.session.userid,req.body.old)
    if(access!=0){
        account_db.change_password(req.session.userid,req.body.new)
        res.json({"success":true})
    }else{
        res.send({"success":false})
    }
})

router.post("/update/profile",async(req,res)=>{
await account_db.profile_update(req.session.myid,req.body.name,req.body.email).then((data)=>{
    res.redirect("/settings")
})
})

router.post("/api/t/events/stop",async(req,res)=>{

    
    await settings_db.unsubscribe(user,service)
    res.send("done")

})

router.get("/my/subscriptions",async(req,res)=>{
let result = await settings_db.subscriptions(req.session.myid)

res.send(result==0?"error":result[0].Subscription)
})



module.exports=router;