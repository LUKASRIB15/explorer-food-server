const knex = require("../database/knex")

class ProductsRepository{
  async create({name, category, price, description, user_id}){
    const [product_id] = await knex("products").insert({
      name,
      category,
      price,
      description,
      user_id
    })

    return {
      product_id
    }
  }

  async addIngredients(ingredients){
    await knex("ingredients").insert(ingredients)
  }
}

module.exports = ProductsRepository