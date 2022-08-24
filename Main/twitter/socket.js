const fetch_tweets = require('./fetch')
const services_db=require("../../Database/queries/services")
const fs = require('fs')
module.exports=function(io){
    io.use(function(socket,next){
        x_session(socket.request,{},next)


    })
  
    io.on("connection",(socket)=>{

    if(!socket.request.session.userid){

    }else{
    
        socket.on("update tweet",async(data)=>{
            


       })

        
        socket.on("seen",(data)=>{
            services_db.del_service(socket.request.session.myid,data)
            fs.unlink(`./Storage/${socket.request.session.myid}/${data}.json`,(err)=>{
                if(err){}
            })


        })
    }
})
    
}