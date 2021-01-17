// --->> Burda MonogoDb veritabanina baglanti islemeri yapilir
const mongoose = require("mongoose");

const connectDatabase = () =>{ // helperFunctions
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify:false,
        useCreateIndex:true,
        useUnifiedTopology:true

    }) // Veritabanin baglanma Asamasinda Promise dondericek
    .then(() => {
        console.log('MongoDb Connnection Succesfull')
    }).catch((err) => { 
        console.error(err)
    });
} 

module.exports = connectDatabase; // server da kullanilacak 