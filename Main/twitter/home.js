const express = require('express')
const fetch_tweets = require("./fetch")
const service_db = require("../../Database/queries/services")
const fs = require('fs')
const bot_queries = require('../../Database/queries/bot_queries')
const twitter_clients=JSON.parse(fs.readFileSync(`./Storage/clients.json`))
const router = express()

router.get("/services/t",async(req,res,next)=>{
  
  let services =await service_db.fetch_services(req.session.myid)

 if(twitter_clients[req.session.myid]){
  
  fs.readFile(`./Storage/${req.session.myid}/twitter_config.json`,'utf-8',async(err,data)=>{
    req.session.twitter=data
    req.session.save()
    let tweets= await fetch_tweets(data)
    res.render("twitter/tweet.ejs",{tweets:tweets,services:services})
  })

 }else{

  

    res.render("twitter/tweet.ejs",{services:services,tweets:0})
 }
})



router.get("/api/t/",async(req,res)=>{
  let result= await fetch_tweets(req.query.data)

//  req.session.twitter=req.query.data
  req.session.save((err)=>{
    if(err){}
    res.send(result)
  })

})

router.post("/api/t/activate",async(req,res)=>{
  let status = await bot_queries.service(req.session.myid,"Twitter")
  if(status==-1){
  let tmp = JSON.stringify(req.body.data)
  fs.writeFile(`./Storage/${req.session.myid}/twitter_config.json`,tmp,(err)=>{
    if(err) {}
  }

  )
  await bot_queries.subscribe_service(req.session.myid,"Twitter")
  twitter_clients[req.session.myid]=[];
  twitter_clients[req.session.myid].push("Twitter")
  save_clients(twitter_clients)
   service_db.new_service(req.session.myid,"Twitter")
  res.send("done")
  }else{
    res.send("error")
  }
})


function save_clients(clients){

  let tmp=JSON.stringify(clients)
  fs.writeFile(`./Storage/clients.json`,tmp,(err)=>
  {
    if(err){}
  })

}

module.exports=router;