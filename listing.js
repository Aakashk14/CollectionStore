module.exports=function collect(city_olx,city){
    let result=[];

    axios.get(`https://www.olx.in/${city_olx}/q-car?isSearchCall=true`).then((res)=>{
        console.log(res)
    })
}