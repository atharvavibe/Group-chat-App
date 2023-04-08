const globalChat = document.getElementById('globalchat')
const joingroupContainer = document.getElementById('join-group-container')

globalChat.addEventListener('click', () => {
    window.location.href = 'chat.html'
})

//window.addEventListener('DOMContentLoaded', showGroups)

function showMygroupsonUI(allGroups){
    for(var i = 0; i < allGroups.length; i++){
        const joinGroup = document.createElement('div')
        joinGroup.classList.add('join-group')
        joinGroup.innerHTML = `<p><b>${allGroups[i].groupname}</b></p>
        <button>Join</button>` 
        console.log(joinGroup)
        joingroupContainer.appendChild('joinGroup')
    }
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
    e.target.groupname.value = ''
}