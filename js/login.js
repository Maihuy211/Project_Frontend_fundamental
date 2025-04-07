document.getElementById("btn").onclick = function () {
    let email = document.getElementById("email");
    let pass = document.getElementById("password");
    let errorEmail = document.getElementById("errorEmail");
    let errorPass = document.getElementById("errorPass");

    let emailValue = email.value.trim();
    let passValue = pass.value.trim();

    errorEmail.textContent = "";
    errorPass.textContent = "";
    email.classList.remove("error-border");
    pass.classList.remove("error-border");

    let check = false;

    if (emailValue === "") {
        errorEmail.textContent = "Email không được để trống";
        email.classList.add("error-border");
        check = true;
    }
    if (passValue === "") {
        errorPass.textContent = "Mật khẩu không được để trống";
        pass.classList.add("error-border");
        check = true;
    }
    if (check) return;
    if (!emailValue.includes("@") || 
        !(emailValue.endsWith(".com") || emailValue.endsWith(".net") || emailValue.endsWith(".vn") || emailValue.endsWith(".org"))) {
        errorEmail.textContent = "Email không hợp lệ!";
        email.classList.add("error-border");
        return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(item => item.email === emailValue);
    if (!user) {
        errorEmail.textContent = "Email chưa được đăng ký!";
        email.classList.add("error-border");
        return;
    }
    if (passValue === user.password) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "dashboard.html";
    } else {
        errorPass.textContent = "Sai mật khẩu. Vui lòng thử lại!";
        pass.classList.add("error-border");
    }
};
