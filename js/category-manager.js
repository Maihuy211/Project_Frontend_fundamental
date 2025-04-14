const user = JSON.parse(localStorage.getItem("loggedInUser"));
const projects = JSON.parse(localStorage.getItem("projects")) || [];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentEditTaskId = null;

function getPriorityClass(priority) {
    if (priority === "Thấp") return "low";
    if (priority === "Trung bình") return "medium";
    return "high";
}

function getProgressClass(progress) {
    if (progress === "Có rủi ro") return "medium";
    if (progress === "Trễ hạn") return "high";
    return "on-schedule";
}
function getEditIconHtml(task) {
    if (task.status === "Pending" || task.status === "In Progress") {
        return `<i class="fa-solid fa-pen-to-square edit-icon" data-id="${task.id}"></i>`;
    }
    return "";
}

function createTaskRow(task) {
    const priorityClass = getPriorityClass(task.priority);
    const progressClass = getProgressClass(task.progress);
    const editIconHtml = getEditIconHtml(task);

    return `
        <tr>
            <td class="col1">${task.taskName}</td>
            <td class="col2">${task.status} ${editIconHtml}</td>
            <td class="col3"><span class="${priorityClass}">${task.priority}</span></td>
            <td class="col4"><span class="date">${task.assignDate}</span></td>
            <td class="col5"><span class="date">${task.dueDate}</span></td>
            <td class="col6"><span class="${progressClass}">${task.progress}</span></td>
        </tr>
    `;
}

function sortTasks(taskList, sortBy) {
    let sortedTasks = [];
    taskList.forEach(task => {
        let copiedTask = {
            id: task.id,
            taskName: task.taskName,
            assigneeId: task.assigneeId,
            priority: task.priority,
            assignDate: task.assignDate,
            dueDate: task.dueDate,
            progress: task.progress,
            status: task.status,
            projectId: task.projectId
        };
        sortedTasks.push(copiedTask);
    });

    if (sortBy === "Độ ưu tiên") {
        const priorityOrder = { "Cao": 3, "Trung bình": 2, "Thấp": 1 };
        sortedTasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    } else if (sortBy === "Hạn chót") {
        sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    return sortedTasks;
}

function renderPersonalMissions() {
    const container = document.getElementById("personal-mission");
    const keyword = document.getElementById("search-Mission").value.toLowerCase();
    const sortBy = document.getElementById("choose").value;

    container.innerHTML = "";

    const userProjects = projects.filter(p => Number(p.ownerId) === Number(user.id));

    userProjects.forEach(project => {
        let projectTasks = tasks.filter(task => Number(task.projectId) === project.id);

        if (keyword !== "") {
            projectTasks = projectTasks.filter(task =>
                task.taskName.toLowerCase().includes(keyword)
            );
        }

        projectTasks = sortTasks(projectTasks, sortBy);

        let taskRows = "";
        if (projectTasks.length > 0) {
            projectTasks.forEach(task => {
                taskRows += createTaskRow(task);
            });
        } else {
            taskRows = `<tr><td>Chưa có nhiệm vụ nào</td></tr>`;
        }

        container.innerHTML += `
            <details open>
                <summary><strong>${project.projectName}</strong></summary>
                <table>
                    ${taskRows}
                </table>
            </details>
        `;
    });
}

document.getElementById("search-Mission").oninput = renderPersonalMissions;
document.getElementById("choose").onchange = renderPersonalMissions;

document.getElementById("personal-mission").addEventListener("click", function (e) {
    if (e.target.classList.contains("edit-icon")) {
        const taskId = e.target.getAttribute("data-id");
        openUpdateModal(taskId);
    }
});

function openUpdateModal(taskId) {
    currentEditTaskId = Number(taskId);
    document.getElementById("overley-update").style.display = "flex";
}

document.getElementById("buttonUpdate").onclick = function () {
    const index = tasks.findIndex(task => task.id === currentEditTaskId);
    if (index !== -1) {
        if (tasks[index].status === "In Progress") {
            tasks[index].status = "Pending";
        } else if (tasks[index].status === "Pending") {
            tasks[index].status = "In Progress";
        }
    };
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderPersonalMissions();
    document.getElementById("overley-update").style.display = "none";

}
document.getElementById("close-update").onclick =
document.getElementById("buttonCancel-update").onclick = function () {
document.getElementById("overley-update").style.display = "none";
};

renderPersonalMissions();
