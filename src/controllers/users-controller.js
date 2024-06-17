const { sign } = require("jsonwebtoken")
const Auth = require("../configs/Auth")
const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const {hash} = require("bcryptjs")

class UsersController {
  async create(request, response){
    const {name, email, password} = request.body

    const checkUserExists = await knex("user").where({email}).first()

    if(checkUserExists){
      throw new AppError("User already exists")
    }

    const hashedPassword = await hash(password, 8)

    const [user_id] = await knex("user").insert({
      name,
      email,
      password: hashedPassword
    })

    const {secret, expiresIn} = Auth.jwt

    if(!secret){
      throw new AppError("Impossible to generate token. AUTH_SECRET is undefined")
    }

    const token = sign({role: "client"}, secret, {
      subject: String(user_id),
      expiresIn
    })

    response.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 15 * 60 * 1000 // 15 minutes
    })

    return response.status(201).json()
  }
}

module.exports = UsersController