let uploadFile = document.getElementById("uploadFile")
let db = firebase.firestore()
let storage = firebase.storage()

function save(item){
    db.collection("files").add({
        filename: item.name,
        url: item.url,
        uploadedBy: userCredential.email
    }).then(()=>console.log("saved"))
}

function upload(){ 
    let uploadTask=storage.ref().child(`images/${uploadFile.files[0].name}`)
     .put(uploadFile.files[0])
     
    uploadTask.on("state_changed",
    snapshot=>{
        console.log("state")
    },
    e=>console.log(e.message),
    ()=>{
        uploadTask.snapshot.ref.getDownloadURL()
        .then(url=>{
            save({
                name: uploadFile.files[0].name,
                url
            })
            loadFiles()
        })
    })
    
}
let uploadBtn = document.getElementById("uploadBtn")
uploadBtn.addEventListener("click", upload)