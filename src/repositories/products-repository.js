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

  async search(title){
    const products = await knex("products")
    .leftJoin("ingredients", "products.id", "ingredients.product_id")
    .where(function() {
      this.whereLike("products.name", `%${title}%`)
        .orWhereLike("ingredients.name", `%${title}%`);
    })
    .select("products.*")
    .distinct();

    return products
  }

  async filterIngredientsSortedByName(){
    const productsIngredients = await knex("ingredients").orderBy("name")

    return productsIngredients
  }

  async findById(id){
    const product = await knex("products").where({id}).first()
  
    return product
  }

  async findIngredientsByProductId(id){
    const ingredients = await knex("ingredients").where({product_id: id})

    return ingredients
  }

  async update({product, product_id}){
    await knex("products").update(product).where({id: product_id})
  }

  async delete(product_id){
    await knex("products").where({id:product_id}).delete()
  }
}

module.exports = ProductsRepository