const AppError = require("../utils/AppError")

class ProductsUpdateService{
  productsRepository

  constructor(productsRepository){
    this.productsRepository = productsRepository
  }

  async execute({name, category, ingredients, price, description, product_id}){
    const product = await this.productsRepository.findById(product_id)

    if(!product){
      throw new AppError("Product not found", 404)
    }

    product.name = name ?? product.name
    product.category = category ?? product.category
    product.price = price ?? product.price
    product.description = description ?? product.description

    await this.productsRepository.update({product, product_id})

    await this.productsRepository.deleteIngredients(product_id)

    const productIngredients = ingredients.map(ingredient=>{
      return {
        product_id,
        name: ingredient
      }
    })

    await this.productsRepository.addIngredients(productIngredients)
  }
}

module.exports = ProductsUpdateService