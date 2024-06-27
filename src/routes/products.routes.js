const {Router} = require("express")
const ProductsController = require("../controllers/products-controller")
const ProductsAvatarController = require("../controllers/products-avatar-controller")
const authentication = require("../middlewares/authentication")
const multer = require("multer")
const uploadConfig = require("../configs/Uploads")
const authorization = require("../middlewares/authorization")

const productsRoutes = Router()
const productsController = new ProductsController()
const productsAvatarController = new ProductsAvatarController()

const upload = multer(uploadConfig.MULTER)

productsRoutes.use(authentication)

productsRoutes.post("/", authorization(["admin"]),productsController.create)
productsRoutes.patch("/:product_id/avatar", authorization(["admin"]), upload.single('avatar'), productsAvatarController.update)
productsRoutes.get("/", productsController.index)
productsRoutes.get("/:product_id", productsController.show)

module.exports = productsRoutes