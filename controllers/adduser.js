const {Op} = require('sequelize')
const Group = require('../models/creategroup')
const User = require('../models/user')
const UserGroup = require('../models/usergroup')

exports.addUser = async(req, res) => {
    try {
        const {username, groupname} = req.body
        const user = await User.findOne({where: {username}})
        console.log('userid>>>>>', user.id)
        const group = await Group.findOne({where: {groupname}})
        console.log('groupid>>>>>', group.id)
        if(!user){
            return res.status(400).json({message: 'User does not exists'})
        }

        const isUserinGroup = await UserGroup.findOne({where: {userId: user.id, groupId: group.id}}) 
        if(!isUserinGroup){
            const userObj = {
                userId: user.id, 
                groupId: group.id
            }
            const addUser = await UserGroup.create(userObj)
            //console.log(addUser)
            return res.status(200).json({message: 'User added successfully', addUser})
        }else{
            res.status(400).json({message: 'User already exists!!'})
        }
    } catch (err) {
        console.log(err)
    }
}