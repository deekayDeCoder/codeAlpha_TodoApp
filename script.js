const parseJson = (json) => JSON.parse(json);

/**** A function to fetch single Todo
 * @param id a unique identifier that tells tasks apart
 */
export const getSingleTodo = (id, type = "unmarked") => {
  const todos = JSON.parse(localStorage.getItem(`${type}`));
  return todos.filter((t) => t.id === id);
};

/****  A function to fetch single Todo
 *@param type todo category either marked or unmarked task
 */

export const getAllTodos = (type = "unmarked") =>
  JSON.parse(localStorage.getItem(`${type}`));

const hamburgerMenuBtns = document.querySelectorAll(".hamburger-menu");
if (window.innerWidth <= 600) {
  document.querySelector(".nav-controls").classList.add("hide");
}

// Checking for mode/theme value in localStorage to set app preferences on app load

export const dayIconSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun" viewBox="0 0 16 16">
        <path d="M3.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z"/>
        <path d="M8.202.28a.25.25 0 0 0-.404 0l-.91 1.255a.25.25 0 0 1-.334.067L5.232.79a.25.25 0 0 0-.374.154l-.36 1.51a.25.25 0 0 1-.282.188l-1.532-.244a.25.25 0 0 0-.286.286l.244 1.532a.25.25 0 0 1-.189.282l-1.509.36a.25.25 0 0 0-.154.374l.812 1.322a.25.25 0 0 1-.067.333l-1.256.91a.25.25 0 0 0 0 .405l1.256.91a.25.25 0 0 1 .067.334L.79 10.768a.25.25 0 0 0 .154.374l1.51.36a.25.25 0 0 1 .188.282l-.244 1.532a.25.25 0 0 0 .286.286l1.532-.244a.25.25 0 0 1 .282.189l.36 1.508a.25.25 0 0 0 .374.155l1.322-.812a.25.25 0 0 1 .333.067l.91 1.256a.25.25 0 0 0 .405 0l.91-1.256a.25.25 0 0 1 .334-.067l1.322.812a.25.25 0 0 0 .374-.155l.36-1.508a.25.25 0 0 1 .282-.19l1.532.245a.25.25 0 0 0 .286-.286l-.244-1.532a.25.25 0 0 1 .189-.282l1.508-.36a.25.25 0 0 0 .155-.374l-.812-1.322a.25.25 0 0 1 .067-.333l1.256-.91a.25.25 0 0 0 0-.405l-1.256-.91a.25.25 0 0 1-.067-.334l.812-1.322a.25.25 0 0 0-.155-.374l-1.508-.36a.25.25 0 0 1-.19-.282l.245-1.532a.25.25 0 0 0-.286-.286l-1.532.244a.25.25 0 0 1-.282-.189l-.36-1.509a.25.25 0 0 0-.374-.154l-1.322.812a.25.25 0 0 1-.333-.067L8.203.28zM8 2.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11z"/>
      </svg>
`;
export const nightIconSVG = `
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-moon"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M14.53 10.53a7 7 0 0 1-9.058-9.058A7.003 7.003 0 0 0 8 15a7.002 7.002 0 0 0 6.53-4.47z"
              />
            </svg>
`;

const modeTogglerBtn = document.querySelector(".nav-btn.theme")

document.addEventListener("DOMContentLoaded", (e) => {
  const theme = localStorage.getItem("mode") || 'day';
  if (theme === "day") {
    document.body.classList.remove("night-mode");
        if (location.pathname === "/Screens/homePage.html") {
        modeTogglerBtn.innerHTML = nightIconSVG
    }
} 
if (theme === "night") {
    document.body.classList.add("night-mode");
    if (location.pathname === "/Screens/homePage.html") {
        modeTogglerBtn.innerHTML = dayIconSVG
    }
}

});

hamburgerMenuBtns.forEach((menu) => {
  menu.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.querySelector(".nav-controls").classList.toggle("hide");
  });
});

/** A function to mark todo as done
 * @param id takes the id of unmarked todo as an argument
 */

export const markTaskAsDone = (id) => {
  const [targetTask] = getSingleTodo(id);
  const allMarkedTasks = getAllTodos("marked") || [];
  const allUnMarkedTasks = getAllTodos("unmarked") || [];

  const update = {
    id: targetTask.id,
    name: targetTask.name,
    description: targetTask.description,
    time: targetTask.time,
    type: "marked",
  };

  // removing the target task from unmarked list

  allMarkedTasks.unshift(update);
  localStorage.setItem("marked", JSON.stringify(allMarkedTasks));

  // Adding the target task to marked list

  const unmarkedTasks = allUnMarkedTasks.filter(
    (task) => task.id !== targetTask.id,
  );
  localStorage.setItem("unmarked", JSON.stringify(unmarkedTasks));

  location.reload();
};

/** A function to delte from storage
 * @param id takes the id of unmarked todo as an argument
 * @param type takes the type of task as an argument
 * @param redirectToPage takes the type of task as an argument
 */

export const deleteTask = (id, type, redirectToPage) => {
  const allMarkedTasks = getAllTodos("marked") || [];
  const allUnMarkedTasks = getAllTodos("unmarked") || [];

  let tasks;

  if (type === "marked") {
    tasks = allMarkedTasks.filter((task) => task.id !== id);
    localStorage.setItem("marked", JSON.stringify(tasks));
  }
  if (type === "unmarked") {
    tasks = allUnMarkedTasks.filter((task) => task.id !== id);
    localStorage.setItem("unmarked", JSON.stringify(tasks));
  }

  location.href = redirectToPage;
};

/** A helper function to count and mask task description to avoid long sentences that will break UI
 * @param str takes a sentence string and cut it to 5 words long
 */

export const maskName = (str) => String(str).split(" ").slice(0, 5).join(" ");
