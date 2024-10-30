
const addtaskmodel = document.getElementById("taskmodal");
const btnTask = document.getElementById("btnadtasks");
const btncancel = document.getElementById("btncancel");


btnTask.addEventListener("click", function () {
    addtaskmodel.classList.remove("hidden");
});

btncancel.addEventListener("click", function(){
    addtaskmodel.classList.add("hidden");
})

