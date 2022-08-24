const {createServer} = require('http')
const httpclient = createServer()
const telegram_bot= require('node-telegram-bot-api')

const bot = new telegram_bot("{key}",{polling:true})


bot.on('message',(msg)=>{
    if(msg.text=='/start'){
        bot.sendMessage(msg.chat.id,'pong!')
    }
})

const host="0.0.0.0"
httpclient.listen(3000,host)
