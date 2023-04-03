const userRoutes = require('../controllers/user')

const express = require('express')

const router = express.Router()

router.post('/signup', userRoutes.signup)

router.post('/login', userRoutes.login)

router.get('/showUsers', userRoutes.showAllUsers)

module.exports = router