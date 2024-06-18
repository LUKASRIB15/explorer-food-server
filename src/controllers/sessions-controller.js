const SessionsRepository = require("../repositories/sessions-repository")
const SessionsService = require("../services/sessions-service")

class SessionsController {
  async create(request, response){
    const {email, password} = request.body

    const sessionsRepository = new SessionsRepository()
    const sessionsService = new SessionsService(sessionsRepository)

    const {token} = await sessionsService.execute({email, password})
    

    return response.json({token})
    
  }
}

module.exports = SessionsController