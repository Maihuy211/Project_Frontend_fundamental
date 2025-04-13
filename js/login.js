document.getElementById("btn").onclick = function () {
    let email = document.getElementById("email");
    let pass = document.getElementById("password");
    let errorEmail = document.getElementById("errorEmail");
    let errorPass = document.getElementById("errorPass");

    let emailValue = email.value.trim();
    let passValue = pass.value.trim();
    
    let check = false;

    if (emailValue === "") {
        Swal.fire({
            icon: "error",
            title: "LỖI",
            text: "Email không được để trống",
          });
        check = true;
    }
    if (passValue === "") {
        Swal.fire({
            icon: "error",
            title: "LỖI",
            text: "Mật Khẩu ko được để trống",
          });
        check = true;
    }
    if (check) return;
    if (!emailValue.includes("@") || !(emailValue.endsWith(".com") || emailValue.endsWith(".vn"))) {
        Swal.fire({
            icon: "error",
            title: "LỖI",
            text: "Email sai định dạng",
          });
        return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(item => item.email === emailValue);
    if (!user) {
        Swal.fire({
            icon: "error",
            title: "LỖI",
            text: "Email chưa đc đăng kí",
          });
        return;
    }
    if (passValue === user.password) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
        Swal.fire({
            icon: "success",
            title: "Đăng nhập thành công",
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(()=>{
            window.location.href = "dashboard.html";
        },1500) 
    } else {
        Swal.fire({
            icon: "error",
            title: "LỖI",
            text: "Sai mật khẩu, vui lòng thử lại",
          });
    }
};
