const express = require('express')

const router = express.Router()

const removeUserController = require('../controllers/removeuser')
const authController = require('../middleware/auth')

router.post('/removeuser', authController.authenticate, removeUserController.removeUser)

module.exports = router