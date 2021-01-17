//--->> API`mizi res.Json() objesi sekline ceviricez res.send() ifadesinden kurtulucaz

const User = require('../models/User')
const CustomError = require('../helpers/error/CustomError')
const asyncErrorWrapper = require('express-async-handler') //BURDA her async-await isleminde kullanilacak ve try-catch islemi yapmiycaz
const {sendJwtToClient} = require('../helpers/authorization/tokenHelpers');

const register = asyncErrorWrapper(async (req, res, next) => {

  // --- POST DATA ---
  const { name, email, password, role } = req.body

  // burda User once mongoDb de kaydedilecek await ile beklenecek sikinti cikmayinca Yeni kayit donecek
  const user = await User.create({
    name,
    email,
    password, // burda verdigimiz isimler ayni oldugu icin name = name yapmadik
    role
  })
  
  sendJwtToClient(user,res); //jsonwebtoken kullanimi
})


const getUser = (req,res,next) =>{
    res.json({
        success: true,
        data :{
          id: req.user.id,
          name: req.user.name
        }
    })
}
  
module.exports = {
  register,
  getUser
}
