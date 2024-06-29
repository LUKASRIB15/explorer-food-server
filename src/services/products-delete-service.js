const AppError = require("../utils/AppError")

class ProductsDeleteService{
  productsRepository

  constructor(productsRepository){
    this.productsRepository = productsRepository
  }

  async execute({product_id}){
    const product = await this.productsRepository.findById(product_id)

    if(!product){
      throw new AppError("Product not found", 404)
    }

    await this.productsRepository.delete(product.id)
  }
} 

module.exports = ProductsDeleteService