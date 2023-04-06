const outgoingMessage = document.getElementById('outgoing message')
const usersHead = document.getElementById('users-head')
const usersList = document.getElementById('users-list')
const chatsContainer = document.getElementById('chats')
const messageInput = document.getElementById('user-input')
const createGroup = document.getElementById('creategroupBtn')
const groupList = document.getElementById('group-list')


window.addEventListener('DOMContentLoaded', showAll)

function showAll(){
    showUserMessagesAndGroups()
    showUserMessages()
}


async function showUserMessagesAndGroups(){
    try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:3000/group/getusergroups', {headers: {"Authorization" : token}})
        //console.log(res.data.getusergroups[0].groupname)
        showMygroupsonUI(res.data.getusergroups)
    } catch (err) {
        console.log(err)
    }
}
function showMygroupsonUI(myGroups){
    for(var i = 0; i < myGroups.length; i++){
        const myGroupList = document.createElement('div')
        myGroupList.classList.add('chat-groups')
        myGroupList.innerHTML = `<p>${myGroups[i].groupname}<p>`
        groupList.appendChild(myGroupList)
    }
    
}

async function showUserMessages(){
    setInterval(() => {
        getGlobalChats()
    }, 2000)
}

async function getGlobalChats(){
   try{ 
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:3000/chat/getmessage', {headers: {"Authorization": token}})
            console.log(response)
            showNumberofUsers(response.data.totalUsers)
            showUsers(response.data.allUsers, token)
            showMessageOnUI(response.data.chats, token)
     
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
        e.target.chat.value = ''
    }catch(err){
        console.log(err)
    }
}

function showNumberofUsers(totalUsers){
    console.log(totalUsers)
    usersHead.innerHTML = '<h3>People</h3>'
    const nunmberofUsers = document.createElement("h4")
    if(totalUsers != 0){
        nunmberofUsers.innerText = totalUsers - 1
    }else{nunmberofUsers.innerText = totalUsers}
    usersHead.appendChild(nunmberofUsers)
}

function showUsers(allUsers, token){
    console.log(allUsers)
    usersList.innerHTML = ''
    const res = parseJwt(token)
    for(var i = 0; i < allUsers.length; i++){
         const users = document.createElement('p')
            if(res.username != allUsers[i].username){
                users.innerText = allUsers[i].username
            }
        usersList.appendChild(users)
    }


}

function showMessageOnUI(chats, token){
    chatsContainer.innerHTML = ''
    const res = parseJwt(token)
    for(var i = 0; i < chats.length; i++){
        if(res.username == chats[i].user.username){
            const messageOutgoing = document.createElement('div')
            messageOutgoing.classList.add('outgoing')
           messageOutgoing.innerHTML = `
           <h5>Me</h5>
           <p>${chats[i].messages}</p>
           `
           chatsContainer.appendChild(messageOutgoing)
        }
           else{ const messageIncoming = document.createElement('div')
            messageIncoming.classList.add('incoming')
            messageIncoming.innerHTML = `
            <h5>${chats[i].user.username}</h5>
            <p>${chats[i].messages}</p>
            `
            chatsContainer.appendChild(messageIncoming)}
    }
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

createGroup.addEventListener('click', () => {
    window.location.href = 'creategroup.html'
})