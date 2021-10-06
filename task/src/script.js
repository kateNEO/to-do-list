let d = document;
let taskList = d.getElementById("task-list");
let addTask = d.getElementById("add-task-button");
let tasks = [];
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem("tasks"));
addTasksInHTML();

function  Task (name){
    this.name= name;
    this.check = false;
}
function pushLocaleStorage(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}
function addTasksInHTML(){
    taskList.innerHTML = "";
    if(tasks.length > 0) {
        tasks.forEach((task, index) => {
            createTaskHTML(task, index);
        })
    }
}

addTask.addEventListener("click",  function (e){
 getValueTaskName()
})
d.addEventListener("keypress", function (e){
    if(e.key === "Enter"){
        getValueTaskName()
    }
})
function getValueTaskName(){
    let taskName = d.getElementById("input-task").value;
    tasks.push(new Task (taskName));
    pushLocaleStorage();
    d.getElementById("input-task").value = "";
    addTasksInHTML();
}

function createTaskHTML(task, index) {
    let li = d.createElement('li');
    taskList.appendChild(li);
    li.id = index;
    let input = li.appendChild(d.createElement("input"));
    input.setAttribute("type", "checkbox");
    input.checked = task.check;    
    input.id = index;
    let span = li.appendChild( d.createElement("span"));
    span.setAttribute("class", "task");
    span.innerHTML = task.name;
    let button = li.appendChild( d.createElement("button"));
    button.id = index;
    button.setAttribute("class",  "delete-btn");
    button.innerHTML = "X";
}

taskList.addEventListener("click",  function (e){
  let buttonClickItem = e.target;
  let ind = buttonClickItem.id;
    if(buttonClickItem.tagName  === "BUTTON") {
        deleteTask(ind)
    }
    if (buttonClickItem.tagName === "INPUT"){
         changeStatusCompleted(ind)
    }
})

function deleteTask(ind) {
    tasks.splice(ind,1);
    d.getElementById(ind).remove();
    pushLocaleStorage()
    addTasksInHTML()
}
   function changeStatusCompleted(ind){
    tasks[ind].check=!tasks[ind].check;
    pushLocaleStorage()
    addTasksInHTML()
   }



