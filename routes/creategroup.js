const express = require('express')

const router = express.Router()

const creategroupController = require('../controllers/creategroup')

const authenticationController = require('../middleware/auth')

router.post('/creategroup', authenticationController.authenticate, creategroupController.createGroup)

router.get('/getallgroups', authenticationController.authenticate, creategroupController.getallGroups)

router.get('/getusergroups', authenticationController.authenticate, creategroupController.getUserGroups)

module.exports = router