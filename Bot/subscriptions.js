
function running_t(user){
    return new Promise(resolve=>{

fs.readFile(`./Storage/${user}/twitter_config.json`,'utf-8',async(err,data)=>{

    data=JSON.parse(data);
   let result = await fetch_tweets(data)
   resolve(result)

    
})
})
}

module.exports={
    running_t:running_t
}