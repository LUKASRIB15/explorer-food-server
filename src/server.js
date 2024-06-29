require("express-async-errors")
require("dotenv/config")

const express = require("express")
const routes = require("./routes")
const database = require("./database/sqlite")
const AppError = require("./utils/AppError")
const cors = require("cors")
const uploadConfig = require("./configs/Uploads")

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)
app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))

database()

app.use((error, request, response, next)=>{
  if(error instanceof AppError){
    return response.status(error.status).json({
      status: "error",
      message: error.message
    })
  }else{
    console.log(error)
    return response.status(500).json({
      status: "error",
      message: "Internal server error"
    })
  }
})

app.listen(3333, ()=>{
  console.log("Server running on port 3333 🚀")
})