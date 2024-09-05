const taskInput = document.querySelector(".task-input input");
const taskBox = document.querySelector(".tasks-box");

let editId;
let isEditTask = false;


//getting localeStorage
let todos = JSON.parse(localStorage.getItem("todo-list"));
if (!todos) { //if todos don't exist, pass an empty array
    todos = [];
}

/* -------------------------------------------------------------------------------- */
/* ! Show to do */
/* -------------------------------------------------------------------------------- */
function showTodo() {
    let li = ""; //create variable
    if (todos) {
        todos.forEach((todo, id) => {
            // se lo stato è completo metti il valore checked
            let isCompleted = todo.status == "completed" ? "checked" : "";
            //Object literals with html code 
            li += `<li class="task">
        <label for="${id}">
                    <input onclick="updateStatus(this)" type="checkbox" id="${id}">
                    <p class= ${isCompleted}>${todo.name}</p>
                </label>
                <div class="settings">
                    <i onclick="showMenu(this)" class="fa fa-ellipsis-h" aria-hidden="true"></i>
                    <ul class="task-menu">
                        <li onclick="editTask(${id}, '${todo.name}')"><i class="fa fa-pencil" aria-hidden="true"></i>Edit</li>
                        <li onclick="deleteTask(${id})"><i class="fa fa-trash" aria-hidden="true"></i>Delete</li>
                    </ul>
                </div>
                </li>`
        });
    }

    taskBox.innerHTML = li;
    if (todos.length === 0) {
        taskBox.innerHTML = `<h2>Non hai ancora nessun task, generane uno</h2>`
    }
}

showTodo();

/* -------------------------------------------------------------------------------- */
/* ! Show menu task */
/* -------------------------------------------------------------------------------- */
function showMenu(selectedTask) {
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e => {
        //remove class show when click 
        if (e.target.tagName != "I" || e.target != selectedTask) {
            taskMenu.classList.remove("show");
        }
    })
}
/* -------------------------------------------------------------------------------- */
/* ! Edit task */
/* -------------------------------------------------------------------------------- */
function editTask(taskId, taskName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = taskName;
}

/* -------------------------------------------------------------------------------- */
/* ! Delete task */
/* -------------------------------------------------------------------------------- */
function deleteTask(deleteid) {
    //remove item from array todos
    todos.splice(deleteid, 1);
    //update localStorage
    localStorage.setItem("todo-list", JSON.stringify(todos));
    //aggiorna l'intefaccia
    showTodo();
}

/* -------------------------------------------------------------------------------- */
/* ! Update status */
/* -------------------------------------------------------------------------------- */
function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        //update satus to compled
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        // update status to pending
        todos[selectedTask.id].status = "pending";
    }
    //update localStorage
    localStorage.setItem("todo-list", JSON.stringify(todos));
}


/* -------------------------------------------------------------------------------- */
/* ! Insert task */
/* -------------------------------------------------------------------------------- */

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if (e.key == "Enter" && userTask) {
        if (!isEditTask) {// se il task non è modificato
            let taskInfo = { name: userTask, status: "pending" }; //crea il task 
            todos.push(taskInfo); // add a task
        } else {
            isEditTask = false;
            todos[editId].name = userTask;

        }
        taskInput.value = ""; //pulisce il valore nell'input

        localStorage.setItem("todo-list", JSON.stringify(todos)); //salva il task nel localStorage
        showTodo();
    }
})

