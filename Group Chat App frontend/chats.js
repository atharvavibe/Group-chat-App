const outgoingMessage = document.getElementById('outgoing message')

window.addEventListener('DOMContentLoaded', showUserMessages())

async function showUserMessages(){
    setInterval(() => {
        getChats()
    }, 1000)
}

async function getChats(){
   try{ 
        const token = localStorage.getItem('token')
        const response = axios.get('http://localhost:3000/chat/getmessage', {headers: {"Authorization": token}}).then(response => {
            console.log(response)
        })
    }catch(err){
        console.log(err)
    }
}

async function sendChat(e){
    try{
        e.preventDefault()
        const userChat = e.target.chat.value
        //showMessageOnUI(userChat)
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

// function showMessageOnUI(userChat){

// }