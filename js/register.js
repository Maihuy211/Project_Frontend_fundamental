document.getElementById("btn").onclick = function() {
    let name = document.getElementById("username");
    let email = document.getElementById("email");
    let pass = document.getElementById("pass");
    let confirmPass = document.getElementById("confirm");

    let errorName = document.getElementById("errorName");
    let errorEmail = document.getElementById("errorEmail");
    let errorPass = document.getElementById("errorPass");
    let errorConfirm = document.getElementById("errorConfirm");

    let nameValue = name.value.trim();
    let emailValue = email.value.trim();
    let passValue = pass.value.trim();
    let confirmPassValue = confirmPass.value.trim();

    errorName.textContent = "";
    errorEmail.textContent = "";
    errorPass.textContent = "";
    errorConfirm.textContent = "";
    name.classList.remove("error-border");
    email.classList.remove("error-border");
    pass.classList.remove("error-border");
    confirmPass.classList.remove("error-border");
    let check = false;
    if (nameValue === "") {
        errorName.textContent = "Họ và tên không được để trống";
        name.classList.add("error-border");
        check = true;
    }
    if (!emailValue.includes("@") || !(emailValue.endsWith(".com") || emailValue.endsWith(".vn"))) {
        errorEmail.textContent = "Email không hợp lệ";
        email.classList.add("error-border");
        check = true;
    }
    if (passValue === "" || passValue.length < 8) {
        errorPass.textContent = "Mật khẩu không được để trống và phải có ít nhất 8 ký tự";
        pass.classList.add("error-border");
        check = true;
    }
    if (passValue !== confirmPassValue) {
        errorConfirm.textContent = "Mật khẩu không khớp";
        confirmPass.classList.add("error-border");
        check = true;
    }
    if (check) return;
    if (localStorage.getItem(emailValue)) {
        errorEmail.textContent = "Email đã tồn tại";
        email.classList.add("error-border");
        return;
    }
    localStorage.setItem(emailValue, passValue);
    window.location.href = "dashboard.html";
};
