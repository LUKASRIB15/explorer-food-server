class ProductsCreateService{
  productsRepository

  constructor(productsRepository){
    this.productsRepository = productsRepository
  }

  async execute({name, category, ingredients, price, description, user_id}){

    const {product_id} = await this.productsRepository.create({name, category, price, description, user_id})

    const productIngredients = ingredients.map(ingredient=>{
      return {
        product_id,
        name: ingredient
      }
    })

    await this.productsRepository.addIngredients(productIngredients)
  }
}

module.exports = ProductsCreateService