class UsersRepositoryInMemory{
  users = [] 
  
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


}

module.exports = UsersRepositoryInMemory