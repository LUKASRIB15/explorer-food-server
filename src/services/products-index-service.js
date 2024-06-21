class ProductsIndexService{
  productsRepository

  constructor(productsRepository){
    this.productsRepository = productsRepository
  }

  async execute({title}){
    const products = await this.productsRepository.search(title)

    const productsIngredients = await this.productsRepository.filterIngredientsSortedByName()
    const productsWithIngredients = products.map(product=>{
      const ingredients = productsIngredients.filter(ingredient=>{
        return ingredient.product_id === product.id
      })

      const ingredientsData = ingredients.map(ingredient=>{
        return {
          id: ingredient.id,
          name: ingredient.name
        }
      })

      return {
        ...product,
        ingredients: ingredientsData
      }
    })

    return {
      productsWithIngredients
    }
  }
}

module.exports = ProductsIndexService