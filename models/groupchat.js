const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const GroupMessage = sequelize.define('groupchat', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    groupmessage: {
        type: Sequelize.STRING,
        allowNull: false
    },

    groupid: {
        type : Sequelize.INTEGER,
        allowNull: false
    },

    username: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = GroupMessage