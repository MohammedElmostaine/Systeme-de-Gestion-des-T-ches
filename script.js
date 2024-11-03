let tasks = [];


const addtaskmodel = document.getElementById("taskmodal");
const btnTask = document.getElementById("btnadtasks");
const btncancel = document.getElementById("btncancel");
const btnEditcancel = document.getElementById("btnEditcancel");
const btnSubTask = document.getElementById("btnSubTask");
const btnSubEditTask = document.getElementById("btnSubEditTask");
const editTaskmodel = document.getElementById("editTaskmodal");
const btnSubMorTask =document.getElementById("btnSubMorTask");
const body = document.getElementsByTagName("body");
document.body.style.position = 'relative'
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
    submitTask()
    
});


    
btnSubMorTask.addEventListener("click",(event) =>{
    event.preventDefault();
    submitTask();
    addtaskmodel.classList.remove("hidden");
    
});





function submitTask(){
    const title = document.getElementById("taskTitle").value;
    const dueDate = document.getElementById("taskDate").value;
    const description = document.getElementById("taskDescription").value;
    const status = document.getElementById("taskStatus").value;
    const priority = document.getElementById("taskPriority").value;


    if (!title || !dueDate || !description || !status || !priority) {
        alert("Please complete all fields to add a task.");
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
    
    
    const div = document.createElement("div");
    div.className = `absolute top-2 right-2 border-2 border-gray-600 rounded-md z-20 min-w-20 bg-blue-300 p-2 rounded-lg text-white`;
    div.innerHTML = `
        <span class="animate-ping  absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        
        <p class=" text-white">Task added <i class="fa-solid fa-check" style="color: #00ff4c;"></i></p>
    `;

    document.body.appendChild(div); 
    setTimeout(() => {
        div.remove();
    }, 2000);


}




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






const filterPriority = document.getElementById("filterPriority");
const sortTasks = document.getElementById("sortTasks");

filterPriority.addEventListener("change", afficherTasks);
sortTasks.addEventListener("change", afficherTasks);

function afficherTasks() {
    const selectedPriority = filterPriority.value;
    const sortOption = sortTasks.value;

    let filteredTasks = tasks.filter(task => {
        return selectedPriority ? task.taskpriority === selectedPriority : true;
    });

    if (sortOption === "date") {
        filteredTasks.sort((a, b) => new Date(a.taskdueDate) - new Date(b.taskdueDate));
    } else if (sortOption === "priority") {
        filteredTasks.sort((a, b) => {
            const priorities = { P1: 1, P2: 2, P3: 3 };
            return priorities[a.taskpriority] - priorities[b.taskpriority];
        });
    }

    document.getElementById("todoTasks").innerHTML = '';
    document.getElementById("inprogressTasks").innerHTML = '';
    document.getElementById("doneTasks").innerHTML = '';
    let todoCountt = 0;
    let InprogressCountt = 0;
    let doneCountt = 0;

    filteredTasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.className = `border-l-8 border-2 p-1 bg-white ${PriorityColor(task.taskpriority)} rounded-md min-h-32 flex flex-col justify-between mb-6`;
        taskElement.innerHTML = `
            <div class="flex justify-between"><h1 class="text-lg font-bold mt-2 ml-2">${task.tasktitle}</h1><span>${task.taskpriority}</span></div>
            <p class="text-sm font-medium text-gray-600 ml-2">${task.taskdescription}</p>
            <div class="flex justify-between gap-3">
            <p class="text-sm text-gray-600">Échéance: ${task.taskdueDate}</p>
            <div class="flex justify-end gap-3">
                <button class="text-white" onclick="editTask(${index})"><i class="fa-regular fa-pen-to-square" style="color: #74C0FC;"></i></button>
                <button class="text-white" onclick="deleteTask(${index})"><i class="fa-solid fa-trash-can" style="color: #74C0FC;"></i></button>
                </div>
            </div>`;

        if (task.taskstatus === "Todo") {
            document.getElementById("todoTasks").appendChild(taskElement);
            todoCountt++;
        } else if (task.taskstatus === "Inprogress") {
            document.getElementById("inprogressTasks").appendChild(taskElement);
            InprogressCountt++;
        } else if (task.taskstatus === "Done") {
            document.getElementById("doneTasks").appendChild(taskElement);
            doneCountt++;
        }
    });

    document.getElementById("todoCount").innerText = todoCountt;
    document.getElementById("InprogressCount").innerText = InprogressCountt;
    document.getElementById("doneCount").innerText = doneCountt;
}



function PriorityColor(taskpriority) {
    if (taskpriority === "P1") {
        return "border-red-500";
    } else if (taskpriority === "P2") {
        return "border-orange-500";
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
