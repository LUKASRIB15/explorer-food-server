class UsersController {
  async create(request, response){
    const {name, email, password} = request.body
    return response.json({name, email, password})
  }
}

module.exports = UsersController