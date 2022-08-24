const express = require('express')
const app = express()
const {Server} = require('socket.io')
const {createServer} = require('http')
const sv = createServer(app)
const cookieparser = require('cookie-parser')
const io = new Server(sv)
const session =require('express-session')

// const MongoStore = require('connect-mongo')(session);

global.x_session = new session({
    saveUninitialized:false,
    resave:false,
    secret:"abcdef123"
})
app.use(cookieparser())
app.use(x_session)
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use("/static",express.static("public"))
app.use(function(req, res, next) {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
    next();
  })

app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/")
})
app.use(require("./Main/twitter/home"))
app.use(require("./Main/network/home"));
app.use(require("./Main/accounts/user"))
app.use(require("./BotApi/api"))
app.use(require("./Main/price_listing/home"))
app.use(require("./Main/accounts/settings"))
require("./Main/twitter/socket")(io)

const host="0.0.0.0"
sv.listen(3001,host)