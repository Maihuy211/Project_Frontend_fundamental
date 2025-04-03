const projects = JSON.parse(localStorage.getItem("projects"))||[
    { 
        id: 1, 
        projectName: "Xây dựng website thương mại điện tử",
        members: [
            { userId: 1, role: "Project owner" },
            { userId: 2, role: "Frontend developer" }
        ]
    },
    { 
        id: 2, 
        projectName: "Phát triển ứng dụng di động",
        members: [
            { userId: 1, role: "Project owner" },
            { userId: 2, role: "Frontend developer" }
        ]
    },
    { 
        id: 3, 
        projectName: "Quản lý dữ liệu khách hàng",
        members: [
            { userId: 1, role: "Project owner" },
            { userId: 2, role: "Frontend developer" }
        ]
    },
    { 
        id: 4, 
        projectName: "Xây dựng website thương mại điện tử",
        members: [
            { userId: 1, role: "Project owner" },
            { userId: 2, role: "Frontend developer" }
        ]
    },
    { 
        id: 5, 
        projectName: "Phát triển ứng dụng di động",
        members: [
            { userId: 1, role: "Project owner" },
            { userId: 2, role: "Frontend developer" }
        ]
    },
    { 
        id: 6, 
        projectName: "Quản lý dữ liệu khách hàng",
        members: [
            { userId: 1, role: "Project owner" },
            { userId: 2, role: "Frontend developer" }
        ]
    },
    { 
        id: 7, 
        projectName: "Xây dựng website thương mại điện tử",
        members: [
            { userId: 1, role: "Project owner" },
            { userId: 2, role: "Frontend developer" }
        ]
    },
    { 
        id: 8, 
        projectName: "Phát triển ứng dụng di động",
        members: [
            { userId: 1, role: "Project owner" },
            { userId: 2, role: "Frontend developer" }
        ]
    },
    { 
        id: 9, 
        projectName: "Quản lý dữ liệu khách hàng",
        members: [
            { userId: 1, role: "Project owner" },
            { userId: 2, role: "Frontend developer" }
        ]
    }
];
function save() {
    localStorage.setItem('projects', JSON.stringify(projects));
}
let currentPage = 1;
const rowsPerPage = 4;

function renderProject() {
    let listProject = document.getElementById("projects");
    listProject.innerHTML = "";
    const start = (currentPage - 1) * rowsPerPage;
    const paginatedItems = projects.slice(start, start + rowsPerPage);  
    paginatedItems.forEach(item => {
        listProject.innerHTML += `
            <tr>
                <td class="table-id">${item.id}</td>
                <td>${item.projectName}</td>
                <td class="action">
                    <button class="btn" id="btn-edit" onclick="editProject(${item.id})">Sửa</button>
                    <button class="btn" id="btn-delete" onclick="deleteProject(${item.id})">Xóa</button>
                    <button class="btn " id="btn-detail" onclick="detailProject(${item.id})">Chi tiết</button>
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
    const totalPages = Math.ceil(projects.length / rowsPerPage);
    
    pagination.innerHTML += `<li class="page-item"><a class="page-link" href="#" onclick="previousPage()"><</a></li>`;
    
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `<li class="page-item"><a class="page-link" href="#" onclick="goToPage(${i})">${i}</a></li>`;
    }
    
    pagination.innerHTML += `<li class="page-item"><a class="page-link" href="#" onclick="nextPage(${totalPages})">></a></li>`;
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
let addProjcetButton = document.getElementById("buttonAdd");
let closeButton = document.getElementById("close");
let cancelButton = document.getElementById("buttonCancel");
let projectAdd = document.getElementById("overley-add");
let projectDescriptionInput = document.getElementById("describe");
let error = document.getElementById("error");
let projectNameInput = document.getElementById("projectName");
addButton.onclick = function () {
    projectNameInput.value = "";
    projectDescriptionInput.value = "";
    error.style.display = "none";
    projectAdd.style.display = "flex";
    projectNameInput.style.borderBlockColor = "";
    projectNameInput.style.borderRightColor = "";
    projectNameInput.style.borderLeftColor = "";

};
closeButton.onclick = function () {
    projectAdd.style.display = "none";
};
cancelButton.onclick = function () {
    projectAdd.style.display = "none";
};
addProjcetButton.onclick = function () {
    addProject();
};

function addProject() {
    let inputValue = projectNameInput.value.trim();
    if (inputValue === "") {
        error.textContent = "Tên dự án trống";
        error.style.display = "block";
        projectNameInput.style.border="1px solid red";
        return;
    }
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
        projectNameInput.style.border="1px solid red";
        return;
    }
    let id = 1;
    if (projects.length > 0) {
        id = projects[projects.length - 1].id + 1;
    }
    let newProject = {
        id: id,
        projectName: inputValue,
        members: []
    };
    projects.push(newProject);
    projectNameInput.value = "";
    error.style.display = "none";
    projectAdd.style.display = "none";
    save();
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
    let editError = document.getElementById("editError");

    let project = projects.find((task) => task.id === id);
    projectNameEditInput.value = project.projectName; 
    editError.style.display = "none";
    projectEdit.style.display = "flex";
    projectNameEditInput.style.borderBlockColor = "";
    projectNameEditInput.style.borderRightColor = "";
    projectNameEditInput.style.borderLeftColor = "";

    let editProjcetButton = document.getElementById("buttonEdit");
    editProjcetButton.onclick = function () {
        let inputValue = projectNameEditInput.value.trim();
        if (inputValue === "") {
            editError.textContent = "Tên dự án trống";
            editError.style.display = "block";
            projectNameInput.style.border="1px solid red";
            return;
        }
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
            projectNameInput.style.border="1px solid red";
            return;
        }
        project.projectName = inputValue;
        projectNameEditInput.value = "";
        editError.style.display = "none";
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
}

// chi tiet
let choosenProject
function detailProject(id){
    choosenProject = Number(id);
    localStorage.setItem("choosenProject",JSON.stringify(choosenProject));
    window.location.href = "product-mamager.html";
}
// tìm kiếm 
let searchInput = document.getElementById("search-Project");
searchInput.oninput = function () {
    searchProjects(searchInput.value);
};
function searchProjects(keyword) {
    let listProject = document.getElementById("projects");
    listProject.innerHTML = ""; 
    let flag; 
    if (keyword === "") {
        flag = projects;
    } else {
        flag = projects.filter(function (item) {
            return item.projectName.toLowerCase().includes(keyword.toLowerCase());
        });
    }
    flag.forEach(function (item) {
        listProject.innerHTML += `
            <tr>
                <td class="table-id">${item.id}</td>
                <td>${item.projectName}</td>
                <td class="action">
                    <button id="btn-edit" class="btn" onclick="editProject(${item.id})">Sửa</button>
                    <button id="btn-delete" class="btn" onclick="deleteProject(${item.id})">Xóa</button>
                    <button id="btn-detail" class="btn">Chi tiết</button>
                </td>
            </tr>
        `;
    });
}


