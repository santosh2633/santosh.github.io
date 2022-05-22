'use strict'

let notes = getsavednotes()

const filters ={
	searchtext:'',
	sortBy: 'byEdited'
}

filterfun(notes,filters)

document.querySelector('#create-note').addEventListener('click',function(e){
	const id = uuidv4()
	const timestamp = moment().valueOf()

	notes.push({
		id: id,
		title: '',
		body: '',
		createdAt: timestamp,
		updatedAt: timestamp
	})
	storeNotesInLocalSorage(notes)
	// filterfun(notes,filters)  we don't need it after using the location . assign 
	location.assign(`edit.html#${id}`)
	// e.target.elements.text.value =''
})

window.addEventListener('storage',function(e){
	if(e.key === 'notes'){
		notes = JSON.parse(e.newValue)

		filterfun(notes,filters)
	}
})
document.querySelector('#search-text').addEventListener('input',function(e){
	filters.searchtext = e.target.value
	filterfun(notes,filters)

})
	
document.querySelector('#filter-by').addEventListener('change',function(e){
	filters.sortBy = e.target.value
	filterfun(notes,filters)
})

//'march 3 2020 12:00:00'
// document.querySelector('#text').addEventListener('input',function(e){
	 
// 	filters.searchtext=e.target.value
// 	filterfun(notes,filters)
// })

	// document.querySelector('#add').addEventListener('click',function(){
	// 	const p = document.createElement('p')
	// 	 p.textContent = tem
	// 	document.querySelector('body').appendChild(p)
	// })


	// 	const p = document.createElement('p')
// 	p.textContent=e.target.value
// 	document.querySelector('#add').addEventListener('click',function(){
// 		document.querySelector('body').appendChild(p)
// 	})
// })