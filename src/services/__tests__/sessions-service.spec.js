const SessionsRepositoryInMemory = require("../../repositories/sessions-repository-in-memory-")
const SessionsService = require("../sessions-service")

describe("SessionsService", ()=>{
  let sessionsRepositoryInMemory = null
  let sessionsService = null


  beforeEach(()=>{
    sessionsRepositoryInMemory = new SessionsRepositoryInMemory()
    sessionsService = new SessionsService(sessionsRepositoryInMemory)
  })
  test("After the user enters the system, he must receive a token", async ()=>{
    const userTest = {
      email: "test@test.com",
      password: "123"
    }

    const userLogged = await sessionsService.execute(userTest)

    expect(userLogged).toHaveProperty("token")
  })
  
})