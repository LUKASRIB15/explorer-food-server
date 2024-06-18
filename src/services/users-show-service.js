const AppError = require("../utils/AppError")

class UsersShowService{
  usersRepository
  constructor(usersRepository){
    this.usersRepository = usersRepository
  }
  async execute({id}){
    const user = await this.usersRepository.findById(id)

    if(!user){
      throw new AppError("User not found!")
    }

    return user
  }
}

module.exports = UsersShowService