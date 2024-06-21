const DiskStorage = require("../providers/DiskStorage")
const ProductsAvatarRepository = require("../repositories/products-avatar-repository")
const ProductsAvatarUpdateService = require("../services/products-avatar-update-service")

class ProductsAvatarController{
  async update(request, response){
    const {role} = request.user // Remember use role in authorization
    const {product_id} = request.params
    const avatar = request.file

    const productsAvatarRepository = new ProductsAvatarRepository()
    const diskStorage = new DiskStorage()
    const productsAvatarUpdateService = new ProductsAvatarUpdateService(productsAvatarRepository, diskStorage)

    const {product} = await productsAvatarUpdateService.execute({avatar, product_id})

    return response.json(product)

  }
}

module.exports = ProductsAvatarController