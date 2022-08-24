const {createServer} = require('http')
const httpclient = createServer()
const telegram_bot= require('node-telegram-bot-api')
const bot_db = require("../Database/queries/bot_queries")
const bot = new telegram_bot("{telegram_key}",{polling:true}) // add your telegram key
const service_db = require("../Database/queries/services")
const fs = require('fs')
const axios = require('axios')

var users={};
var twitter_clients={}


const host="0.0.0.0"
httpclient.listen(5001,host,()=>{
    fs.readFile(`./users.json`,'utf-8',(err,data)=>{
      if(err) {

      }else{

        users=JSON.parse(data);
      }
    
    })
    fs.readFile(`./twitter_clients.json`,'utf-8',(err,data)=>{
        if(err) {
  
        }else{
  
          twitter_clients=JSON.parse(data);
        }
      
      })
})


function twitter_log(user){
    return new Promise(async resolve=>{
let valid = await axios.get(`http://localhost:3001/tel/api/service?user=${user}&service=Twitter`)
if(valid!=-1){
let hashtags = await axios.get(`http://localhost:3001/tel/api/log/twitter?user=${user}`)
//service_db.new_service(users[msg.chat.id],"Twitter")
resolve(hashtags.data)
}else{
    resolve(0)
}
    })
}

async function send_tweets(){

    for(x in twitter_clients){
        if(twitter_clients.hasOwnProperty(x)){

            let hashtags = await axios.get(`http://localhost:3001/tel/api/log/twitter?user=${x}`)
            let data = await axios.get(`http://localhost:3001/tel/api/twitter/fetch?values=${hashtags.data}`)
let user = twitter_clients[x];
            for(x of data.data){
                bot.sendMessage(user,x.tweet)
            }


        }
    }
}

bot.onText(/\/start/,(msg)=>{
    bot.sendMessage(msg.chat.id,"Welcome user")
})

bot.onText(/key(.*)/,async(msg)=>{
    if(users[msg.chat.id]){
        bot.sendMessage(msg.chat.id,"You are already authenticated")
        return
    }
    msg.text = msg.text.split(" ")
    msg.text= msg.text[msg.text.length-1]

    let user = await axios(`http://localhost:3001/tel/api/login?key=${msg.text}&user=${msg.chat.id}`)
    user=user.data.user


  
   if(user!=0){
   users[msg.chat.id]=user;
   let tmp = JSON.stringify(users)
   fs.writeFile(`./users.json`,tmp,(err)=>{
       if(err){}
   })
   bot.sendMessage(msg.chat.id,`Authenticate, For All commands send /Help`)
    }else{
       bot.sendMessage(msg.chat.id,"Invalid key , check website for your key")
   }

    

})
bot.onText(/domain(.*)/,async(msg)=>{

    if(users[msg.chat.id]){
       let result= await service_db.single_service(users[msg.chat.id],"Domains")
       if(result==false){
           fs.readFile(`./Storage/${users[msg.chat.id]}/domains.json`,'utf-8',(err,data)=>{
               bot.sendMessage(msg.chat.id,JSON.parse(data))
           })
           service_db.del_service(users[msg.chat.id],"Domains")
       }else if(result==true){
           bot.sendMessage(msg.chat.id,"Result is not ready")
       }else{
           bot.sendMessage(msg.chat.id,"No Domains service running")
       }


    }

})

//bot.onText(/\/start/,(msg)=>{

bot.onText(/\/twitter active/,async (msg)=>{

    if(twitter_clients[users[msg.chat.id]]){
        res.sendMessage(msg.chat.id,"You already Subscribed")
    }else if(users[msg.chat.id]){

       let hashtag=await twitter_log(users[msg.chat.id])
       twitter_clients[users[msg.chat.id]]=msg.chat.id;
       bot.sendMessage(msg.chat.id,`You are now following hashtags ${hashtag}, You will recieve the new tweets to Stop recieving anytime send /twitter Stop`)
      axios.get(`http://localhost:3000/tel/api/twitter/Subscribe?user=${users[msg.chat.id]}`)
      let tmp = JSON.stringify(twitter_clients)
      fs.writeFile(`./twitter_clients.json`,tmp,(err)=>{
          if(err){}
      })


    }
})

bot.onText(/\/twitter stop/,async(msg)=>{


   await axios.get(`http://localhost:3001/tel/api/twitter/unsubscribe?user=${users[msg.chat.id]}&&service=Twitter`).then((error)=>{
       console.log("got error",error)
   })

    
    
})



setInterval(send_tweets,5000)


bot.on('polling_error',(err)=>{
    if(err) console.log(err)
})

console.log("aa")
