const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


function isStrInvalid(string){
    if(string == undefined || string.length == 0){
        return true
    }else{
        return false
    }

}

exports.signup = async(req, res) => {
    try{
        const {username, email, phonenumber, password} = req.body
        
        if(isStrInvalid(username) || isStrInvalid(email) || isStrInvalid(phonenumber) || isStrInvalid(password)){
            return res.status(400).json({err: 'Bad parameters...something is missing'})
        }
        const ifUserExists = await User.findAll({where: {email: email}})
        if(ifUserExists.length > 0){
            return res.status(404).json({message: 'User Already exist'})
        }
        else{
        bcrypt.hash(password, 10, async (err, hash) => {
            console.log(err)
            const userData = User.create({username, email, phonenumber, password: hash})
            res.status(201).json({success: true, message: 'User created successfully', data: userData})
        })
      }
    }catch(err){
        console.log(err)
    }
}

const generateAccessToken = (id , username) => {
    return jwt.sign({userId: id, username: username}, process.env.TOKEN_SECRET_KEY)
}

exports.login = async(req, res) => {
    try{
        const {email, password} = req.body
        if(isStrInvalid(email) || isStrInvalid(password)){
            return res.status(400).json({message: 'Email or password is missing '})
        }
        console.log(email, password)
        const user = await User.findAll({where: {email}}).then(user => {
            if(user.length > 0){
                bcrypt.compare(password, user[0].password, (err, result) => {
                    if(result === true){
                        return res.status(201).json({success: true, message: 'User logged in successfully!', token:generateAccessToken(user[0].id, user[0].username)})
                    }else{
                        return res.status(400).json({success: false, message: 'Password incorrect'})
                    }
                })
            }else{
                return res.status(400).json({success: false, message: 'User does not exists'})
            }
        })
    }catch(err){
        console.log(err)
    }
}

exports.showAllUsers = async(req, res) => {
    try{
        let users = User.findAll()
        res.status(200).json({success: true, users: users})
    }catch(err){
        console.log(err)
    }
}

exports.generateAccessToken = generateAccessToken