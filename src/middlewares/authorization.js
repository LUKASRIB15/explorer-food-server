const AppError = require("../utils/AppError")

function authorization(allowedRoles){
  return (request, response, next)=>{

    const {role} = request.user

    if(!allowedRoles.includes(role)){
      throw new AppError("Unauthorized", 401)
    }

    return next()
  }
}

module.exports = authorization