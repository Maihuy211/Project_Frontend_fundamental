const user = JSON.parse(localStorage.getItem("loggedInUser"));
if (!user) {
    window.location.href = "/pages/login.html";
}

const projects = JSON.parse(localStorage.getItem("projects")) || [];
function save() {
    localStorage.setItem('projects', JSON.stringify(projects));
}
let currentPage = 1;
const rowsPerPage = 4;
function filter(text) {
    return text.replace(/[^a-zA-ZÀ-ỹ\s]/g, "");
}
function renderProject() {
    let listProject = document.getElementById("projects");
    listProject.innerHTML = "";
    let userProjects = projects.filter(project => Number(project.ownerId) === user.id);
    const start = (currentPage - 1) * rowsPerPage;
    const paginatedItems = userProjects.slice(start, start + rowsPerPage);

    paginatedItems.forEach(item => {
        let cleanName = filter(item.projectName);
        listProject.innerHTML += `
            <tr>
                <td class="table-id">${item.id}</td>
                <td>${cleanName}</td>
                <td class="action">
                    <button id="btn-edit" class="btn" onclick="editProject(${item.id})">Sửa</button>
                    <button id="btn-delete" class="btn" onclick="deleteProject(${item.id})">Xóa</button>
                    <button id="btn-detail" class="btn" onclick="detailProject(${item.id})">Chi tiết</button>
                </td>
            </tr> 
        `;
    });
    renderPagination();
    save();
}
function renderPagination() {
    let pagination = document.querySelector(".pagination");
    pagination.innerHTML = "";
    const userProjects = projects.filter(item => item.ownerId === user.id);
    const totalPages = Math.ceil(userProjects.length / rowsPerPage);
    pagination.innerHTML += `
        <li class="page-item">
            <a class="page-link" href="#" onclick="previousPage()"><</a>
        </li>`;
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <li class="page-item ${currentPage === i ? 'active' : ''}">
                <a class="page-link" href="#" onclick="goToPage(${i})">${i}</a>
            </li>`;
    }
    pagination.innerHTML += `
        <li class="page-item">
            <a class="page-link" href="#" onclick="nextPage(${totalPages})">></a>
        </li>`;
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderProject();
    }
}

function nextPage(totalPages) {
    if (currentPage < totalPages) {
        currentPage++;
        renderProject();
    }
}

function goToPage(page) {
    currentPage = page;
    renderProject();
}

renderProject();
// Thêm dự án
let addButton = document.getElementById("addProject");
let addProjectButton = document.getElementById("buttonAdd");
let closeButton = document.getElementById("close");
let cancelButton = document.getElementById("buttonCancel");
let projectAdd = document.getElementById("overley-add");
let error = document.getElementById("error");
let errorDescribe = document.getElementById("errorDescribe");
let projectNameInput = document.getElementById("projectName");
let describeInput = document.getElementById("describe");

addButton.onclick = function () {
    projectNameInput.value = "";
    describeInput.value = "";
    error.style.display = "none";
    errorDescribe.style.display = "none";
    projectAdd.style.display = "flex";
    projectNameInput.style.border = "";
    describeInput.style.border = "";
};

closeButton.onclick = function () {
    projectAdd.style.display = "none";
};

cancelButton.onclick = function () {
    projectAdd.style.display = "none";
};

addProjectButton.onclick = function () {
    addProject();
};
// thêm dự án 
function addProject() {
    let hasError = false;
    let inputValue = projectNameInput.value.trim();
    let describeValue = describeInput.value.trim();
    if (inputValue === "") {
        error.textContent = "Tên dự án trống";
        error.style.display = "block";
        projectNameInput.style.border = "1px solid red";
        hasError = true;
    } else if (inputValue.trim().length < 5 || inputValue.trim().length >= 50) {
        error.textContent = "Tên dự án phải từ 5 đến dưới 50 ký tự!";
        error.style.display = "block";
        projectNameInput.style.border = "1px solid red";
        hasError = true;
    }
    if (describeValue === "") {
        errorDescribe.textContent = "Tên mô tả trống";
        errorDescribe.style.display = "flex";
        describeInput.style.border = "1px solid red";
        hasError = true;
    } else if (describeValue.trim().length < 5 || describeValue.trim().length >= 1000) {
        errorDescribe.textContent = "Tên mô tả phải từ 5 đến dưới 1000 ký tự!";
        errorDescribe.style.display = "block";
        describeInput.style.border = "1px solid red";
        hasError = true;
    }
    if (hasError) return;
    let check = false;
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].projectName.toLowerCase() === inputValue.toLowerCase()) {
            check = true;
            break;
        }
    }
    if (check) {
        error.textContent = "Tên danh mục đã tồn tại";
        error.style.display = "block";
        projectNameInput.style.border = "1px solid red";
        return;
    }
    let id = 1;
    if (projects.length > 0) {
        id = projects[projects.length - 1].id + 1;
    }
    let newProject = {
        id: id,
        projectName: inputValue,
        description: describeValue,
        members: [],
        ownerId: user.id
    };
    projects.push(newProject);
    save();
    projectNameInput.value = "";
    describeInput.value = "";
    errorDescribe.style.display = "none";
    error.style.display = "none";
    projectAdd.style.display = "none";
    renderProject();
}

renderProject();
// Xóa dự án 

function deleteProject(id) {
    let delProjectButton = document.getElementById("buttonDelete");
    let closeButtondel = document.getElementById("close-del");
    let cancelButtondel = document.getElementById("buttonCancel-del");
    let projectDelete = document.getElementById("overley-del");

    projectDelete.style.display = "flex";
    delProjectButton.onclick = function () {
        const index = projects.findIndex((task) => task.id === id);
        if (index !== -1) {
            projects.splice(index, 1);
        }
        save();
        renderProject();
        projectDelete.style.display = "none";
    };
    closeButtondel.onclick = function () {
        projectDelete.style.display = "none";
    };

    cancelButtondel.onclick = function () {
        projectDelete.style.display = "none";
    };
}

// sửa dự án 
function editProject(id) {
    let projectEdit = document.getElementById("overley-edit");
    let projectNameEditInput = document.getElementById("projectNameEdit");
    let describeEditInput = document.getElementById("describeEdit"); // Lấy phần mô tả
    let editError = document.getElementById("editError");
    let editErrorDescribe = document.getElementById("editErrorDescribe");

    let project = projects.find((task) => task.id === id);
    projectNameEditInput.value = project.projectName;
    describeEditInput.value = project.description || "";
    editError.style.display = "none";
    editErrorDescribe.style.display = "none";
    projectEdit.style.display = "flex";
    projectNameEditInput.style.border = "";
    describeEditInput.style.border = "";

    let editProjectButton = document.getElementById("buttonEdit");
    editProjectButton.onclick = function () {
        let inputValue = projectNameEditInput.value.trim();
        let describeValue = describeEditInput.value.trim();
        let hasError = false;
        if (inputValue === "") {
            editError.textContent = "Tên dự án trống";
            editError.style.display = "block";
            projectNameEditInput.style.border = "1px solid red";
            hasError = true;
        } else if (inputValue.trim().length < 5 || inputValue.trim().length >= 50) {
            editError.textContent = "Tên dự án phải từ 5 đến dưới 50 ký tự!";
            editError.style.display = "block";
            projectNameEditInput.style.border = "1px solid red";
            hasError = true;
        }
        if (describeValue === "") {
            editErrorDescribe.textContent = "Mô tả dự án trống";
            editErrorDescribe.style.display = "block";
            describeEditInput.style.border = "1px solid red";
            hasError = true;
        } else if (describeValue.trim().length < 5 || describeValue.trim().length >= 1000) {
            editErrorDescribe.textContent = "Tên mô tả phải từ 5 đến dưới 1000 ký tự!";
            editErrorDescribe.style.display = "block";
            describeEditInput.style.border = "1px solid red";
            hasError = true;
        }
        if (hasError) return;
        let check = false;
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].projectName.toLowerCase() === inputValue.toLowerCase() && projects[i].id !== id) {
                check = true;
                break;
            }
        }
        if (check) {
            editError.textContent = "Tên dự án đã tồn tại";
            editError.style.display = "block";
            return;
        }
        project.projectName = inputValue;
        project.description = describeValue;
        projectEdit.style.display = "none";
        save();
        renderProject();
    };
    let closeEditButton = document.getElementById("close-edit");
    let cancelEditButton = document.getElementById("buttonCancelEdit");
    closeEditButton.onclick = function () {
        projectEdit.style.display = "none";
    };
    cancelEditButton.onclick = function () {
        projectEdit.style.display = "none";
    };
    projectNameEditInput.oninput = function () {
        editError.style.display = "none";
        projectNameEditInput.style.border = "";
    };
    describeEditInput.oninput = function () {
        editErrorDescribe.style.display = "none";
        describeEditInput.style.border = "";
    };
}


// chi tiet
let choosenProject
function detailProject(id) {
    choosenProject = Number(id);
    localStorage.setItem("choosenProject", JSON.stringify(choosenProject));
    window.location.href = "product-mamager.html";
}
// tìm kiếm 
let searchInput = document.getElementById("search-Project");
searchInput.onkeydown = function (item) {
    if (item.key === "Enter") {
        searchProjects(searchInput.value);
        return; 
    }
};
function searchProjects(keyword) {
    let listProject = document.getElementById("projects");
    listProject.innerHTML = "";
    let flag;
    if (keyword === "") {
        renderProject();
        return; // 
    } else {
        flag = projects.filter(item =>
            item.ownerId === user.id && item.projectName.toLowerCase().includes(keyword.toLowerCase())
        );
    }
    flag.forEach(function (item) {
        listProject.innerHTML += `
            <tr>
                <td class="table-id">${item.id}</td>
                <td>${item.projectName}</td>
                <td class="action">
                    <button id="btn-edit" class="btn" onclick="editProject(${item.id})">Sửa</button>
                    <button id="btn-delete" class="btn" onclick="deleteProject(${item.id})">Xóa</button>
                    <button id="btn-detail" class="btn" onclick="detailProject(${item.id})">Chi tiết</button>
                </td>
            </tr>
        `;
    });
}


