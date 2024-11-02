let tasks = [];


const addtaskmodel = document.getElementById("taskmodal");
const btnTask = document.getElementById("btnadtasks");
const btncancel = document.getElementById("btncancel");
const btnEditcancel = document.getElementById("btnEditcancel");
const btnSubTask = document.getElementById("btnSubTask");
const btnSubEditTask = document.getElementById("btnSubEditTask");
const editTaskmodel = document.getElementById("editTaskmodal")
let editIndex = -1


btnTask.addEventListener("click", function () {

    resetFormulaire();
    addtaskmodel.classList.remove("hidden");
});

btnEditcancel.addEventListener("click", function () {
    resetEditFormulaire();
    editTaskmodel.classList.add("hidden")

})



btncancel.addEventListener("click", function () {
    resetFormulaire();
    addtaskmodel.classList.add("hidden");
});





btnSubTask.addEventListener('click', (event) => {
    event.preventDefault();

    const title = document.getElementById("taskTitle").value;
    const dueDate = document.getElementById("taskDate").value;
    const description = document.getElementById("taskDescription").value;
    const status = document.getElementById("taskStatus").value;
    const priority = document.getElementById("taskPriority").value;


    if (!title || !dueDate || !description || !status || !priority) {
        alert("Veuillez remplir tous les champs pour ajouter une tache.");
        return; 
    }

    const taskData = {
        tasktitle: title,
        taskdueDate: dueDate,
        taskdescription: description,
        taskstatus: status,
        taskpriority: priority,
    };

    tasks.push(taskData);
    afficherTasks();
    resetFormulaire();
    addtaskmodel.classList.add("hidden");

});




btnSubEditTask.addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.getElementById("editTaskTitle").value;
    const dueDate = document.getElementById("editTaskDate").value;
    const description = document.getElementById("editTaskDescription").value;
    const status = document.getElementById("editTaskStatus").value;
    const priority = document.getElementById("editTaskPriority").value;

    const editTaskData = {
        tasktitle: title,
        taskdueDate: dueDate,
        taskdescription: description,
        taskstatus: status,
        taskpriority: priority,
    };

    tasks[editIndex] = editTaskData;
    afficherTasks();
    resetEditFormulaire();
    editTaskmodel.classList.add("hidden");
    editIndex = -1;

})




function deleteTask(index) {
    if (index > -1 && index < tasks.length) {
        tasks.splice(index, 1);
        afficherTasks();
    }
}



function editTask(index) {
    const task = tasks[index];
    document.getElementById("editTaskTitle").value = task.tasktitle;
    document.getElementById("editTaskDate").value = task.taskdueDate;
    document.getElementById("editTaskDescription").value = task.taskdescription;
    document.getElementById("editTaskStatus").value = task.taskstatus;
    document.getElementById("editTaskPriority").value = task.taskpriority;
    editIndex = index;
    editTaskmodel.classList.remove("hidden");
}






function afficherTasks() {
    document.getElementById("todoTasks").innerHTML = '';
    document.getElementById("inprogressTasks").innerHTML = '';
    document.getElementById("doneTasks").innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.className = `border-l-8 border-2 p-1 bg-white ${PriorityColor(task.taskpriority)} rounded-md h-32 flex flex-col justify-between mb-6`;
        taskElement.innerHTML = `
            <p class="text-lg mt-2 ml-2">${task.tasktitle}</p>
            <p class="text-sm text-gray-600 ml-2">${task.taskdescription}</p>
            <p class="text-sm text-gray-600">Échéance: ${task.taskdueDate}</p>
            <div class="flex justify-end gap-3">
                <button class="bg-red-600 rounded-md text-white w-20 p-2" onclick="deleteTask(${index})">Delete</button>
                <button class="bg-yellow-600 rounded-md text-white w-20 p-2" onclick="editTask(${index})">Edit</button>
            </div>`;

        if (task.taskstatus === "Todo") {
            document.getElementById("todoTasks").appendChild(taskElement);
        } else if (task.taskstatus === "Inprogress") {
            document.getElementById("inprogressTasks").appendChild(taskElement);
        } else if (task.taskstatus === "Done") {
            document.getElementById("doneTasks").appendChild(taskElement);
        }
    });
}




function PriorityColor(taskpriority) {
    if (taskpriority === "P1") {
        return "border-red-500";
    } else if (taskpriority === "P2") {
        return "border-yellow-500";
    } else if (taskpriority === "P3") {
        return "border-green-500";
    }
}




function resetFormulaire() {
    document.getElementById("taskTitle").value = '';
    document.getElementById("taskDate").value = '';
    document.getElementById("taskDescription").value = '';
    document.getElementById("taskStatus").value = '';
    document.getElementById("taskPriority").value = '';
}
function resetEditFormulaire() {
    document.getElementById("editTaskTitle").value = '';
    document.getElementById("editTaskDate").value = '';
    document.getElementById("editTaskDescription").value = '';
    document.getElementById("editTaskStatus").value = '';
    document.getElementById("editTaskPriority").value = '';
}
