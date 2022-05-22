'use strict'

//read existing notes from localstorage

const getsavednotes = function () {
    const notejson = localStorage.getItem('notes')
    // if (notejson !== null) {
    //     return JSON.parse(notejson)
    // }
    // else {
    //     return []
    // }

     try{
        return notejson !==null ?  JSON.parse(notejson): [] // this is the conditional operator it can replace the above code so i've commented those code

    } catch(e){
        return []

    }
    
}
// store notes to the local storage

const storeNotesInLocalSorage = function(notes){
    localStorage.setItem('notes', JSON.stringify(notes))
}
//remove notes by id
const removenote = function(id){
    const findex = notes.findIndex(function(note){
        return id === note.id
    })
    if(findex> -1){
    notes.splice(findex,1) 
}
}

//generate the DOM structure for the note

const generatedomnote = function (note) {
    const noteEl = document.createElement('a')
    const text = document.createElement('p')
    const statusEl = document.createElement('p')


    // this was for the removing X button setup no needed and better is above
//     const button = document.createElement('button')

//     // set up the remove button
//     button.textContent = 'X'
//     wrap.appendChild(button)
// button.addEventListener('click',function(){
//     removenote(note.id)
//     storeNotesInLocalSorage(notes)
//     filterfun(notes,filters)
// })

    //setup the note title
    if (note.title.length > 0) {
        text.textContent = note.title
    }
    else {
        text.textContent = 'unnamed note'
    }
    text.classList.add('list-item__title')
    noteEl.appendChild(text)

    //set up the link
    noteEl.setAttribute('href',`edit.html#${note.id}`)
    noteEl.classList.add('list-item')

        // set up status
        statusEl.textContent = generatelastedited(note.updatedAt)
        statusEl.classList.add('list-item__subtitle')
        noteEl.appendChild(statusEl)
    return noteEl
}

//sort you notes by one of three ways
const sortNotes = function(notes, sortBy){
if(sortBy === 'byEdited'){
    return notes.sort(function(a,b){
        if(a.updatedAt > b.updatedAt){
            return -1
        }
        else if(a.updatedAt < b.updatedAt){
            return 1
        }
        else{
            return 0 
        }
    })
}
else if(sortBy === 'byCreated'){
    return notes.sort(function(a,b){
        if(a.createdAt > b.createdAt){
            return -1
        }
        else if(a.createdAt < b.createdAt){
            return 1
        }
        else{
            return 0 
        }
    })
}
else if(sortBy === 'alphabetical'){
    return notes.sort(function(a,b){
        if(a.title.toLowerCase() < b.title.toLowerCase()){
            return -1
        }
        else if(a.title.toLowerCase() > b.title.toLowerCase()){
            return 1
        }
        else{
            return 0
        }
    })
}
else{
    return notes
}
}


// render or filtering the notes

const filterfun = function (notes, filters) {
    const noteEl = document.querySelector('#note')
    notes = sortNotes(notes,filters.sortBy)
    const tem = notes.filter(function (ttl) {
        return ttl.title.toLowerCase().includes(filters.searchtext.toLowerCase())
    })

    if(tem.length>0){
        noteEl.innerHTML = ''
    tem.forEach(function (note) {
        const pl = generatedomnote(note)
        noteEl.appendChild(pl)
    })
 }
  else{
    noteEl.innerHTML = ''
        const emptymsg = document.createElement('h3')
        emptymsg.textContent = 'No Notes Found!!'
        noteEl.appendChild(emptymsg)

    }

    
    
}

// generete the last edited title and bdy

const generatelastedited = function(timestamp){
    return`Last updated ${moment(timestamp).fromNow()} `
}
 







