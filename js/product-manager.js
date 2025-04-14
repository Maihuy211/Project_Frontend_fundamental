let tasks = JSON.parse(localStorage.getItem("tasks")) || [
    {
        id: 1,
        taskName: "Soạn thảo đề cương dự án",
        assigneeId: "Mai Văn Huy",
        projectId: 1,
        assignDate: "2025-03-24",
        dueDate: "2025-03-26",
        priority: "Thấp",
        progress: "Đúng tiến độ",
        status: "To do",
        ownerId: 1,
    }
];
const user = JSON.parse(localStorage.getItem("loggedInUser"));
function save() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
let project = JSON.parse(localStorage.getItem("choosenProject"));

// tên dự án và mô tả 
let projects = JSON.parse(localStorage.getItem("projects"));
let titleContent = document.getElementById("title-content");
let titleText = document.getElementById("text");
let title = projects.findIndex((i) => i.id === project);
titleContent.textContent = `${projects[title].projectName}`;
titleText.textContent = `${projects[title].description}`;

function createTaskRow(task) {
    let priorityClass = "";
    if (task.priority === "Thấp") {
        priorityClass = "low";
    } else if (task.priority === "Trung bình") {
        priorityClass = "medium";
    } else {
        priorityClass = "high";
    }

    let progressClass = "";
    if (task.progress === "Có rủi ro") {
        progressClass = "medium";
    } else if (task.progress === "Trễ hạn") {
        progressClass = "high";
    } else {
        progressClass = "on-schedule";
    }
    let listTask = `
        <tr id="task-${task.id}">
            <td class="col1">${task.taskName}</td>
            <td class="col2">${task.assigneeId}</td>
            <td class="col3"><span class="${priorityClass}">${task.priority}</span></td>
            <td class="col4"><span class="date">${task.assignDate}</span></td>
            <td class="col5"><span class="date">${task.dueDate}</span></td>
            <td class="col6"><span class="${progressClass}">${task.progress}</span></td>
            <td class="col7">
                <button id="btn-edit" class="btn" onclick="editMission(${task.id})">Sửa</button>
                <button id="btn-delete" class="btn" onclick="deleteMission(${task.id})">Xoá</button>
            </td>
        </tr>
    `;
    return listTask;

}
function renderTask() {
    const toDo = document.getElementById("tableListTaskToDo");
    const inProgress = document.getElementById("tableListTaskInProgress");
    const pending = document.getElementById("tableListTaskPending");
    const done = document.getElementById("tableListTaskDone");
    let tasksToDo = "";
    let tasksInProgress = "";
    let tasksPending = "";
    let tasksDone = "";
    const projectTasks = tasks.filter(task => task.projectId === project && task.ownerId === user.id);
    if (projectTasks.length > 0) {
        projectTasks.forEach(task => {
            const row = createTaskRow(task);
            if (task.status === "To do") {
                tasksToDo += row;
            } else if (task.status === "In Progress") {
                tasksInProgress += row;
            } else if (task.status === "Pending") {
                tasksPending += row;
            } else if (task.status === "Done") {
                tasksDone += row;
            }
        });
    }
    if (tasksToDo !== "") {
        toDo.innerHTML = tasksToDo;
    } else {
        toDo.innerHTML = `<tr><td  style="text-align:center">Chưa có nhiệm vụ nào</td></tr>`;
    }
    if (tasksInProgress !== "") {
        inProgress.innerHTML = tasksInProgress;
    } else {
        inProgress.innerHTML = `<tr><td style="text-align:center">Chưa có nhiệm vụ nào</td></tr>`;
    }
    if (tasksPending !== "") {
        pending.innerHTML = tasksPending;
    } else {
        pending.innerHTML = `<tr><td style="text-align:center">Chưa có nhiệm vụ nào</td></tr>`;
    }
    if (tasksDone !== "") {
        done.innerHTML = tasksDone;
    } else {
        done.innerHTML = `<tr><td style="text-align:center">Chưa có nhiệm vụ nào</td></tr>`;
    }
    save();
}
let taskName = document.getElementById("missionName");
let assigneeId = document.getElementById("user-charge");
let status = document.getElementById("status");
let assignDate = document.getElementById("start-date");
let dueDate = document.getElementById("end-date");
let priority = document.getElementById("priority");
let progress = document.getElementById("progress");

