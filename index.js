const express = require('express')
const bodyParser = require('body-parser')

const userRoute = require('./routes/userRoute')

const app = express()
const port  = 3000

app.use(bodyParser.urlencoded({ extended: false }))

userRoute(app)

app.get('/', (req,res) => res.send("index.html"))

app.listen(port, () => console.log("api rodando com sucesso"))