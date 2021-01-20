const CustomError = require("../../helpers/error/CustomError");
const jwt = require("jsonwebtoken");
const {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require("../../helpers/authorization/tokenHelpers");

const getAccessToRoute = (req, res, next) => {
  const { JWT_SECRET_KEY } = process.env;
  if (!isTokenIncluded(req)) {
    return next(
      new CustomError("token zamani gecmis veya token olusmamis", 401)
    );
  }

  const accessToken = getAccessTokenFromHeader(req);
  jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      //bir hata varsa token suresi gecmis tir.
      return next(
        new CustomError("token zamani gecmis veya token olusmamis", 401)
      );
    }
    req.user = {
      id: decoded.id,
      name: decoded.name,
    };
    next();
  });
};

module.exports = {
  getAccessToRoute,
};
