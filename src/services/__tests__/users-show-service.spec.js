const UsersRepositoryInMemory = require("../../repositories/users-repository-in-memory")
const AppError = require("../../utils/AppError")
const UsersShowService = require("../users-show-service")

describe("UsersShowService", ()=>{
  let usersRepositoryInMemory = null
  let usersShowService = null
  
  beforeEach(()=>{
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersShowService = new UsersShowService(usersRepositoryInMemory)
  })
  test("After the user receives the token, the user data must be returned", async ()=>{
    const userId = 1

    const user = await usersShowService.execute({id: userId})

    expect(user).toEqual({
      id: 1,
      name: "Test",
      email: "test1@test1.com",
      password: "$2a$08$ZilfRYsJqhbL2MznY0e5..pgW0YcLy4dd6/f5gREiNvj4HhSL/d2W"
    })
  })

  test("User not registered must not be returned and must be reject with an error", async ()=>{
    const userId = 2

    expect(async ()=>{
      await usersShowService.execute({id: userId})
    }).rejects.toEqual(new AppError("User not found!"))
  })
})