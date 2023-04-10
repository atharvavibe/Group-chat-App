
function showMyGroups(e){
    e.preventDefault()
    window.location.href = 'chat.html'
}

async function addUser(e){
    try {
     e.preventDefault()
     const userDetails = {
        username: e.target.username.value,
        groupname: e.target.groupname.value,
        isAdmin: true
     }   
     console.log(userDetails)
     const token = localStorage.getItem("token")
     const response = await axios.post(`http://localhost:3000/addgroupchatuser/adduser`, userDetails, {headers: {"Authorization": token}})
     console.log(response)
     e.target.username.value = ''
     e.target.groupname.value = ''
    } catch (err) {
        console.log(err)
    }
}

async function removeUser(e){
    try {
        e.preventDefault()
     const userDetails = {
        username: e.target.username.value,
        groupname: e.target.groupname.value,
        isAdmin: true
     }   
     console.log(userDetails)
     const token = localStorage.getItem("token")
     const response = await axios.post(`http://localhost:3000/removegroupchatuser/removeuser`, userDetails, {headers: {"Authorization": token}})
     console.log(response)
     e.target.username.value = ''
     e.target.groupname.value = ''
    } catch (err) {
        console.log(err)
    }
}