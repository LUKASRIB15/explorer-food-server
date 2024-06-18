const UsersRepository = require("../repositories/users-repository")
const UsersService = require("../services/users-service")


class UsersController {
  async create(request, response){
    const {name, email, password} = request.body

    const usersRepository = new UsersRepository()
    const usersService = new UsersService(usersRepository)

    const {token} = await usersService.execute({name, email, password})

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