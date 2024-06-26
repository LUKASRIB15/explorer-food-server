class ProductsRepositoryInMemory{
  products = [{
    id: 1,
    name: "test",
    category: "test",
    price: 10,
    description: "test",
    user_id: 1
  },
  {
    id: 2,
    name: "test 2",
    category: "test",
    price: 10,
    description: "test",
    user_id: 1
  }
]

  ingredients = [
    {
      id: 1,
      name: "ingredient test",
      product_id: 1
    }
  ]

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

  async search(title){
    const products = this.products.map(product=>{
      return {
        ...product,
        ingredients: [
          ...this.ingredients.filter(ingredient=>ingredient.product_id === product.id)
        ]
      }
    })

    return products.filter(product => product.name === new RegExp(`^${title}`, 'i'))
  }

  async filterIngredientsSortedByName(){
    return this.ingredients
  }

  async findById(id){
    const product = this.products.filter(product=>product.id === id)[0]
  
    return product
  }

  async findIngredientsByProductId(id){
    const ingredients = this.ingredients.filter(ingredient=>ingredient.product_id === id)

    return ingredients
  }
}

module.exports = ProductsRepositoryInMemory