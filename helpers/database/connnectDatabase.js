const mongoose = require("mongoose");

const connectDatabase = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDb Connnection Succesfull");
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = connectDatabase; // server da kullanilacak
