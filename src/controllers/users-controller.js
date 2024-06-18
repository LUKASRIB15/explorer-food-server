const UsersRepository = require("../repositories/users-repository")
const UsersCreateService = require("../services/users-create-service")
const UsersShowService = require("../services/users-show-service")


class UsersController {
  async create(request, response){
    const {name, email, password} = request.body

    const usersRepository = new UsersRepository()
    const usersCreateService = new UsersCreateService(usersRepository)

    const {token} = await usersCreateService.execute({name, email, password})

    return response.status(201).json({token})
  }

  async show(request, response){
    const {user_id} = request.user

    const usersRepository = new UsersRepository()
    const usersShowService = new UsersShowService(usersRepository)

    const user = await usersShowService.execute({id: user_id})

    return response.json(user)

  }
}

module.exports = UsersController