const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login");

loginButton.addEventListener("click", validateInputs);

function validateInputs() {

  const savedUsers = JSON.parse(localStorage.getItem("users"));
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!savedUsers) {
    alert("No user data found.Please Signup at first");
    window.location.href = "../Signup/signup.html";
    return;
  }

  const currentUser = savedUsers.find(user => user.email === email && user.password === password);

  if (currentUser) {
    const token = generateToken(16);

    currentUser.token = token;

    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    window.location.href = "../shop/shop.html";
  } else {
    alert("Incorrect email or password.");
  }
}

function generateToken(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=[]{}|\\;:\"<>,.?/~";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}
