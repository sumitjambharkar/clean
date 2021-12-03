const express = require('express')
const mongoose = require('mongoose')
const User = require('./model/User')
const fast2sms = require('fast-two-sms')
require('dotenv').config()
const app = express()
const port = 3001 || process.env.port
app.use(express.json())

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to the Database. Yayzow!");
})
.catch(err => {
    console.log(err);
});
 
app.get('/',(req, res)=>{
  res.send('Hello World')
})

app.post('/user-wifi',async(req,res)=>{
    const wifiUser = await User.create(req.body)
    res.status(200).json(wifiUser)

})
app.post('/user-feedback',async(req,res)=>{
    const feedBack = await User.create(req.body)
    res.status(200).json(feedBack)

})
app.post('/user-send-message',async(req,res)=>{
    try{
        const user = await User.create(req.body)
        const respone = await fast2sms.sendMessage({authorization : process.env.API_KEY , message :req.body.message, numbers : [7021595850]})
        res.status(200).send(respone).json(user)
    }catch(err) {
        console.error(err);
    }

})


app.listen(port,()=>{
    console.log(`http://localhost:${port}`);

})