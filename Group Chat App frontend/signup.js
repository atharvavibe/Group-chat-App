async function signup(e){
    try{
        e.preventDefault()
        const userSignupDetails ={
            username: e.target.username.value,
            email: e.target.email.value,
            phonenumber: e.target.phonenumber.value,
            password: e.target.password.value,
        }
        const response = await axios.post('http://localhost:3000/user/signup', userSignupDetails)
        console.log(userSignupDetails)

        if(response.status === 201){
            window.location.href = 'login.html'
        }else{
            console.log('Error loading')
        }
    }catch(err){
        console.log(err)
    }
}