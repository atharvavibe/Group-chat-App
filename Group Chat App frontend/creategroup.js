const globalChat = document.getElementById('globalchat')

globalChat.addEventListener('click', () => {
    window.location.href = 'chat.html'
})

window.addEventListener('DOMContentLoaded', showGroups)

async function showGroups(){
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:3000/group/getallgroups', {headers: {'Authorization': token}})
    console.log(response.data)
}

async function createChatGroup(e){
    e.preventDefault()
    const groupData = {
        groupName:e.target.groupname.value
    }
    const token = localStorage.getItem('token')
    console.log(groupData)
    const response = await axios.post('http://localhost:3000/group/creategroup', groupData, {headers: {'Authorization': token}})
    console.log(response)
}