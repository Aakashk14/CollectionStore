const express = require('express')
const router = express()
const fetch_domains = require("./domains")
const services_db = require("../../Database/queries/services")
const fs = require('fs')


router.get("/services/net",async(req,res)=>{
    let services =await services_db.fetch_services(req.session.myid)


    res.render("network/home.ejs",{services:services})
   

})

router.get("/services/net/d",async(req,res)=>{
    let services =await services_db.fetch_services(req.session.myid)
    let status=await services_db.single_service(req.session.myid,"Domains")
    if(status==-1){
    res.render("network/host.ejs",{pending:-1,services:services})
    }else if(status==false){
        fs.readFile(`./Storage/${req.session.myid}/Domains.json`,'utf-8',(err,result)=>{
            services_db.del_service(req.session.myid,"Domains")
            fs.unlink(`./Storage/${req.session.myid}/Domains.json`,(err)=>{
                if(err){}
            })
        res.render("network/host.ejs",{pending:0,result:result,services:services})
        })
    }else{
        res.render("network/host.ejs",{pending:1,services:services})
    }
})

router.get("/api/d",async(req,res,next)=>{
    let data= await services_db.single_service(req.session.myid,"Domains")
        if(data!=-1){
            res.send("error")
        }else{
next()
        }
    })

router.get("/api/d",async(req,res)=>{

    services_db.new_service(req.session.myid,"Domains",req.query.domain)

    let result = await fetch_domains(req.query.domain,req.session.myid)
    if(result==-1){ res.send("Limit")}else{
    await services_db.service_status(req.session.myid,"Domains") 
    res.send(result==0?"error":result)
    }
})

router.get("/api/d/cancel",async(req,res)=>{
   await services_db.del_service(req.session.myid,"Domains")
    res.send("done")
})
module.exports=router