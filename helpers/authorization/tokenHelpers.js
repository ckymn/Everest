const sendJwtToClient = (user, res) => {
  //Generate JWT
  const token = user.generateJwtFromUser()

  const { JWT_COOKIE, NODE_ENV } = process.env
  return res
    .status(200)
    .cookie('access_token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
      secure: NODE_ENV === 'development' ? false : true
    })
    .json({
      // json Response
      success: true,
      access_token: token,
      data: {
        name: user.name,
        email: user.email
      }
    })
}
// Token yerlestirilimis mi yoksa yerlestirilmemis  kontrolu    
const isTokenIncluded = (req) => {
    return req.headers.authorization && req.headers.authorization.startsWith("Bearer:"); // yapi boyleyse true degilse false
}
// Token Yerlesmis ve Token‘i elde edicez!!!
const getAccessTokenFromHeader = (req) =>{
     const authorization = req.headers.authorization;
     const access_token = authorization.split(" ")[1];
     return access_token;
}
// disari aktarma islemi
module.exports = {
  sendJwtToClient,
  isTokenIncluded,
  getAccessTokenFromHeader
}
