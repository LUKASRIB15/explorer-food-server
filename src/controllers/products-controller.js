const ProductsRepository = require("../repositories/products-repository")
const ProductsCreateService = require("../services/products-create-service")
const knex = require("../database/knex")
const ProductsIndexService = require("../services/products-index-service")

class ProductsController{

  async index(request, response){
    const {title} = request.query

    const productsRepository = new ProductsRepository()
    const productsIndexService = new ProductsIndexService(productsRepository)

    const {productsWithIngredients} = await productsIndexService.execute({title})
    
    
    return response.json(productsWithIngredients)
  }
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