updateDateToday();
// validateTask();

function updateDateToday() {
    // get a display date
    const dateDisplay = document.querySelector(".date-today");
    const todayValue = new Date();
    dateDisplay.innerHTML = todayValue.toLocaleDateString();
}


function taskInsert() {
    const task = document.querySelector('.taskInsert');
    console.log('Task inserito:', task);
    const submit = document.querySelector('#submit');
    submit.addEventListener("click", (e) => {
        e.preventDefault();
        console.log('Task inserito:', task);
    })
};

taskInsert();

// function validateTask() {
//     let task = document.querySelector('#taskInsert').value;
//     const err = document.querySelector('.error');
//     const submit = document.querySelector('#submit');
//     // submit.addEventListener("click", (e) => {
//     //     e.preventDefault();
//     //     alert(task);
//     //     if (task == "") {
//     //         err.innerHTML = "Inserisci una task";
//     //     } else {
//     //         err.innerHTML = "ok, vai";
//     //     }
//         console.log('La task è', task);
//     // })



// }