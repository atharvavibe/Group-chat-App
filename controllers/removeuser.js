const {Op} = require('sequelize')
const Group = require('../models/creategroup')
const User = require('../models/user')
const UserGroup = require('../models/usergroup')

exports.removeUser = async(req, res) => {
    try {
        const {username, groupname} = req.body
        const userTobeRemoved = await User.findOne({where: {username}})
        console.log('userid>>>>>', userTobeRemoved.id)
        const group = await Group.findOne({where: {groupname}})
        console.log('groupid>>>>>', group.id)
        if(!userTobeRemoved){
            return res.status(400).json({message: 'User does not exists'})
        }
        const isAdmin = await UserGroup.findOne({where: {groupId: group.id, userId: req.user.id, admin: true}})
        console.log("IS ADMIN>>>>>>>>>>>",isAdmin.admin)
        if(isAdmin.admin == true){
            // const userObj = {
            //     userId: user.id, 
            //     groupId: group.id
            // }
            const removeuser = await UserGroup.destroy({where: {userId: userTobeRemoved.id, groupId: group.id}})
            console.log(removeuser)
            return res.status(200).json({message: 'User removed successfully', removeuser})
        }
        res.status(400).json({message: 'User is not admin'})
    } catch (err) {
        console.log(err)
    }
}