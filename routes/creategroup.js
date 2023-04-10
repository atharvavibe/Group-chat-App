const express = require('express')

const router = express.Router()

const creategroupController = require('../controllers/creategroup')

const authenticationController = require('../middleware/auth')

router.post('/creategroup', authenticationController.authenticate, creategroupController.createGroup)

//router.get('/getallgroups', authenticationController.authenticate, creategroupController.getallGroups)

router.post('/sendgroupmessage/:groupid',authenticationController.authenticate, creategroupController.sendMessage )

router.get('/getusergroups', authenticationController.authenticate, creategroupController.getUserGroups)

router.get('/getgroupmessage/:groupid',authenticationController.authenticate, creategroupController.getGroupchats)

module.exports = router