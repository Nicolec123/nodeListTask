const express = require('express')
//const { urlencoded } = require('body-parser')
const path = require('path')
const app = express()

// chama as rotas no server
const router = require('./routes/router')
 //define que vai uasr a viwes engine e o ejs para fazer o front
app.set('view engine', 'ejs')
 //define a pasta que vai armazenar as views ate o ejs ser renderizado
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))

//rota raiz que vai ser chamada quando acessamos a raiz do site
app.use(router)


const PORT = process.env.PORT || 3020

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})