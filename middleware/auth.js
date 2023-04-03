const jwt = require('jsonwebtoken')
const user = require('../models/user')



exports.authenticate = async (req, res, next) => {
    try{
        const token = req.header("Authorization")
        const userId = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        const theUser = await user.findByPk(userId.userId)

        req.user = theUser
        next()
    }catch(err){
        console.log(err)
        return res.status(404).json({message: 'Authentication error', success: false})
    }
}