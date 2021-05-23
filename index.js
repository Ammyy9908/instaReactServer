const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/Auth');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json());

// connect to database

mongoose.connect(`mongodb+srv://admin-summit:2146255sb8@cluster0.fyuq8.mongodb.net/InstagramDB`,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log('Database connected');
}).catch(err =>console.log(err));

app.get("/", (req, res) => {
    res.send("API Working");
})
app.use("/auth",authRoute);

const port = 5000;
app.listen(port,()=>{
    console.log(`Listening on ${port}`);
})