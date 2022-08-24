const express = require('express')

const router = express()

clients={};
const olx = require("./olx")
const quickr = require("./quickr")

router.post("/s/listing/search",async (req,res)=>{
let counter=6;
let olx_data = await olx(req.body.city,req.body.keyword,counter)
let quickr_data= await quickr(req.body.city,req.body.keyword)



let result=olx_data.concat(quickr_data)
res.send(result)
})

router.get("/public/services/listing",(req,res)=>{
    if(clients[req.ip]==3){
        res.send("error")
    }else{
    clients[req.ip]=clients[req.ip]?1:clients[req.ip]++;
    }


    res.render("listing/home.ejs")
})

module.exports=router;