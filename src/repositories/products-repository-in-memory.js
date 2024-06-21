class ProductsRepositoryInMemory{
  products = []
  ingredients = []

  async create({name, category, price, description, user_id}){
    this.products.push({
      id: Math.floor(Math.random() * 1000),
      name, 
      category, 
      price, 
      description, 
      user_id
    })

    const {id} = this.products[this.products.length - 1]

    return {
      id
    }
  }

  async addIngredients(ingredients){
    this.ingredients.push(...ingredients)
  }
}

module.exports = ProductsRepositoryInMemory