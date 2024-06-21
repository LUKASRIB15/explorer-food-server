const knex = require("../database/knex")

class ProductsAvatarRepository{
  async findProduct({product_id}){
    const product = await knex("products").where({id: product_id}).first()

    return product
  } 
  
  async update({product, product_id}){
    await knex("products").update(product).where({id: product_id})
  }
}

module.exports = ProductsAvatarRepository