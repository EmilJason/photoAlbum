function googleLogin(){
    let provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider)
     .then(user=>console.log(user))
     .catch(e=>console.log(e.message))
}

let google = document.getElementById("googleLogin")

google.addEventListener("click",googleLogin)

let logout = document.getElementById("logout")
logout.addEventListener("click",()=>{
    try {
        firebase.auth().signOut()
    } catch (e) {
        console.log(e.message)
    }
})