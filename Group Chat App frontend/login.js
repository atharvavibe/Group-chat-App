async function login(e){
    try{
        e.preventDefault()
        const userLoginDetails = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        console.log(userLoginDetails)
        const response = await axios.post('http://localhost:3000/user/login', userLoginDetails)
        
        if(response.status === 201){
            alert(response.data.message)
            localStorage.setItem('token', response.data.token)
            window.location.href = 'chat.html'
        }else{
            console.log('Error loading')
        }
    }catch(err){
        console.log(err)
    }
}