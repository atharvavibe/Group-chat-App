const Chat = require('../models/chats')
const User = require('../models/user')


exports.sendMessage = async (req, res) => {
    try{
        console.log(req.body)
        const {messages} = req.body
        console.log(messages)
        if(!messages){
            return res.status(404).json({message: 'Please enter the message'})
        }

        const chats = await Chat.create({messages: messages, userId: req.user.id})
        res.status(200).json({message: 'Successfully sent the message', success: true})
    }catch(err){
        console.log(err)
    }
}