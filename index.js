const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/Auth');
const postRoute = require('./routes/Photos')
const mongoose = require('mongoose');
const http = require("http");
const socketIo = require("socket.io");


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
app.use("/post",postRoute);

const server = http.createServer(app);

const io = socketIo(server);
app.set('socketio', io);

io.on("connection",(socket) =>{
    console.log("Client connected");
    socket.on("disconnect",()=>{
        console.log("Client disconnected")
    })
})




const port = process.env.PORT || 5000;
server.listen(port,()=>{
    console.log(`Listening on ${port}`);
})