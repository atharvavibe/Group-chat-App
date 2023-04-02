const userRoutes = require('../controllers/user')

const express = require('express')

const router = express.Router()

router.post('/signup', userRoutes.signup)

module.exports = router