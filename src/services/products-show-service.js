const AppError = require("../utils/AppError")

class ProductsShowService{
  productsRepository

  constructor(productsRepository){
    this.productsRepository = productsRepository
  }

  async execute({product_id}){
    const product = await this.productsRepository.findById(product_id)

    if(!product){
      throw new AppError("Product not found", 404)
    }

    const ingredients = await this.productsRepository.findIngredientsByProductId(product.id)

    return {
      product,
      ingredients
    }
  }
}

module.exports = ProductsShowService