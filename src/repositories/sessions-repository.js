const knex = require("../database/knex")

class SessionsRepository{
  async findUser(email){
    const user = await knex("user").where({email}).first()

    return user
  }
}

module.exports = SessionsRepository