let errorMissionName = document.getElementById("error-missionName");
let errorAssignee = document.getElementById("error-userCharge");
let errorStatus = document.getElementById("error-status");
let errorStartDate = document.getElementById("error-startDate");
let errorEndDate = document.getElementById("error-endDate");
let errorPriority = document.getElementById("error-priority");
let errorProgress = document.getElementById("error-progress");
function addMission() {

    errorMissionName.textContent = "";
    errorAssignee.textContent = "";
    errorStatus.textContent = "";
    errorStartDate.textContent = "";
    errorEndDate.textContent = "";
    errorPriority.textContent = "";
    errorProgress.textContent = "";

    taskName.style.border = "";
    assigneeId.style.border = "";
    status.style.border = "";
    assignDate.style.border = "";
    dueDate.style.border = "";
    priority.style.border = "";
    progress.style.border = "";

    let hasError = false;

    // Kiểm tra tên nhiệm vụ
    if (!taskName.value.trim()) {
        errorMissionName.textContent = "Vui lòng nhập tên nhiệm vụ!";
        taskName.style.border = "1px solid red";
        hasError = true;
    } else if (taskName.value.trim().length < 5 || taskName.value.trim().length >= 30) {
        errorMissionName.textContent = "Tên nhiệm vụ phải từ 5 đến dưới 30 ký tự!";
        taskName.style.border = "1px solid red";
        hasError = true;
    }
    let userTasks = tasks.filter(task =>
        task.ownerId === user.id &&
        task.projectId === project
    );
    let isDuplicate = userTasks.some(task =>
        task.taskName.toLowerCase() === taskName.value.trim().toLowerCase()
    );
    if (isDuplicate) {
        errorMissionName.textContent = "Tên nhiệm vụ đã tồn tại!";
        taskName.style.border = "1px solid red";
        return;
    }
    // Kiểm tra người phụ trách
    if (!assigneeId.value || assigneeId.value === "user-charge") {
        errorAssignee.textContent = "Vui lòng chọn người phụ trách!";
        assigneeId.style.border = "1px solid red";
        hasError = true;
    }

    // Kiểm tra trạng thái
    if (!status.value || status.value === "status") {
        errorStatus.textContent = "Vui lòng chọn trạng thái!";
        status.style.border = "1px solid red";
        hasError = true;
    }

    // Kiểm tra ngày bắt đầu
    if (!assignDate.value) {
        errorStartDate.textContent = "Vui lòng chọn ngày bắt đầu!";
        assignDate.style.border = "1px solid red";
        hasError = true;
    } else {
        let todayStr = new Date().toISOString().split('T')[0];
        let startStr = assignDate.value;

        if (startStr < todayStr) {
            errorStartDate.textContent = "Ngày bắt đầu phải từ hôm nay trở đi!";
            assignDate.style.border = "1px solid red";
            hasError = true;
        }
    }
    // Kiểm tra hạn cuối
    if (!dueDate.value) {
        errorEndDate.textContent = "Vui lòng chọn hạn cuối!";
        dueDate.style.border = "1px solid red";
        hasError = true;
    } else if (assignDate.value) {
        let start = new Date(assignDate.value);
        let end = new Date(dueDate.value);

        if (end <= start) {
            errorEndDate.textContent = "Hạn cuối phải sau ngày bắt đầu!";
            dueDate.style.border = "1px solid red";
            hasError = true;
        }
    }

    // Kiểm tra độ ưu tiên
    if (!priority.value || priority.value === "choose") {
        errorPriority.textContent = "Vui lòng chọn độ ưu tiên!";
        priority.style.border = "1px solid red";
        hasError = true;
    }

    // Kiểm tra tiến độ
    if (!progress.value || progress.value === "choose") {
        errorProgress.textContent = "Vui lòng chọn tiến độ!";
        progress.style.border = "1px solid red";
        hasError = true;
    }

    if (hasError) return; // Dừng nếu có lỗi

    let newTask = {
        projectId: project,
        id: tasks.length + 1,
        taskName: taskName.value,
        assigneeId: assigneeId.value,
        status: status.value,
        assignDate: assignDate.value,
        dueDate: dueDate.value,
        priority: priority.value,
        progress: progress.value,
        ownerId: user.id,
    };

    tasks.push(newTask);
    renderTask();
    document.getElementById("overley-add").style.display = "none";
}
let addButton = document.getElementById("addMission");
let addmissionButton = document.getElementById("buttonAdd");
let closeButton = document.getElementById("close");
let cancelButton = document.getElementById("buttonCancel");
let missionAdd = document.getElementById("overley-add");

