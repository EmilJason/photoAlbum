let content = document.getElementById("content")
let username =document.getElementById("userName")
let userPhoto = document.getElementById("userphoto")
let files = document.getElementById("files")
let userCredential = null;

function loadFiles(){
    let db = firebase.firestore()
    db.collection("files").where("uploadedBy","==",userCredential.email)
     .get().then(snapshot=>{
         
         while (files.hasChildNodes()){
               files.removeChild(files.firstChild)
            }
        snapshot.forEach(item=>{
            let card = document.createElement("div")
            let cardImg = document.createElement("img")
            let cardBody = document.createElement("div")
            let cardTitle = document.createElement("h3")
            let cardText = document.createElement("p")
            let deleteBtn = document.createElement("button")
            
            card.className = "card mx-auto my-3"
            cardImg.className= "card-img-top"
            cardBody.className="card-body"
            cardTitle.className = "card-title"
            cardText.className = "card-text"
            deleteBtn.type = "button"
            deleteBtn.className = "btn btn-warning"
            
            card.id = item.id
            card.style.width = "18rem"
            cardImg.src = item.data().url
            cardImg.width = "500"
            cardImg.height = "500"
            cardTitle.innerText = item.data().filename
            cardText.innerText = `Uploaded By: ${item.data().uploadedBy}`
            deleteBtn.innerText = "Delete"
            
            //deleting a file in storage and database
            deleteBtn.addEventListener("click", ()=>{
                deleteFunction(item)
            })
            
            cardBody.append(cardTitle)
            cardBody.append(cardText)
            card.append(cardImg)
            card.append(cardBody)
            card.append(deleteBtn)
            files.append(card)
            
        })
    })
}



function checkUser(){
    firebase.auth().onAuthStateChanged(user=>{
        console.log(user)
        content.style.display = user === null ? "none" : "block"
        
        userCredential = user
        
        username.innerText = user.displayName
        userPhoto.src = user.photoURL
        loadFiles()
        renderbtn(user)
    })
}

function deleteFunction(item){
    let storage = firebase.storage()
    let deleteFile = storage.ref().child(`images/${item.data().filename}`)
    deleteFile.delete().then(()=>console.log("file deleted"))
    
    //deleting the file info in the database
    db.collection("files").doc(item.id).delete()
        .then(()=>console.log("removed"))
    
    console.log(item.id)
    
    loadFiles()
}

checkUser()
