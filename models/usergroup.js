const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Usergroup = sequelize.define('usergroup',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    admin:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    }
})

module.exports = Usergroup