const express = require("express")
const routes = require("./routes")
const database = require("./database/sqlite")

const app = express()

app.use(express.json())
app.use(routes)

database()

app.listen(3333, ()=>{
  console.log("Server running on port 3333 🚀")
})