const UsersRepositoryInMemory = require("../../repositories/users-repository-in-memory")
const AppError = require("../../utils/AppError")
const UsersService = require("../users-service")

describe("UsersService", () => {
  let usersRepositoryInMemory = null
  let usersService = null
  
  beforeEach(()=>{
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersService = new UsersService(usersRepositoryInMemory)
  })

  test("After the user is created, a token must be generated", async ()=>{
    const userTest = {
      name: "Test",
      email: "test@test.com",
      password: "123"
    }

    const userCreated = await usersService.execute(userTest)

    expect(userCreated).toHaveProperty("token")
  })

  test("Do not allow creating a user with an already registered email", async ()=>{
    const userTest1 = {
      name: "Test 1",
      email: "test@test.com",
      password: "123"
    }

    const userTest2 = {
      name: "Test 2",
      email: "test@test.com",
      password: "123"
    }

    await usersService.execute(userTest1)

    expect(async()=>{
      await usersService.execute(userTest2)
    }).rejects.toEqual(new AppError("User already exists"))
  })
})