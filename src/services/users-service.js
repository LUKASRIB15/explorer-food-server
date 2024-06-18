const { sign } = require("jsonwebtoken")
const Auth = require("../configs/Auth")
const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const {hash} = require("bcryptjs")

class UsersService{
  usersRepository
  constructor(usersRepository){
    this.usersRepository = usersRepository
  }
  async execute({name, email, password}){
    const checkUserExists = await this.usersRepository.findEmail(email)

    if(checkUserExists){
      throw new AppError("User already exists")
    }

    const hashedPassword = await hash(password, 8)

    const {user_id}= await this.usersRepository.create({name, email, password: hashedPassword})

    const {secret, expiresIn} = Auth.jwt

    if(!secret){
      throw new AppError("Impossible to generate token. AUTH_SECRET is undefined")
    }

    const token = sign({role: "client"}, secret, {
      subject: String(user_id),
      expiresIn
    })

    return {
      token
    }
  }
}

module.exports = UsersService