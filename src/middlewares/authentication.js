const Auth = require("../configs/Auth")
const AppError = require("../utils/AppError")
const {verify} = require("jsonwebtoken")

function authentication(request, response, next){
  const authHeader = request.headers

  if(!authHeader.cookie){
    throw new AppError("Token missing", 401)
  }

  const [, token] = authHeader.cookie.split("token=")

  try{
    const {sub: user_id, role} = verify(token, Auth.jwt.secret)

    request.user = {
      user_id,
      role
    }

    return next()
  }catch{
    throw new AppError("Token is invalid!")
  }
}

module.exports = authentication