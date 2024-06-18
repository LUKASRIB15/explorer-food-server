class UsersRepositoryInMemory{
  users = [{
    id: 1,
    name: "Test",
    email: "test1@test1.com",
    password: "$2a$08$ZilfRYsJqhbL2MznY0e5..pgW0YcLy4dd6/f5gREiNvj4HhSL/d2W"
  }] 
  
  async findEmail(email){
    const user = this.users.find(user => user.email === email)
    return user
  }

  async create({name, email, password}){
    const user = {
      id: Math.floor(Math.random() * 1000),
      name,
      email,
      password
    }

    this.users.push(user)

    return {
      user_id: user.id
    }
  }

  async findById(id){
    const user = this.users.filter(user => user.id === id)[0]
    
    return user
  }


}

module.exports = UsersRepositoryInMemory