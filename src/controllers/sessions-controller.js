const SessionsRepository = require("../repositories/sessions-repository")
const SessionsService = require("../services/sessions-service")

class SessionsController {
  async create(request, response){
    const {email, password} = request.body

    const sessionsRepository = new SessionsRepository()
    const sessionsService = new SessionsService(sessionsRepository)

    const {token} = await sessionsService.execute({email, password})
    
    response.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 15 * 60 * 1000 // 15 minutes
    })

    return response.json()
    
  }
}

module.exports = SessionsController