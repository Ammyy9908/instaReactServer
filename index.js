const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/Auth');
const mongoose = require('mongoose');
const http = require("http");
const socketIo = require("socket.io");
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json({limit:'50mb'}))

// connect to database
//local//mongodb://127.0.0.1:27017
//host:mongodb+srv://admin-summit:2146255sb8@cluster0.fyuq8.mongodb.net
mongoose.connect(`mongodb+srv://admin-summit:2146255sb8@cluster0.fyuq8.mongodb.net/InstagramDB`,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log('Database connected');
}).catch(err =>console.log(err));

app.get("/", (req, res) => {
    res.send("API Working");
})
app.use("/auth",authRoute);

const server = http.createServer(app);

const io = socketIo(server);



io.on("connection",(socket)=>{
    console.log("connection established!");

    

   socket.on("user",async (user)=>{
       

       const {email,time} = await user;
       console.log("Incoming data",email,time);
       const client = await User.findOne({email: email});
       console.log(client);

       if(client){
           const updateduser = await User.updateOne({email:email},{Online:{status:true,timestamp:time}});
           if(updateduser){
               console.log("User Status Updated");
           }
       }

   })

    socket.on("disconnect",(data)=>{
        console.log(data);
        console.log("connection closed")
    })
})



const port = process.env.PORT || 5000;
server.listen(port,()=>{
    console.log(`Listening on ${port}`);
})