const express = require("express");
const dotenv = require("dotenv");
const mainRouter = require("./routers/index");
const connectDatabase = require("./helpers/database/connnectDatabase");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");

const app = express();

//ENV
dotenv.config({
  path: "./config/config.env",
});
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

// DB
connectDatabase();

// Express -Body Middleware(kullanici eklemede body‘e gitmesi icin json() middleware kullanmamiz gerekiyor)
app.use(express.json());

//ROUTER 
app.use("/api", mainRouter);

//ERROR
app.use(customErrorHandler);




app.listen(PORT, () => {
  console.log(`App Started on ${PORT} : ${NODE_ENV}`);
});
