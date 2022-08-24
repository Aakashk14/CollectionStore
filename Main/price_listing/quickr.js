const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports=function crawl(city,keyword){
    var result=[];
    return new Promise(resolve=>{
    axios.get(`https://www.quikr.com/${keyword}+all_categories+${city}+qccc0s0002?sx=true`).then((response)=>{
    var dom = new JSDOM(response.data)
   
   let tmp = dom.window.document.querySelector(".qc-ads .mdc-layout-grid__inner").childElementCount
   for(let i=1;i<tmp && i<6;i++){//qc__smart-filters
       if(!dom.window.document.querySelector(".qc-ads .mdc-layout-grid__inner").childNodes[i].querySelector(".qc__sponsored-ad__wrapper") && !dom.window.document.querySelector(".qc-ads .mdc-layout-grid__inner").childNodes[i].querySelector(".qc__smart-filters")){
         
   result.push({
       text:dom.window.document.querySelector(".qc-ads .mdc-layout-grid__inner").childNodes[i].querySelector(".car-info__footer").querySelector("h2").textContent,
       img:dom.window.document.querySelector(".qc-ads .mdc-layout-grid__inner").childNodes[i].querySelector("img").getAttribute("data-src"),
       link:dom.window.document.querySelector(".qc-ads .mdc-layout-grid__inner").childNodes[i].querySelector("a").href,
       site:"quickr"
   })

   }
}
   resolve(result)


})
    })
}


