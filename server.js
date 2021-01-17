const express = require("express");
const dotenv = require("dotenv");
const router = require("./routers/index"); 
const connectDatabase = require("./helpers/database/connnectDatabase")
const customErrorHandler = require("./middlewares/errors/customErrorHandler")

const app = express();

// --->> Port,Veritabani,Sifre islemlerinde ortak kullanim saglar
dotenv.config({
    path :"./config/env/config.env"
})
// MongoDb Connection Start
connectDatabase();

const PORT = process.env.PORT; 
const NODE_ENV = process.env.NODE_ENV; 

// Express -Body Middleware(kullanici eklemede body‘e gitmesi icin json() middleware kullanmamiz gerekiyor)
app.use(express.json());

// ROUTERS middleware kullanmak (router===index.js)
app.use("/api",router); 

// Kenid Yazdigimiz Error-Handler 
app.use(customErrorHandler);


// server‘í calistimak  
app.listen(PORT, () =>{ 
    console.log(`App Started on ${PORT} : ${NODE_ENV}`)
})