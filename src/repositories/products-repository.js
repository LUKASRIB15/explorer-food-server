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
}

module.exports = ProductsRepository