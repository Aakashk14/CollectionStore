const services = require("../models/services")


function total_active(){
   return(services.find({
        'services.Status':true
    }))
}

module.exports={
    total_active:total_active
}