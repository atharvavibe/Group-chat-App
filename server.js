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
const createGroupRoutes = require('./routes/creategroup')
const addUserRoutes = require('./routes/adduser')
const removeUserRoutes = require('./routes/removeuser')

//Models
const User = require('./models/user')
const Chat = require('./models/chats')
const Group = require('./models/creategroup')
const Usergroup = require('./models/usergroup')
const GroupMessage = require('./models/groupchat')

const app = express()

app.use(cors())

app.use(express.json())

//utilizing routes
app.use('/user', userRoutes)
app.use('/chat', chatRoutes)
app.use('/group', createGroupRoutes)
app.use('/addgroupchatuser', addUserRoutes)
app.use('/removegroupchatuser', removeUserRoutes)


//table associations
User.hasMany(Chat)
Chat.belongsTo(User)

Group.hasMany(Chat)
Chat.belongsTo(Group)

User.hasMany(GroupMessage)
GroupMessage.belongsTo(User)

User.belongsToMany(Group, {through: Usergroup})
Group.belongsToMany(User, {through: Usergroup})

sequelize.sync().then(result => {
    app.listen(3000)
}).catch(err => {
    console.log(err)
})
