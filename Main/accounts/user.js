const express = require('express');
const db = require("../../Database/queries/accounts")
const service_db = require("../../Database/queries/services")

const router=express.Router();
const fs = require('fs')


router.get("/home",async(req,res)=>{
    if(req.session.userid){
        let services =await service_db.fetch_services(req.session.myid)

    
    res.render("home.ejs",{services:services})
    }else{
        res.redirect("/")
    }
})
router.get("/",(req,res)=>{
    if(req.session.userid){
        res.redirect("/home")
    }else{
        res.render("index.ejs")
    }

})

router.post("/signup",async(req,res)=>{
if(req.body.email.length==0 || req.body.password.length==0 || req.body.email.indexOf("@")==-1 || req.body.name.length==0){
    res.redirect("/error")
}else{



     await db.create(req.body.name,req.body.email,req.body.password).then((result)=>{
if(result!=0){

       res.redirect("/confirm/confirm")
         res.send("<script>alert('created'); location.href='/?login=1'</script>")
    
     }else{
         res.send("<script>alert('Email exist');location.href='/'</script>")
     }

})
}
})

router.get("/confirm/email",(req,res)=>{

})
router.post("/login",async(req,res,next)=>{


    if(req.body.email.length==0 || req.body.password.length==0 || req.body.email.indexOf("@")==-1){
        res.redirect("/error")
    }else{
        
        //setup_session
        let re = await db.login(req.body.email,req.body.password)
        if(re.length>0){

             req.session.userid=req.body.email
             req.session.myid=re[0].userid;
             req.session.level=re[0].level
             req.session.firstlogin=re[0].firstlogin;
           //  let token =await randpass()
            // req.session.token=token
             req.session.save((err)=>{
        
             res.redirect("/home")
             })
        
         }else{
             res.send("invalid")
         }
        }

    })



    module.exports=router