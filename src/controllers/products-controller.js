const ProductsRepository = require("../repositories/products-repository")
const ProductsCreateService = require("../services/products-create-service")

class ProductsController{
  async create(request, response){
    const {user_id} = request.user
    const {name, category, ingredients, price, description} = request.body

    const productsRepository = new ProductsRepository()
    const productsCreateService = new ProductsCreateService(productsRepository)

    await productsCreateService.execute({name, category, ingredients, price, description, user_id})

    return response.status(201).json()
  }
}

module.exports = ProductsController