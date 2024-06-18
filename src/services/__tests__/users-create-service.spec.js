const UsersRepositoryInMemory = require("../../repositories/users-repository-in-memory")
const AppError = require("../../utils/AppError")
const UsersCreateService = require("../users-create-service")

describe("UsersCreateService", () => {
  let usersRepositoryInMemory = null
  let usersCreateService = null
  
  beforeEach(()=>{
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersCreateService = new UsersCreateService(usersRepositoryInMemory)
  })

  test("After the user is created, a token must be generated", async ()=>{
    const userTest = {
      name: "Test",
      email: "test@test.com",
      password: "123"
    }

    const userCreated = await usersCreateService.execute(userTest)

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

    await usersCreateService.execute(userTest1)

    expect(async()=>{
      await usersCreateService.execute(userTest2)
    }).rejects.toEqual(new AppError("User already exists"))
  })
})