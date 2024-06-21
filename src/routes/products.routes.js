const {Router} = require("express")
const ProductsController = require("../controllers/products-controller")
const ProductsAvatarController = require("../controllers/products-avatar-controller")
const authentication = require("../middlewares/authentication")
const multer = require("multer")
const uploadConfig = require("../configs/Uploads")

const productsRoutes = Router()
const productsController = new ProductsController()
const productsAvatarController = new ProductsAvatarController()

const upload = multer(uploadConfig.MULTER)

productsRoutes.use(authentication)

productsRoutes.post("/", productsController.create)
productsRoutes.patch("/:product_id/avatar", upload.single('avatar'), productsAvatarController.update)
productsRoutes.get("/", productsController.index)

module.exports = productsRoutes