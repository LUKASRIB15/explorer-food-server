const ProductsRepositoryInMemory = require("../../repositories/products-repository-in-memory")
const ProductsCreateService = require("../products-create-service")

const newProduct = {
  name: "test",
  category: "test",
  price: 10,
  ingredients: ["test", "test"],
  description: "test",
  user_id: 1
}

describe("ProductsCreateService", ()=>{
  let productsRepositoryInMemory = null
  let productsCreateService = null

  beforeEach(()=>{
    productsRepositoryInMemory = new ProductsRepositoryInMemory()
    productsCreateService = new ProductsCreateService(productsRepositoryInMemory)
  })
  test("Create a new product", async ()=>{

    await productsCreateService.execute(newProduct)

    expect(productsRepositoryInMemory.products).toHaveLength(3)
  })

  test("Create a new product with ingredients", async ()=>{
    await productsCreateService.execute(newProduct)

    expect(productsRepositoryInMemory.ingredients).toHaveLength(3)
  })
})