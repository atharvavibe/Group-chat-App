const Groups = require('../models/creategroup')
const User = require('../models/user')
const UserGroup = require('../models/usergroup')
const Groupchat = require('../models/groupchat')


// exports.getallGroups = async (req, res) => {
//   try{
//     const getallgroups = await Groups.findAll({ attributes: ['id', 'groupname'], through: UserGroup})
//     //console.log(getallgroups, req.user)
//     res.status(200).json({ group: getallgroups, success: true})
//   }catch(err){
//     console.log(err)
//   }
// } 

exports.getUserGroups = async (req, res) => {
  try {
    console.log(req.user)
    const getusergroups = await req.user.getGroups({ attributes: ['id', 'groupname'], through: {admin: true}})
    res.status(200).json({success: true, getusergroups})
  } catch (err) {
    console.log(err)
  }
}

exports.createGroup = async(req, res) =>{
    try {
      const {groupName} = req.body
      console.log(groupName)
      const makeGroup = await req.user.createGroup(
        {groupname: groupName},
        {through: {admin: true}} 
      )
        console.log(makeGroup)
        res.status(200).json({success: true, name: makeGroup, id: makeGroup.id})
     
    } catch (error) {
        console.log(error)
    }

}


exports.getGroupchats = async(req, res) => {
  try {
    const groupId = req.params.groupid
    // const groupmembers = await Groupchat.findAll({where : {groupId}, 
    //   attributes: ["username"]})
    console.log(groupId)
    const groupmessages = await Groupchat.findAll({
      limit: 15,
      order: [["createdAt", "ASC"]],
      where: {groupId},
      attributes: ["groupmessage", "username", "groupid"]
    })
    res.status(200).json({groupmessage: groupmessages,message: 'Successful', success: true})
  } catch (err) {
    console.log(err)
  }
}