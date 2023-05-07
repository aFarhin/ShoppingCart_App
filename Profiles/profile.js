const savedUsers = JSON.parse(localStorage.getItem("users"));
const savedCurrentUser = JSON.parse(localStorage.getItem("currentUser"));

const firstNameInput = document.getElementById("fName");
const lastNameInput = document.getElementById("lName");
const emailInput = document.getElementById("email");
const oldPasswordInput = document.getElementById("old-password");
const newPasswordInput = document.getElementById("new-password");
const confirmNewPasswordInput = document.getElementById("cnfm-pass");



if (savedCurrentUser) {
  firstNameInput.value = savedCurrentUser.firstName;
  lastNameInput.value = savedCurrentUser.lastName;
}

const saveInfoButton = document.getElementById("saveInfo");
saveInfoButton.addEventListener("click", updateInfo);


function updateInfo() {
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();

  if (!firstName || !lastName) {
    alert("Please fill out all fields.");
    return;
  } else {
    savedCurrentUser.firstName = firstName;
    savedCurrentUser.lastName = lastName;
    const userIndex = savedUsers.findIndex(user => user.email === savedCurrentUser.email);
    savedUsers[userIndex] = savedCurrentUser;

    localStorage.setItem("users", JSON.stringify(savedUsers));
    localStorage.setItem("currentUser", JSON.stringify(savedCurrentUser));

    console.log('savedUsers:', savedUsers);
    console.log('savedCurrentUser:', savedCurrentUser);

    alert("User info saved successfully!");
  }


  if (!savedCurrentUser) {
    alert("No user data found.");
    return;
  }
}

const changePass = document.getElementById("change");
changePass.addEventListener("click", () => {

  const oldPassword = oldPasswordInput.value.trim();
  const newPassword = newPasswordInput.value.trim();
  const confirmNewPassword = confirmNewPasswordInput.value.trim();

  if (oldPassword === savedCurrentUser.password) {
    if (newPassword === confirmNewPassword) {
      savedCurrentUser.password = newPassword;

      const userIndex = savedUsers.findIndex(user => user.email === savedCurrentUser.email);
      savedUsers[userIndex] = savedCurrentUser;

      localStorage.setItem("users", JSON.stringify(savedUsers));
      localStorage.setItem("currentUser", JSON.stringify(savedCurrentUser));

      console.log('savedUsers:', savedUsers);
      console.log('savedCurrentUser:', savedCurrentUser);
      alert("Password is changed successfully!")

    } else {
      alert("New password and confirm new password do not match.");
    }
  } else if (!newPassword || !confirmNewPassword || !oldPassword) {
    alert("Please fill out all fields.");
    return;
  } else {
    alert("Incorrect old password");
  }
})

const logoutButton = document.getElementById("logOut");
logoutButton.addEventListener("click", logout);

function logout() {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  delete currentUser.token;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  localStorage.removeItem("currentUser")
  localStorage.removeItem("token");
  alert("Confirmed to logout?");
  window.location.href = "../login/login.html";
}

