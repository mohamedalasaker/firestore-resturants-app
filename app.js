let ResturantsLists = document.getElementById('resturants-list');
let form = document.getElementById('resturants-form');



let resturants = db.collection('resturants').orderBy('name');

// on doc status change like add a doc or remove w doc it fires

resturants.onSnapshot( snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach( change => {
        if(change.type == 'added'){
            RenderToHtml(change.doc)
        }else if(change.type == 'removed'){
            let removed = document.querySelector(`[data-id=${change.doc.id}]`)
            ResturantsLists.removeChild(removed)
        }
    })
})


// to update a doc  

// db.collection('resturants').doc('yjkAihOoHbWpEK7JmFy9').update({
//     name:'kfc',
//     city:'jeddah'
// })



// render to html
function RenderToHtml(data) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let x = document.createElement('span')
    
    x.textContent = 'x';
    name.textContent = data.data().name;
    city.textContent = data.data().city;
    
    li.setAttribute('data-id',data.id)
    li.classList.add('list-group-item')
    name.classList.add('resturant-title')
    city.classList.add('resturant-city')
    x.classList.add('delete-button')
    li.appendChild(x)
    li.appendChild(name)
    li.appendChild(city)
    
    ResturantsLists.appendChild(li)

    x.addEventListener('click', () => {
        db.collection('resturants').doc(li.getAttribute('data-id')).delete()
    })
}

// when form submitted
form.addEventListener('submit' , function(e){
    e.preventDefault();
    // get values from input

    let obj = {
        name:form.name.value,
        city:form.city.value
    }
    // add the obj as a doc in the firestore cloud 
    db.collection('resturants').add(obj)
    // clear inputs
    form.name.value ='';
    form.city.value='';
})