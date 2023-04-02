const User = require('../models/user')
const bcrypt = require('bcrypt')


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
        User.findAll({where : {email: email}}).then(() => {
            return res.json({message: 'User Already exists!'})
        })
        bcrypt.hash(password, 10, async (err, hash) => {
            User.create({username, email, phonenumber, password : hash}).then(() => {
                res.status(201).json({message: 'Successfully created user'})
            })
        })
    }catch(err){
        console.log(req.body)
        console.log(err)
    }
}