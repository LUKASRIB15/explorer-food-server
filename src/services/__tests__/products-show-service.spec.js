const ProductsRepositoryInMemory = require("../../repositories/products-repository-in-memory")
const AppError = require("../../utils/AppError")
const ProductsShowService = require("../products-show-service")

describe("ProductsShowService", ()=>{
  let productsRepositoryInMemory = null
  let productsShowService = null

  beforeEach(()=>{
    productsRepositoryInMemory = new ProductsRepositoryInMemory()
    productsShowService = new ProductsShowService(productsRepositoryInMemory)
  })

  test("should be product have an array of ingredients", async ()=>{
    const product_id = 1

    const {ingredients} = await productsShowService.execute({product_id})

    expect(ingredients).toHaveLength(1)
  })

  test("should be error when product not found", async ()=>{
    const product_id = 3


    expect(async()=>{
      await productsShowService.execute({product_id})
    }).rejects.toEqual(new AppError("Product not found", 404))
  })
})