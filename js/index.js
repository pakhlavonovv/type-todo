const result = document.getElementById("result")
const user_modal = document.getElementById("user-modal")
const close = document.getElementById("close")
const save = document.getElementById("save")
let todos = JSON.parse(localStorage.getItem("todos")) || [
    {
        status: "open", tasks: []
    },
    {
        status: "pending", tasks: []
    },
    {
        status: "inproge", tasks: []
    },
    {
        status: "complete", tasks: []
    }
]
let form = {}
document.addEventListener("DOMContentLoaded", function(){
    displayTodos()
})
close.addEventListener("click", function(){
    toggleModal("none");
})
window.addEventListener("click", function (rvent){
    if(event.target === user_modal){
        toggleModal("none")
    }
})
function displayTodos (){
    result.innerHTML = ""
    todos.forEach(item => {
        let col = document.createElement('div')
        col.classList.add('col-md-3')
        let task_list = item.tasks.map(task => {
            return `<li>${task}</li>`
        })
        col.innerHTML = `<div class="card">
            <div class="card-header">
            <h3 class="text-center">${item.status.toUpperCase()}</h3>
            </div>
            <div class="card-body">
            <ol>
                ${task_list}
            </ol>
            </div>
            <div class="card-footer">
            <div class="d-flex justify-content-center">
            <button onclick="openModal()" class="btn btn-success">Add task</button>
            </div>
            </div>
        </div>`
        result.appendChild(col)
    })
}
function openModal(){
    toggleModal("block")
}
function toggleModal (status){
    user_modal.style.display = status
}
function handleChange(event){
    const {name, value} = event.target
    form = {...form, [name]:value}
}
function addTask (){
    const {task, status} = form
    todos.forEach(item => {
        console.log(item)
        if(item.status === status){
            item.tasks.push(task)
        }
    })
    saveStorage()
    displayTodos()
}
function saveStorage(){
    localStorage.setItem("todos", JSON.stringify(todos))
}