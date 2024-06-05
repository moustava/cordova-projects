function handlerRightSwipe(event) {
    if(event.target) {
        if(event.target.classList.contains('done')) {
            let taskList = document.getElementById("taskList");
            event.target.classList.remove('done');
            taskList.appendChild(event.target);
        }else {
            event.target.classList.add("done");
            let taskListDone = document.getElementById("taskList-done");
            taskListDone.appendChild(event.target);
        }
       
    }
}

function handlerLeftSwipe(event) {
    if(event.target) {
        event.target.remove();
    }
}

function addTask() {
    let task = document.getElementById("task");
    let taskList = document.getElementById("taskList");

    if(task.value) {
        let newTask = document.createElement("li");
        newTask.innerHTML = task.value;

        $(newTask).on('swiperight', handlerRightSwipe);
        $(newTask).on('swipeleft', handlerLeftSwipe);

        taskList.appendChild(newTask);

        $(taskList).listview('refresh');
        $(task).val('')
        $(task).focus();
    }
}

function deleteAllTasks() {
    console.log("Suppression ...")
    let taskList = document.getElementById("taskList");
    let tasks = taskList.getElementsByTagName("li");

    while(tasks[0]) {
        taskList.removeChild(tasks[0]);
    }
} 