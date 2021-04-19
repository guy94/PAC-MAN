// var usersMap = { k: "k" };

// function validateSignUp(e) {
//   e.preventDefault();

//   let userName = $("#uname").val();
//   let fullName = $("#fname").val();
//   let email = $("#email").val();
//   let password = $("#pword").val();
//   let repeatPassWord = $("#repeatPword").val();

//   const passwordValidation = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z]).{6,}");
//   const nameValidation = new RegExp("![^a-zA-Z]");
//   const emailValidation = new RegExp("[S+@S+.S+]");

//   let names = fullName.split(" ");
//   let numOfValidations = 5;

//   $(".signup").filter(function () {
//     return $.trim($(this).val()).length == 0;
//   }).length == 0
//     ? numOfValidations--
//     : null;

//   passwordValidation.test(password) ? numOfValidations-- : null;
//   emailValidation.test(email) ? numOfValidations-- : null;
//   password === repeatPassWord ? numOfValidations-- : null;

//   const numberInName = names.filter((item) => nameValidation.test(item));
//   numberInName.length == 0 ? numOfValidations-- : null;

//   if (numOfValidations != 0) {
//     alert("form is not defined well.");
//   } else {
//     location.href = "#welcome";
//     usersMap[userName] = password;
//   }
// }

// function loginUser(e) {
//   e.preventDefault();
//   let loginUserName = $("#loginUserName").val();
//   let loginPassword = $("#loginPassword").val();

//   if (isLoggedIn == true) {
//     alert("A user is already logged in.");
//   } else if (
//     loginUserName in usersMap &&
//     usersMap[loginUserName] == loginPassword
//   ) {
//     isLoggedIn = true;
//     page = "game";
//     Start();
//   } else {
//     alert("Details are wrong. Try again or register.");
//   }
// }