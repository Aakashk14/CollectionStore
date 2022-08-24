const axios  = require('axios');
const jsdom = require('jsdom')

const {JSDOM} = jsdom


module.exports = async function olx(city,keyword,counter){
var result=[];
    let code = await setup_olx(city)
    return new Promise(resolve=>{
    axios.get(`https://www.olx.in/${city}_g${code}/q-${keyword}?isSearchCall=true`).then((res)=>{
       var dom = new JSDOM(res.data)
       var childnodes = dom.window.document.querySelector(".rl3f9").childElementCount

       for(let i=0;i<childnodes && i<6;i++){
      if(dom.window.document.querySelector(".rl3f9").childNodes[i].querySelector("a")){
       result.push(
           {
               text:dom.window.document.querySelector(".rl3f9").childNodes[i].querySelector("a").querySelector("div.IKo3_").textContent,
               img:dom.window.document.querySelector(".rl3f9").childNodes[i].querySelector("img").getAttribute("src"),

               link:dom.window.document.querySelector(".rl3f9").childNodes[i].querySelector("a").href,
               site:"olx"
      })
    }
}
       resolve(result)
    
}).catch((e)=>{
       console.log(e,"error")
    })
})
}

function setup_olx(city){
return new Promise(resolve=>{
    axios.get(`https://www.olx.in/api/locations/autocomplete?input=${city}&limit=5&lang=en-IN`).then((response)=>{
        resolve(response.data.data.suggestions[0].id)
})

    })

}

