const taskName = document.querySelector(".task-form .task-name")
const taskDescription = document.querySelector(".task-form .task-description")
const taskTime = document.querySelector(".task-form .task-time")
const addTaskBtn = document.querySelector(".addTaskBtn")
const errorDisplayer = document.querySelector(".error-display-panel")

const allTasks = JSON.parse(localStorage.getItem("unmarked")) || []
let tasks = []
let task = {}

addTaskBtn.addEventListener("click", (e)=> {
    e.preventDefault()

    if (
        taskName.value !== "" &&
        taskDescription.value !== "" &&
        taskTime.value !== ""
    ) {
        task = {
            id: crypto.randomUUID(),
            name: taskName.value,
            description: taskDescription.value,
            time: taskTime.value,
            type: "unmarked"
        }
        allTasks.unshift(task)
        localStorage.setItem("unmarked", JSON.stringify(allTasks))
        location.href = "../Screens/homePage.html"
    } else {
        errorDisplayer.textContent = "All fields are required"
        errorDisplayer.classList.remove("hide")
    }

})