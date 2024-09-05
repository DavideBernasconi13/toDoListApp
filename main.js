const taskInput = document.querySelector(".task-input input");
//getting localeStorage
let todos = JSON.parse(localStorage.getItem("todo-list"));

//mostra i todo
function showTodo() {
    todos.forEach((todo, id) => {
        console.log(id, todo);
    })
}

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if (e.key == "Enter" && userTask) {
        if (!todos) { //if todos don't exist, pass an empty array
            todos = [];
        }
        taskInput.value = ""; //pulisce il valore nell'input
        let taskInfo = { name: userTask, status: "pending" }; //crea il task 
        todos.push(taskInfo); // add a task
        localStorage.setItem("todo-list", JSON.stringify(todos)); //salva il task nel localStorage
        showTodo();
    }
})