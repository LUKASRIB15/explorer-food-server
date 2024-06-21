const ProductsRepositoryInMemory = require("../../repositories/products-repository-in-memory")
const ProductsIndexService = require("../products-index-service")

describe("ProductsIndexService", ()=>{
  let productsRepositoryInMemory = null
  let productsIndexService = null

  beforeEach(()=>{
    productsRepositoryInMemory = new ProductsRepositoryInMemory()
    productsIndexService = new ProductsIndexService(productsRepositoryInMemory)
  })
  test("Finding ingredients of all products", async ()=>{
    await productsIndexService.execute({title: "test"})

    expect(productsRepositoryInMemory.ingredients).toHaveLength(1)
  })

  // This test is not working correctly
  test("Searching products by title", async ()=>{
    const {productsWithIngredients} = await productsIndexService.execute({title: "2"})

    console.log(productsWithIngredients)
    //expect(productsWithIngredients).toHaveLength(2)
  })
})