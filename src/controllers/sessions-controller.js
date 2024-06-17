const { compare } = require("bcryptjs")
const Auth = require("../configs/Auth")
const knex= require("../database/knex")
const { sign } = require("jsonwebtoken")

class SessionsController {
  async create(request, response){
    const {email, password} = request.body

    const user = await knex("user").where({email}).first()

    if(!user){
      throw new AppError("Incorrect email and/or password")
    }

    const passwordMatched = await compare(password, user.password)

    if(!passwordMatched){
      throw new AppError("Incorrect email and/or password")
    }

    const {secret, expiresIn} = Auth.jwt

    if(!secret){
      throw new AppError("Impossible to generate token. AUTH_SECRET is undefined")
    }

    const token = sign({role: user.role}, secret, {
      subject: String(user.id),
      expiresIn
    })

    response.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 15 * 60 * 1000 // 15 minutes
    })

    return response.json()
    
  }
}

module.exports = SessionsController