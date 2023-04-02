const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const { default: axios } = require('axios')

dotenv.config()

const sequelize = require('./util/database')
const userRoutes = require('./routes/user')

const user = require('./models/user')

const app = express()

app.use(cors())

app.use(express.json())

app.use('/user', userRoutes)

sequelize.sync().then(result => {
    app.listen(3000)
}).catch(err => {
    console.log(err)
})
