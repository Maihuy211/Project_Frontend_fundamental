let tasks = [
    {
        id: 1,
        taskName: "Soạn thảo đề cương dự án",
        assigneeId: "user1",
        projectId: 1,
        assignDate: "2025-03-24",
        dueDate: "2025-03-26",
        priority: "Thấp",
        progress: "Đúng tiến độ",
        status: "To do"
    }
];
function createTaskRow(task, index) {
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
    toDo.innerHTML = "";
    inProgress.innerHTML = "";
    pending.innerHTML = "";
    done.innerHTML = "";
    tasks.forEach((task, index) => {
        let taskRow = createTaskRow(task, index);
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
    // Reset lỗi trước khi kiểm tra
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

    if (!taskName.value.trim()) {
        errorMissionName.textContent = "Vui lòng nhập tên nhiệm vụ!";
        taskName.style.border = "1px solid red";
        hasError = true;
    }
    if (!assigneeId.value || assigneeId.value === "user-charge") {
        errorAssignee.textContent = "Vui lòng chọn người phụ trách!";
        assigneeId.style.border = "1px solid red";
        hasError = true;
    }
    if (!status.value || status.value === "status") {
        errorStatus.textContent = "Vui lòng chọn trạng thái!";
        status.style.border = "1px solid red";
        hasError = true;
    }
    if (!assignDate.value) {
        errorStartDate.textContent = "Vui lòng chọn ngày bắt đầu!";
        assignDate.style.border = "1px solid red";
        hasError = true;
    }
    if (!dueDate.value) {
        errorEndDate.textContent = "Vui lòng chọn hạn cuối!";
        dueDate.style.border = "1px solid red";
        hasError = true;
    }
    if (!priority.value || priority.value === "choose") {
        errorPriority.textContent = "Vui lòng chọn độ ưu tiên!";
        priority.style.border = "1px solid red";
        hasError = true;
    }
    if (!progress.value || progress.value === "choose") {
        errorProgress.textContent = "Vui lòng chọn tiến độ!";
        progress.style.border = "1px solid red";
        hasError = true;
    }

    if (hasError) return; // Dừng lại nếu có lỗi
    let newTask = {
        id: tasks.length + 1,
        taskName: taskName.value,
        assigneeId: assigneeId.value,
        status: status.value,
        assignDate: assignDate.value,
        dueDate: dueDate.value,
        priority: priority.value,
        progress: progress.value
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

        if (!taskName) {
            errorMissionName.textContent = "Vui lòng nhập tên nhiệm vụ!";
            missionNameEditInput.style.border = "1px solid red";
            hasError = true;
        }
        if (!assigneeId || assigneeId==="user-charge-edit") {
            errorUserCharge.textContent = "Vui lòng chọn người phụ trách!";
            userChargeEdit.style.border = "1px solid red";
            hasError = true;
        }
        if (!status || status==="status-edit") {
            errorStatus.textContent = "Vui lòng chọn trạng thái!";
            statusEdit.style.border = "1px solid red";
            hasError = true;
        }
        if (!assignDate) {
            errorStartDate.textContent = "Vui lòng chọn ngày bắt đầu!";
            startDateEdit.style.border = "1px solid red";
            hasError = true;
        }
        if (!dueDate) {
            errorEndDate.textContent = "Vui lòng chọn hạn cuối!";
            endDateEdit.style.border = "1px solid red";
            hasError = true;
        }
        if (!priority || priority==="priority-edit") {
            errorPriority.textContent = "Vui lòng chọn độ ưu tiên!";
            priorityEdit.style.border = "1px solid red";
            hasError = true;
        }
        if (!progress || progress==="progress-edit") {
            errorProgress.textContent = "Vui lòng chọn tiến độ!";
            progressEdit.style.border = "1px solid red";
            hasError = true;
        }
        if (hasError) return; 
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
}
// Chi tiết thành viên
let btn_more = document.getElementById("more");
let btn_save = document.getElementById("save-btn");
let closeMore = document.getElementById("closeMoreMembers");
let btn_cancel = document.getElementById("cancel-btn");
let listMembers = document.getElementById("overleyRenderMembers");
btn_more.onclick = function () {
    listMembers.style.display = "flex";
};
btn_cancel.onclick = function () {
    listMembers.style.display = "none";
};
closeMore.onclick = function () {
    listMembers.style.display = "none";
};
btn_save.onclick = function () {
};


// thêm thành viên
let add_member = document.getElementById("add-member");
let addMembersButton = document.getElementById("buttonAddMembers");
let closeButtonMembers = document.getElementById("closeMembersAdd");
let cancelButtonMembers = document.getElementById("buttonCancelMembersAdd");
let membersAdd = document.getElementById("overley-addMember");
let error = document.getElementById("error");

add_member.onclick = function () {
    error.style.display = "none";
    membersAdd.style.display = "flex";

};
closeButtonMembers.onclick = function () {
    membersAdd.style.display = "none";
};
cancelButtonMembers.onclick = function () {
    membersAdd.style.display = "none";
};
addMembersButton.onclick = function () {

};




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

    // Xóa nội dung bảng trước khi hiển thị kết quả tìm kiếm
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
            <tr></tr>
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

