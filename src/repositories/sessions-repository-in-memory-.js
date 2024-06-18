class SessionsRepositoryInMemory{
  users = [
    {
      id: 1,
      name: "Test",
      email: "test@test.com",
      password: "$2a$08$ZilfRYsJqhbL2MznY0e5..pgW0YcLy4dd6/f5gREiNvj4HhSL/d2W"
    },
    {
      id: 2,
      name: "Test 2",
      email: "test2@test.com",
      password: "$2a$08$ZilfRYsJqhbL2MznY0e5..pgW0YcLy4dd6/f5gREiNvj4HhSL/d2W"
    }
  ]

  async findUser(email){
    const user = this.users.filter(user=>user.email === email)[0]

    return user
  }
}

module.exports = SessionsRepositoryInMemory