const AppError = require("../utils/AppError")

class ProductsAvatarUpdateService{
  productsAvatarRepository
  diskStorage

  constructor(productsAvatarRepository, diskStorage){
    this.productsAvatarRepository = productsAvatarRepository
    this.diskStorage = diskStorage
  }

  async execute({avatar, product_id}){
    
    const product = await this.productsAvatarRepository.findProduct({product_id})

    if(!product){
      throw new AppError("Product not found", 404)
    }

    if(product.avatar){
      await this.diskStorage.deleteFile(product.avatar)
    }

    const newAvatar = await this.diskStorage.saveFile(avatar.filename)

    product.avatar = newAvatar

    await this.productsAvatarRepository.update({product, product_id})

    return {
      product
    }
  }
}

module.exports = ProductsAvatarUpdateService