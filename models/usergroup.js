const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Usergroup = sequelize.define('usergroup',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

})

module.exports = Usergroup