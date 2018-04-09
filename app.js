const form=document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks'); 
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');


loadEventListeners();




function loadEventListeners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded',getTasks);
    //Add task event
    form.addEventListener('submit',addTask);
    taskList.addEventListener('click',removeTask);
    clearBtn.addEventListener('click',clearAll);
    filter.addEventListener('keyup',filterTasks);
}

//Get tasks from Local Storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
         //create li element
    const li=document.createElement('li');

    //add class
    li.className='collection-item';
    //create text node and append to li

    li.appendChild(document.createTextNode(task));

    //create new link element
    const link=document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML=' <i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);
    //append Li to ul
    taskList.appendChild(li);
    });
}

//add task
function addTask(e){
    e.preventDefault();
    if(taskInput.value===''){
        alert("add a task");
    }
    //create li element
    const li=document.createElement('li');

    //add class
    li.className='collection-item';
    //create text node and append to li

    li.appendChild(document.createTextNode(taskInput.value));

    //create new link element
    const link=document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML=' <i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);
    //append Li to ul
    taskList.appendChild(li);
       //store in Local storage
    storeTaskInLocalStorage(taskInput.value); 
    //clear input
    taskInput.value='';


    
}

//store local storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?'))
        { e.target.parentElement.parentElement.remove();
         //remove from LS
         removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}


//remove from LS
function removeTaskFromLocalStorage(taskItem){
    // console.log(taskItem);
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent.indexOf(task)!=-1){
            console.log('spliced');
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}




//clear all
function clearAll(e){
    // taskList.innerHtml='';

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
 }


 //clear Tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}



 //filter
 function filterTasks(e){
     const text=e.target.value.toLowerCase();
     document.querySelectorAll('.collection-item').forEach(function(task){
        const item=task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!=-1){
            task.style.display='block'
        }else{
            task.style.display='none'
        }
     });
 }