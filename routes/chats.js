const express = require('express')

const router = express.Router()

const chatsController = require('../controllers/chats')

const authController = require('../middleware/auth')

router.post('/sendmessage', authController.authenticate, chatsController.sendMessage)

router.get('/getmessage', authController.authenticate, chatsController.getMessage)

module.exports = router