const Groups = require('../models/creategroup')
const User = require('../models/user')
const UserGroup = require('../models/usergroup')


exports.getallGroups = async (req, res) => {
  try{
    const getallgroups = await UserGroup.findAll({ attributes: ['id', 'groupname']})
    //console.log(getallgroups, req.user)
    res.status(200).json({ group: getallgroups, success: true})
  }catch(err){
    console.log(err)
  }
} 

exports.getUserGroups = async (req, res) => {
  try {
    const getusergroups = await req.user.getGroups({ attributes: ['id', 'groupname'], through: UserGroup})
    res.status(200).json({success: true, getusergroups})
  } catch (err) {
    console.log(err)
  }
}

exports.createGroup = async(req, res) =>{
    try {
      const {groupName} = req.body
      console.log(groupName)
      const makeGroup = await req.user.createGroup({
        groupname: groupName 
      })
        console.log(makeGroup)
        res.status(200).json({success: true, name: makeGroup, id: makeGroup.id})
     
    } catch (error) {
        console.log(error)
    }

}