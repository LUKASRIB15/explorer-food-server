class ProductsAvatarInMemory{
  products = [
    {
      id: 1,
      name: "test",
      category: "test",
      price: 10,
      ingredients: ["test", "test"],
      description: "test",
      user_id: 1,
      avatar: null
    },
    {
      id: 3,
      name: "test",
      category: "test",
      price: 10,
      ingredients: ["test", "test"],
      description: "test",
      user_id: 1,
      avatar: "image.png"
    }
  ]

  async findProduct({product_id}){
    const product = this.products.find(product=>product.id === product_id)

    return product
  }

  async update({product, product_id}){
    const index = this.products.findIndex(product=>product.id === product_id)

    this.products[index] = product
  }
}

module.exports = ProductsAvatarInMemory