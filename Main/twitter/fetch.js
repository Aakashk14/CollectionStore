const axios = require('axios');


module.exports= function collect(values){

    let result=[];
return new Promise(async resolve=>{
    for(x of values.split(",")){
        x="%23"+x;


let response = await axios.get(`https://api.twitter.com/2/tweets/search/recent?query=${x}`,{
    headers:{ 
        Authorization:''  // add your twitter api key


    }
})

for(x of response.data.data){
    result.push({
        id:x.id,
        tweet:x.text
    })
    if(result.length==6){
        break;
    }
}

    }

    resolve(result)
})
}




