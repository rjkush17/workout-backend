const express = require("express")
const app = express();
const database = require("./database/database")
const router = require("./routers/router")
const cors = require("cors")



let PORT = 4500;

app.use(cors())

app.use(express.json())

app.use("/api",router)





database();

app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`))