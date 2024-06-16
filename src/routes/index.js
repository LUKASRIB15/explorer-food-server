const usersRoutes = require("./users.routes")
const sessionsRoutes = require("./sessions.routes")
const {Router} = require("express")

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes) 

module.exports = routes