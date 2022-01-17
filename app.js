const addToDoButton = document.getElementById('liveToastBtn');
const toDoContainer = document.getElementsByClassName('header');
const inputText = document.getElementById('task');
const liste = document.getElementById('list');




eventListeners();


function eventListeners(){
    // submit event
    addToDoButton.addEventListener('click',addNewItem);
    liste.addEventListener('click', deleteItem);
    liste.addEventListener('click', checkeditem);
}



// add new item
function addNewItem(e){
    
    if (inputText.value === ''){
        alert('Add New Item');
    }
    // create li
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(inputText.value));
    // cerate button
    const button = document.createElement('button');
    
    button.classList='close float-right';
    button.innerHTML='<span aria-hidden="true" class="delete">&times;</span>';

    // add a to li
    li.appendChild(button);
    // add li to ul
    liste.appendChild(li);
    
    addNewItemToStorage(inputText.value); 

    // clear input
    inputText.value='';
    
    e.preventDefault();
    
}

function gettodosFromStorage(){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos =JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addNewItemToStorage (inputText){
    let todos =gettodosFromStorage();
    todos.push(inputText);
    localStorage.setItem("todos",JSON.stringify(todos));
}



// delete an item
function deleteItem(e) {
    
    if (e.target.className === 'delete') {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    }
    
    e.preventDefault();

}

function deleteTodoFromStorage(deletetodo){
    let todos = gettodosFromStorage();

    todos.forEach(function(inputText,index){
        if (inputText === deletetodo){
            inputText.splice(index,1);
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));

}

// checkeditem
function checkeditem (e){

    e.target.classList.toggle("checked");

    e.preventDefault();
}








