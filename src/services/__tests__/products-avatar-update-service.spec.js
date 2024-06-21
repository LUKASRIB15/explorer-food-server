const DiskStorageInMemory = require("../../providers/DiskStorageInMemory")
const ProductsAvatarRepositoryInMemory = require("../../repositories/products-avatar-repository-in-memory")
const AppError = require("../../utils/AppError")
const ProductsAvatarUpdateService = require("../products-avatar-update-service")

describe("ProductsAvatarUpdateService", ()=>{
  let productsAvatarRepositoryInMemory = null
  let diskStorageInMemory = null
  let productsAvatarUpdateService = null

  beforeEach(()=>{
    productsAvatarRepositoryInMemory = new ProductsAvatarRepositoryInMemory()
    diskStorageInMemory = new DiskStorageInMemory()
    productsAvatarUpdateService = new ProductsAvatarUpdateService(productsAvatarRepositoryInMemory, diskStorageInMemory)
  })

  test("Update is impossible when a product does not exist", async ()=>{
    const avatar = {
      filename: "image.png"
    }

    expect(async ()=>{
      await productsAvatarUpdateService.execute({avatar, product_id: 2})
    }).rejects.toEqual(new AppError("Product not found", 404))
    
  })
  test("Update a product avatar without avatar", async ()=>{
    const avatar = {
      filename: "image.png"
    }

    const {product} = await productsAvatarUpdateService.execute({avatar, product_id: 1})

    expect(product).toHaveProperty("avatar")
    expect(product.avatar).toEqual("image.png")
  })

  test("Update a product avatar already has an avatar", async ()=>{
    const avatar = {
      filename: "image-2.png"
    }

    const {product} = await productsAvatarUpdateService.execute({avatar, product_id: 3})

    expect(product).toHaveProperty("avatar")
    expect(product.avatar).toEqual("image-2.png")
  })
})