addButton.onclick = function () {
    document.getElementById("missionName").value = "";
    document.getElementById("user-charge").value = "user-charge";
    document.getElementById("status").value = "status";
    document.getElementById("start-date").value = "";
    document.getElementById("end-date").value = "";
    document.getElementById("priority").value = "choose";
    document.getElementById("progress").value = "choose";

    errorMissionName.textContent = "";
    errorAssignee.textContent = "";
    errorStatus.textContent = "";
    errorStartDate.textContent = "";
    errorEndDate.textContent = "";
    errorPriority.textContent = "";
    errorProgress.textContent = "";

    taskName.style.border = "";
    assigneeId.style.border = "";
    status.style.border = "";
    assignDate.style.border = "";
    dueDate.style.border = "";
    priority.style.border = "";
    progress.style.border = "";

    missionAdd.style.display = "flex";
};

closeButton.onclick = function () {
    missionAdd.style.display = "none";
};

cancelButton.onclick = function () {
    missionAdd.style.display = "none";
};

addmissionButton.onclick = function () {
    addMission();
};
renderTask();

// sửa nhiệm vụ
function editMission(id) {
    let missionEdit = document.getElementById("overley-edt");
    let missionNameEditInput = document.getElementById("missionName-edit");
    let userChargeEdit = document.getElementById("user-charge-edit");
    let statusEdit = document.getElementById("status-edit");
    let startDateEdit = document.getElementById("start-date-edit");
    let endDateEdit = document.getElementById("end-date-edit");
    let priorityEdit = document.getElementById("priority-edit");
    let progressEdit = document.getElementById("progress-edit");

    let errorMissionName = document.getElementById("error-missionName-edit");
    let errorUserCharge = document.getElementById("error-userCharge-edit");
    let errorStatus = document.getElementById("error-status-edit");
    let errorStartDate = document.getElementById("error-startDate-edit");
    let errorEndDate = document.getElementById("error-endDate-edit");
    let errorPriority = document.getElementById("error-priority-edit");
    let errorProgress = document.getElementById("error-progress-edit");

    missionEdit.style.display = "flex";
    let task = tasks.find((item) => item.id === id);
    if (!task) return;

    // Điền dữ liệu cũ vào form
    missionNameEditInput.value = task.taskName;
    userChargeEdit.value = task.assigneeId;
    statusEdit.value = task.status;
    startDateEdit.value = task.assignDate;
    endDateEdit.value = task.dueDate;
    priorityEdit.value = task.priority;
    progressEdit.value = task.progress;
    console.log("Tiến độ từ task:", task.progress);
    // Reset lỗi trước khi kiểm tra
    errorMissionName.textContent = "";
    errorUserCharge.textContent = "";
    errorStatus.textContent = "";
    errorStartDate.textContent = "";
    errorEndDate.textContent = "";
    errorPriority.textContent = "";
    errorProgress.textContent = "";

    missionNameEditInput.style.border = "";
    userChargeEdit.style.border = "";
    statusEdit.style.border = "";
    startDateEdit.style.border = "";
    endDateEdit.style.border = "";
    priorityEdit.style.border = "";
    progressEdit.style.border = "";

    let editMissionButton = document.getElementById("buttonEdit");
    editMissionButton.onclick = function () {
        let taskName = missionNameEditInput.value.trim();
        let assigneeId = userChargeEdit.value;
        let status = statusEdit.value;
        let assignDate = startDateEdit.value;
        let dueDate = endDateEdit.value;
        let priority = priorityEdit.value;
        let progress = progressEdit.value;

        let hasError = false;

        // Tên nhiệm vụ
        if (!taskName.trim()) {
            errorMissionName.textContent = "Vui lòng nhập tên nhiệm vụ!";
            missionNameEditInput.style.border = "1px solid red";
            hasError = true;
        } else if (taskName.trim().length < 5 || taskName.trim().length >= 30) {
            errorMissionName.textContent = "Tên nhiệm vụ phải từ 5 đến dưới 30 ký tự!";
            missionNameEditInput.style.border = "1px solid red";
            hasError = true;
        }

        // Người phụ trách
        if (!assigneeId || assigneeId === "user-charge-edit") {
            errorUserCharge.textContent = "Vui lòng chọn người phụ trách!";
            userChargeEdit.style.border = "1px solid red";
            hasError = true;
        }

        // Trạng thái
        if (!status || status === "status-edit") {
            errorStatus.textContent = "Vui lòng chọn trạng thái!";
            statusEdit.style.border = "1px solid red";
            hasError = true;
        }

        // Ngày bắt đầu
        if (!assignDate) {
            errorStartDate.textContent = "Vui lòng chọn ngày bắt đầu!";
            startDateEdit.style.border = "1px solid red";
            hasError = true;
        } else {
            let todayStr = new Date().toISOString().split('T')[0];
            let startStr = assignDate;

            if (startStr < todayStr) {
                errorStartDate.textContent = "Ngày bắt đầu phải từ hôm nay trở đi!";
                startDateEdit.style.border = "1px solid red";
                hasError = true;
            }
        }
        // Hạn cuối
        if (!dueDate) {
            errorEndDate.textContent = "Vui lòng chọn hạn cuối!";
            endDateEdit.style.border = "1px solid red";
            hasError = true;
        } else if (assignDate) {
            let start = new Date(assignDate);
            let end = new Date(dueDate);

            if (end <= start) {
                errorEndDate.textContent = "Hạn cuối phải sau ngày bắt đầu!";
                endDateEdit.style.border = "1px solid red";
                hasError = true;
            }
        }

        // Độ ưu tiên
        if (!priority || priority === "priority-edit") {
            errorPriority.textContent = "Vui lòng chọn độ ưu tiên!";
            priorityEdit.style.border = "1px solid red";
            hasError = true;
        }

        // Tiến độ
        if (!progress || progress === "progress-edit") {
            errorProgress.textContent = "Vui lòng chọn tiến độ!";
            progressEdit.style.border = "1px solid red";
            hasError = true;
        }

        if (hasError) return; // Dừng lại nếu có lỗi

        task.taskName = taskName;
        task.assigneeId = assigneeId;
        task.status = status;
        task.assignDate = assignDate;
        task.dueDate = dueDate;
        task.priority = priority;
        task.progress = progress;

        missionEdit.style.display = "none";
        renderTask();
    };
    let closeEditButton = document.getElementById("close-edit");
    let cancelEditButton = document.getElementById("buttonCancel-edit");

    closeEditButton.onclick = function () {
        missionEdit.style.display = "none";
    };
    cancelEditButton.onclick = function () {
        missionEdit.style.display = "none";
    };
}

