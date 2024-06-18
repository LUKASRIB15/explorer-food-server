const {Router} = require("express")
const UsersController = require("../controllers/users-controller")
const authentication = require("../middlewares/authentication")

const usersController = new UsersController()

const usersRoutes = Router()

usersRoutes.post("/", usersController.create)
usersRoutes.get("/", authentication, usersController.show)

module.exports = usersRoutes