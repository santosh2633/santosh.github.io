'use strict'

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const updatedtimestamp = document.querySelector('#timestamp')

const noteId = location.hash.substring(1)
let notes = getsavednotes()
let note = notes.find(function(note){
    return note.id === noteId
})
if(!note){ // here truthy and falsy property is being used that means if note has undefined or null value then if statement is going to executed because here ! operetor is used
    location.assign('notes.html')
}

titleElement.value = note.title
bodyElement.value = note.body
updatedtimestamp.textContent = generatelastedited(note.updatedAt)

titleElement.addEventListener('input',function(e){
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    updatedtimestamp.textContent = generatelastedited(note.updatedAt)
    storeNotesInLocalSorage(notes)

})

bodyElement.addEventListener('input',function(e){
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    updatedtimestamp.textContent = generatelastedited(note.updatedAt)
    storeNotesInLocalSorage(notes)
})

removeElement.addEventListener('click',function(e){
    removenote(note.id)
    storeNotesInLocalSorage(notes)
    location.assign('notes.html')
})

 window.addEventListener('storage',function(e){
   if(e.key === 'notes'){
       notes = JSON.parse(e.newValue)

        note = notes.find(function(note){
        return note.id === noteId
    })
    if(!note){  // here truthy and falsy property is being used that means if note has undefined or null value then if statement is going to executed because here ! operetor is used
        location.assign('notes.html')
    }
    
    titleElement.value = note.title
    bodyElement.value = note.body
    updatedtimestamp.textContent = generatelastedited(note.updatedAt)
    
   }

})


  