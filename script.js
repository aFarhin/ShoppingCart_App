
const loginBtn = document.getElementById("login");
const signupBtn = document.getElementById("signup");

loginBtn.addEventListener("click", function () {
  console.log("Login button clicked");
  window.location.href = "./login/login.html";
});

signupBtn.addEventListener("click", function () {
  console.log("signup button clicked");
  window.location.href = "./Signup/signup.html";
});
function entry(){
  if(localStorage.getItem("currentUser")){
      window.location.href = "./shop/shop.html";    
  }
}
entry();
