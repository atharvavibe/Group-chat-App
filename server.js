const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const { default: axios } = require('axios')

dotenv.config()

//database
const sequelize = require('./util/database')

//all Routes
const userRoutes = require('./routes/user')
const chatRoutes = require('./routes/chats')

//Models
const User = require('./models/user')
const Chat = require('./models/chats')

const app = express()

app.use(cors())

app.use(express.json())

//utilizing routes
app.use('/user', userRoutes)
app.use('/chat', chatRoutes)

//table associations
User.hasMany(Chat)
Chat.belongsTo(User)

sequelize.sync().then(result => {
    app.listen(3000)
}).catch(err => {
    console.log(err)
})