// xoá nhiệm vụ
function deleteMission(id) {

    let delMissionButton = document.getElementById("buttonDelete");
    let closeButtondel = document.getElementById("close-del");
    let cancelButtondel = document.getElementById("buttonCancel-del");
    let missionDelete = document.getElementById("overley-del");

    missionDelete.style.display = "flex";
    delMissionButton.onclick = function () {
        const index = tasks.findIndex((etem) => etem.id === id);
        if (index !== -1) {
            tasks.splice(index, 1);
        }
        renderTask();
        missionDelete.style.display = "none";
    };

    closeButtondel.onclick = function () {
        missionDelete.style.display = "none";
    };

    cancelButtondel.onclick = function () {
        missionDelete.style.display = "none";
    };
    save();
}


// tìm kiếm 
let searchInput = document.getElementById("search-Mission");
searchInput.oninput = function () {
    searchTasks(searchInput.value);
};
function searchTasks(keyword) {
    let toDo = document.getElementById("tableListTaskToDo");
    let inProgress = document.getElementById("tableListTaskInProgress");
    let pending = document.getElementById("tableListTaskPending");
    let done = document.getElementById("tableListTaskDone");
    toDo.innerHTML = "";
    inProgress.innerHTML = "";
    pending.innerHTML = "";
    done.innerHTML = "";
    let flag;
    if (keyword === "") {
        flag = tasks;
    } else {
        flag = tasks.filter(item =>
            item.taskName.toLowerCase().includes(keyword.toLowerCase())
        );
    }
    flag.forEach(function (item) {
        let taskRow = `
            <tr id="task-${item.id}">
                <td class="col1">${item.taskName}</td>
                <td class="col2">${item.assigneeId}</td>
                <td class="col3"><span class="${item.priority === "Thấp" ? "low" : item.priority === "Trung bình" ? "medium" : "high"}">${item.priority}</span></td>
                <td class="col4"><span class="date">${item.assignDate}</span></td>
                <td class="col5"><span class="date">${item.dueDate}</span></td>
                <td class="col6"><span class="${item.progress === "Có rủi ro" ? "medium" : item.progress === "Trễ hạn" ? "high" : "on-schedule"}">${item.progress}</span></td>
                <td class="col7">
                    <button id="btn-edit" class="btn" onclick="editMission(${item.id})">Sửa</button>
                    <button id="btn-delete" class="btn" onclick="deleteMission(${item.id})">Xóa</button>
                </td>
            </tr>
        `;
        if (item.status === "To do") {
            toDo.innerHTML += taskRow;
        } else if (item.status === "In Progress") {
            inProgress.innerHTML += taskRow;
        } else if (item.status === "Pending") {
            pending.innerHTML += taskRow;
        } else if (item.status === "Done") {
            done.innerHTML += taskRow;
        }
    });
}
// Lấy dữ liệu người dùng và project
const listProject = JSON.parse(localStorage.getItem("projects")) || [];
const projectId = JSON.parse(localStorage.getItem("choosenProject"));
const currentProject = listProject.find(item => item.id === projectId);

