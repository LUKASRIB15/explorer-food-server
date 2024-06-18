const { compare } = require("bcryptjs")
const Auth = require("../configs/Auth")
const { sign } = require("jsonwebtoken")
const AppError = require("../utils/AppError")

class SessionsService{
  sessionsRepository

  constructor(sessionsRepository){
    this.sessionsRepository = sessionsRepository
  }

  async execute({email, password}){
    const user = await this.sessionsRepository.findUser(email)

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

    return {
      token
    }

  }
}

module.exports = SessionsService