import feed from './pages/feed/index.js'
import signup from './pages/signup/index.js'
import login from './pages/login/index.js'
import createprofile from './pages/createprofile/index.js'
import {createUser, asyncSendProfileData} from './lib/index.js'


// myFunction();

// variável pra acessar o banco de dados
const mainLogin = document.getElementById("main")



window.addEventListener("load", () => {
  mainLogin.innerHTML = login()

  const signUpBtn = document.getElementById("signup-btn") 
  signUpBtn.addEventListener("click", (e) => {
    e.preventDefault()
    mainLogin.innerHTML= signup()

    const registerBtn = document.getElementById("register-btn")

    registerBtn.addEventListener("click", (e) =>{
      e.preventDefault()
      const registerEmail = document.getElementById("register-email").value
      const registerPassword =  document.getElementById("register-password").value

      createUser(registerEmail, registerPassword)
        .then(() => {
          mainLogin.innerHTML = createprofile()
          const sendProfileBtn = document.getElementById("send-profile")
          sendProfileBtn.addEventListener("click", (e) => {
            e.preventDefault()
            const userName = document.getElementById("input-username").value
            const image = document.getElementById("input-profile-image").value
            asyncSendProfileData(userName, image)

          })
        })
        
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error", errorCode,errorMessage)

          switch(errorCode){
            case "auth/email-already-in-use":
              alert("Esse e-mail já é cadastrado")
              break

            case "auth/invalid-email":
              alert("Endereço de e-mail inválido")
              break

            case "auth/weak-password":
              alert("A senha escolhida é fraca")
              break
          }
        })
    

    })   
  })
  
})













// firebase.auth().signInWithEmailAndPassword(email, password)
//   .then((userCredential) => {
//     // Signed in
//     var user = userCredential.user;
//     console.log("logou!")
//     // ...
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//   });