let originalMemberList = []; // Danh sách gốc để reset khi hủy
let fullMemberList = [];     // Danh sách hiển thị
let deletedMemberIds = [];   // Danh sách ID bị đánh dấu xóa

function initializeFullMemberList() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const listProject = JSON.parse(localStorage.getItem("projects")) || [];
    const projectId = JSON.parse(localStorage.getItem("choosenProject"));
    const currentProject = listProject.find(item => item.id === projectId);

    originalMemberList = [];
    if (user) {
        originalMemberList.push({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            role: "Project owner"
        });
    }
    (currentProject.members || []).forEach(member => {
        originalMemberList.push({
            id: member.id,
            name: member.name,
            email: member.email,
            role: member.role
        });
    });
    fullMemberList = JSON.parse(JSON.stringify(originalMemberList));
    deletedMemberIds = [];
}
initializeFullMemberList();
renderUser(fullMemberList);
userList(fullMemberList);
renderChargeDropdown();
renderChargeDropdownEdit();

function renderUser(memberList) {
    let renderUser = document.getElementById("users");
    renderUser.innerHTML = "";
    const visibleMembers = memberList.filter(member => !deletedMemberIds.includes(member.id));
    for (let i = 0; i < visibleMembers.length && i < 2; i++) {
        const member = visibleMembers[i];
        renderUser.innerHTML += `
      <img src="/assets/images/avatar-trang-4.jpg" alt="meo" id="avatar">
      <div class="user-info">
        <div class="name">${member.name}</div>
        <div class="role">${member.role}</div>
      </div>
    `;
    }
}

