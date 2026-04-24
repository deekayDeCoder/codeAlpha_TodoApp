import { getSingleTodo } from "../script.js"

const taskName = document.querySelector(".task-form .task-name")
const taskDescription = document.querySelector(".task-form .task-description")
const taskTime = document.querySelector(".task-form .task-time")
const editTaskBtn = document.querySelector(".edit-task-btn")
const errorDisplayer = document.querySelector(".error-display-panel")

const targetId = location.search.substring(1)
const allTasks = JSON.parse(localStorage.getItem("unmarked")) || []
let tasks = []

let [task] = getSingleTodo(targetId)

taskName.value = task.name
taskDescription.value = task.description
taskTime.value = task.time


let update = {}

editTaskBtn.addEventListener("click", (e)=> {
    e.preventDefault()

    if (
        taskName.value !== "" &&
        taskDescription.value !== "" &&
        taskTime.value !== ""
    ) {
        update = {
            id: task.id,
            name: taskName.value,
            description: taskDescription.value,
            time: task.time,
            type: task.type
        }
        const tasks = allTasks.filter(tsk => tsk.id !== task.id)
        tasks.unshift(update)
        localStorage.setItem("unmarked", JSON.stringify(tasks))
        location.href = "../Screens/homePage.html"
    } else {
        errorDisplayer.textContent = "All fields are required"
        errorDisplayer.classList.remove("hide")
    }

})
