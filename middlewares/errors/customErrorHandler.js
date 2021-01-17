const CustomError = require("../../helpers/error/CustomError")



// --->> Burda Asenkron Islemlerde Hatalarimizi Kendimiz Yakalamak Zorundayiz (next) ile yapilir....
const customErrorHandler =(err,req,res,next) =>{

    let customError = err;
    console.log(err.name); //bilinmeyen bir hata cikti ise burda  ne oldugu yazilacak

    if (err.name === "SyntaxError") {
        customError = new CustomError("Unexpected Syntax",400)
    }
    if(err.name === "ValidationError"){
        customError = new CustomError(err.message , 400)
    }
    if(err.code === 11000){
        customError = new CustomError("Duplicate Key Found : Check Your Input",400);
    }

    // burdaki response requesti Json‘a cevirip callback yapan bolum
    res
    .status(customError.status || 500)
    .json({
        success: false,
        message: customError.message 
    })
}

module.exports = customErrorHandler;