function validateSignUp(e) {
    e.preventDefault();
  
    let userName = $("#uname").val();
    let fullName = $("#fname").val();
    let email = $("#email").val();
    let password = $("#pword").val();
    let repeatPassWord = $("#repeatPword").val();
  
    const passwordValidation = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z]).{6,}");
    // const nameValidation = new RegExp("\d");
    const emailValidation = new RegExp("[S+@S+.S+]");
  
    let names = fullName.split(" ");
    let numOfValidations = 5;
  
    $(".signup").filter(function () {
      return $.trim($(this).val()).length == 0;
    }).length == 0
      ? numOfValidations--
      : null;
  
    passwordValidation.test(password) ? numOfValidations-- : null;
    emailValidation.test(email) ? numOfValidations-- : null;
    password === repeatPassWord ? numOfValidations-- : null;
  
    const numberInName = names.filter((item) => /\d/.test(item));
    numberInName.length == 0 ? numOfValidations-- : null;

    if( userName in usersMap){
      timeOutAlert("The username you chose is already taken.");
      }
    else if (numOfValidations != 0) {
      timeOutAlert("form is not defined well.");
    } else {
      usersMap[userName] = password;
      $("a[href='#welcome']").click();
    }
  }
  
  function loginUser(e) {
    e.preventDefault();
  
    let loginUserName = $("#loginUserName").val();
    let loginPassword = $("#loginPassword").val();
  
    if (isLoggedIn == true) {
      timeOutAlert("A user is already logged in.");
    } 
    else if ( loginUserName in usersMap &&
              usersMap[loginUserName] == loginPassword) {
      isLoggedIn = true;
      UserName = loginUserName;
      $("a[href='#settings']").click();
    } 
    else {
      timeOutAlert("Details are wrong. Try again or register.");
    }
  }