function userList(memberList) {
    let listUser = document.getElementById("user_list");
    listUser.innerHTML = "";
    const visibleMembers = memberList.filter(member => !deletedMemberIds.includes(member.id));
    visibleMembers.forEach((member) => {
        listUser.innerHTML += `
      <div class="user">
        <img src="/assets/images/avatar-trang-4.jpg" alt="meo" class="avatar">
        <div class="user-info">
          <p class="user-name">${member.name}</p>
          <p class="user-email">${member.email}</p>
        </div>
        <input type="text" class="role-field" value="${member.role}" ${member.role === "Project owner" ? "disabled" : ""}>
        <img src="/assets/icons/Vector.png" alt="delete" class="delete-btn" onclick="deleteUser(${member.id})">
      </div>
    `;
    });
}

function renderChargeDropdown() {
    const dropdown = document.getElementById("user-charge");
    if (!dropdown) return;
    dropdown.innerHTML = '<option value="user-charge" selected disabled hidden>Chọn người phụ trách</option>';
    const visibleMembers = fullMemberList.filter(member => !deletedMemberIds.includes(member.id));
    visibleMembers.forEach(member => {
        dropdown.innerHTML += `<option value="${member.name}">${member.name}</option>`;
    });
}

function renderChargeDropdownEdit() {
    const dropdown = document.getElementById("user-charge-edit");
    if (!dropdown) return;
    dropdown.innerHTML = '<option value="user-charge-edit" selected disabled hidden>Chọn người phụ trách</option>';
    const visibleMembers = fullMemberList.filter(member => !deletedMemberIds.includes(member.id));
    visibleMembers.forEach(member => {
        dropdown.innerHTML += `<option value="${member.name}">${member.name}</option>`;
    });
}

let add_member = document.getElementById("add-member");
let addMembersButton = document.getElementById("buttonAddMembers");
let closeButtonMembers = document.getElementById("closeMembersAdd");
let cancelButtonMembers = document.getElementById("buttonCancelMembersAdd");
let membersAdd = document.getElementById("overley-addMember");
let errorEmail = document.getElementById("errorEmail");
let errorRole = document.getElementById("errorRole");
let emailInput = document.getElementById("emailMember");
let roleInput = document.getElementById("roleInput");
add_member.onclick = () => {
    errorEmail.style.display = "none";
    errorRole.style.display = "none";
    emailInput.style.border = "";
    roleInput.style.border = "";
    membersAdd.style.display = "flex";
};
closeButtonMembers.onclick = () => membersAdd.style.display = "none";
cancelButtonMembers.onclick = () => membersAdd.style.display = "none";

addMembersButton.onclick = function () {
    let emailInput = document.getElementById("emailMember");
    let roleInput = document.getElementById("roleInput");
    let emailValue = emailInput.value.trim();
    let roleValue = roleInput.value.trim();

    errorEmail.style.display = "none";
    errorRole.style.display = "none";
    emailInput.style.border = "";
    roleInput.style.border = "";

    let hasError = false;
    if (emailValue === "") {
        errorEmail.textContent = "Vui lòng nhập email";
        errorEmail.style.display = "block";
        emailInput.style.border = "1px solid red";
        hasError = true;
    }
    else if (!emailValue.includes("@") || !(emailValue.endsWith(".com") || emailValue.endsWith(".vn"))) {
        errorEmail.textContent = "Email không hợp lệ";
        errorEmail.style.display = "block";
        emailInput.style.border = "1px solid red";
        hasError = true;
    }
    else if (emailValue.length < 5 || emailValue.length > 50) {
        errorEmail.textContent = "Email phải có độ dài từ 5 đến 50 ký tự";
        errorEmail.style.display = "block";
        emailInput.style.border = "1px solid red";
        hasError = true;
    }
    if (roleValue === "") {
        errorRole.textContent = "Vui lòng nhập vai trò";
        errorRole.style.display = "block";
        roleInput.style.border = "1px solid red";
        hasError = true;
    }
    else if (roleValue.length < 5 || roleValue.length > 50) {
        errorRole.textContent = "Vai trò phải có độ dài từ 5 đến 50 ký tự";
        errorRole.style.display = "block";
        roleInput.style.border = "1px solid red";
        hasError = true;
    }
    if (hasError) return;

    const newMember = {
        id: Math.floor(Math.random() * 1000),
        name: emailValue.split("@")[0],
        email: emailValue,
        role: roleValue
    };

    fullMemberList.push(newMember);
    originalMemberList.push(newMember);
    userList(fullMemberList);
    renderUser(fullMemberList);
    renderChargeDropdown();
    renderChargeDropdownEdit();
    saveUser();
    document.getElementById("emailMember").value = "";
    document.getElementById("roleInput").value = "";
    membersAdd.style.display = "none";
};

