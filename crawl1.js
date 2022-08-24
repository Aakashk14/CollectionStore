const axios  = require('axios');
const jsdom = require('jsdom')

const {JSDOM} = jsdom


module.exports = function crawl1(code){
    axios.get(`https://www.olx.in/${code}/q-car?isSearchCall=true`).then((res)=>{
       var dom = new JSDOM(res.data)
       var childnodes = dom.window.document.querySelector(".rl3f9").childElementCount

       for(let i=0;i<childnodes;i++){
      if(dom.window.document.querySelector(".rl3f9").childNodes[i].querySelector("a")){
      }
       }
    })
}