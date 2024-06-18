const knex = require("../database/knex")

class UsersRepository{
  async findEmail(email){
    const user = await knex("user").where({email}).first()

    return user
  }

  async create({name, email, password}){
    const [user_id] = await knex("user").insert({
      name,
      email,
      password
    })

    return {
      user_id
    }
  }

  async findById(id){
    const user = await knex("user").where({id}).first()

    delete user.password

    return user
  }
}

module.exports = UsersRepository