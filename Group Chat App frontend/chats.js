async function sendChat(e){
    try{
        e.preventDefault()
        const userChat = e.target.chat.value
        if(!userChat){
            return alert('Enter a message!')
        }
        const chats = {
            messages: userChat
        }
        const token = localStorage.getItem('token')
        const response = await axios.post('http://localhost:3000/chat/sendmessage', chats, {headers: {"Authorization" : token}})
        console.log(response)
    }catch(err){
        console.log(err)
    }
}