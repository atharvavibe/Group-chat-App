const Sequelize = require('sequelize')

const sequelize = new Sequelize('group-chat','root','212005',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize