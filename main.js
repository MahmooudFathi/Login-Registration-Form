const formOpenBtn = document.querySelector("#form-open"),
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form_container"),
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});

document.querySelector(".signup_form form").addEventListener("submit", (e) => {
  e.preventDefault();

  let name = document.querySelector(".signup_form input[placeholder='Enter your name']").value.trim();
  let email = document.querySelector(".signup_form input[placeholder='Enter your email']").value.trim();
  let password = document.querySelector(".signup_form input[placeholder='Create password']").value.trim();
  let confirmPassword = document.querySelector(".signup_form input[placeholder='Confirm password']").value.trim();

  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some((user) => user.email === email)) {
    alert("This email is already registered. Please use another email.");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful! You can now log in.");
  formContainer.classList.remove("active"); 
});

document.querySelector(".login_form form").addEventListener("submit", (e) => {
  e.preventDefault();

  let email = document.querySelector(".login_form input[placeholder='Enter your email']").value.trim();
  let password = document.querySelector(".login_form input[placeholder='Enter your password']").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find((user) => user.email === email && user.password === password);

  if (user) {
    alert(`Welcome, ${user.name}!`);
    localStorage.setItem("loggedInUser", JSON.stringify(user)); // حفظ المستخدم المسجل
    updateLoginButton(user); // تحديث زر تسجيل الدخول
    home.classList.remove("show"); // إغلاق نافذة تسجيل الدخول
  } else {
    alert("Invalid email or password. Please try again.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  updateLoginButton(loggedInUser);
});

function updateLoginButton(user) {
  const loginButton = document.querySelector("#form-open");

  if (user) {
    loginButton.textContent = "Logout";
    loginButton.removeEventListener("click", openLoginForm); // منع فتح نافذة تسجيل الدخول
    loginButton.addEventListener("click", logoutUser);
  } else {
    loginButton.textContent = "Login";
    loginButton.removeEventListener("click", logoutUser);
    loginButton.addEventListener("click", openLoginForm);
  }
}

function openLoginForm() {
  home.classList.add("show");
}

function logoutUser() {
  localStorage.removeItem("loggedInUser");
  alert("You have been logged out.");
  updateLoginButton(null);
  location.reload(); 
}