function deleteUser(id) {
    if (!deletedMemberIds.includes(id)) {
        deletedMemberIds.push(id);
    }
    userList(fullMemberList);
    renderChargeDropdown();
    renderChargeDropdownEdit();
    saveUser();
}

function saveUser() {
    const index = listProject.findIndex(item => item.id === currentProject.id);
    currentProject.members = fullMemberList.filter(
        member => member.role !== "Project owner" && !deletedMemberIds.includes(member.id)
    );
    listProject[index] = currentProject;
    localStorage.setItem("projects", JSON.stringify(listProject));
}

let btn_more = document.getElementById("more");
let btn_save = document.getElementById("save-btn");
let closeMore = document.getElementById("closeMoreMembers");
let btn_cancel = document.getElementById("cancel-btn");
let listMembers = document.getElementById("overleyRenderMembers");

btn_more.onclick = () => {
    fullMemberList = JSON.parse(JSON.stringify(originalMemberList));
    deletedMemberIds = [];
    renderUser(fullMemberList);
    userList(fullMemberList);
    renderChargeDropdown();
    renderChargeDropdownEdit();
    listMembers.style.display = "flex";
};

btn_cancel.onclick = () => {
    listMembers.style.display = "none";
};

closeMore.onclick = btn_cancel.onclick;

btn_save.onclick = () => {
    const roleInputs = document.querySelectorAll(".role-field");
    let visibleIndex = 0;

    fullMemberList.forEach(member => {
        if (deletedMemberIds.includes(member.id)) return;
        if (member.role !== "Project owner") {
            member.role = roleInputs[visibleIndex].value.trim();
        }
        visibleIndex++;
        saveUser();
    });

    fullMemberList = fullMemberList.filter(member => !deletedMemberIds.includes(member.id));
    saveUser();
    deletedMemberIds = [];
    originalMemberList = JSON.parse(JSON.stringify(fullMemberList));

    renderUser(fullMemberList);
    userList(fullMemberList);
    renderChargeDropdown();
    renderChargeDropdownEdit();
    listMembers.style.display = "none";
};
document.getElementById("choose").onchange = displayTasks;

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

function displayTasks() {
    const toDo = document.getElementById("tableListTaskToDo");
    const inProgress = document.getElementById("tableListTaskInProgress");
    const pending = document.getElementById("tableListTaskPending");
    const done = document.getElementById("tableListTaskDone");

    toDo.innerHTML = "";
    inProgress.innerHTML = "";
    pending.innerHTML = "";
    done.innerHTML = "";

    let sortBy = document.getElementById("choose").value;
    let filteredTasks = tasks.filter(task => task.projectId === project);

    let sortedTasks = sortTasks(filteredTasks, sortBy);

    sortedTasks.forEach((task) => {
        let taskRow = createTaskRow(task);
        if (task.status === "To do") {
            toDo.innerHTML += taskRow;
        } else if (task.status === "In Progress") {
            inProgress.innerHTML += taskRow;
        } else if (task.status === "Pending") {
            pending.innerHTML += taskRow;
        } else if (task.status === "Done") {
            done.innerHTML += taskRow;
        }
    });
}
