//--->> API`mizi res.Json() objesi sekline ceviricez res.send() ifadesinden kurtulucaz
const getAllQuestions = (req,res,next) =>{
   
    res
    .status(200)
    .json({
        success : true
    })
}

module.exports = {
    getAllQuestions
}