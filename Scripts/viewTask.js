import { getSingleTodo, markTaskAsDone, deleteTask } from "../script.js";

const targetId = location.search.substring(1);
const [unMarkedTarget] = getSingleTodo(targetId, "unmarked");
const [markedTarget] = getSingleTodo(targetId, "marked");
const editTaskBtn = document.querySelector("a.edit-todo");
const targetTask = unMarkedTarget || markedTarget;

const todoControlPanel = document.querySelector(".todo-controls-panel");
const taskType = document.querySelector(".task-type");
const taskTime = document.querySelector(".task-time");
const taskName = document.querySelector(".task-name");
const taskDescription = document.querySelector(".task-description");

if (targetTask.type === "unmarked") {
  editTaskBtn.classList.remove("hide");
  editTaskBtn.setAttribute("href", `../Screens/editTodo.html?${targetId}`);
  todoControlPanel.innerHTML = `
                <button class="todo-control mark-done">
          <span class="mark-done">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="green"
              class="bi bi-check-all mark-done"
              viewBox="0 0 16 16"
            >
              <path
                class="mark-done"
                d="M8.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14l.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"
              />
            </svg>
          </span>
          Mark as Done
        </button>
        <button class="todo-control edit-todo">
          <span class="edit-todo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="gray"
              class="bi bi-pencil-square edit-todo"
              viewBox="0 0 16 16"
            >
              <path
                class="edit-todo"
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                class="edit-todo"
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
          </span>
          Edit
        </button>
        <button class="todo-control delete-todo">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="red"
              class="bi bi-trash delete-todo"
              viewBox="0 0 16 16"
            >
              <path
                class="delete-todo"
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
              />
              <path
                class="delete-todo"
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </span>
          Delete
        </button>
    `;
}

if (targetTask.type === "marked") {
  todoControlPanel.innerHTML = `
                <button class="todo-control delete-todo">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="red"
              class="bi bi-trash delete-todo"
              viewBox="0 0 16 16"
            >
              <path
                class="delete-todo"
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
              />
              <path
                class="delete-todo"
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </span>
          Delete
        </button>
    `;
}

taskType.textContent = targetTask.type.toUpperCase();
taskName.textContent = targetTask.name;
taskTime.textContent = targetTask.time;
taskDescription.textContent = targetTask.description;

todoControlPanel.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
});

document.addEventListener("DOMContentLoaded", (e) => {
  todoControlPanel.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target.classList.contains("mark-done")) {
      markTaskAsDone(targetId);
    } else if (e.target.classList.contains("edit-todo")) {
      location.href = `../Screens/editTodo.html?${targetId}`;
    } else if (e.target.classList.contains("delete-todo")) {
      deleteTask(targetId, targetTask.type, "../Screens/homePage.html");
    } else if (e.target.classList.contains("task-name")) {
      location.href = `../Screens/viewTodo.html?${targetId}`;
    }
  });
});
