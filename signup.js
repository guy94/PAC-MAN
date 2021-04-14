function validateSignUp() {
  let fullName = $("#fname").val();
  console.log(fullName);
  let email = $("#email").val();
  let passWord = $("#pword").val();
  let numOfValidations = 3;

  const passwordValidation = new RegExp(
    "(?=.*d)((?=.*[a-z])|(?=.*[A-Z])).{6,}"
  );
  const nameValidation = new RegExp("[^a-zA-Z]");
  const emailValidation = new RegExp("[S+@S+.S+]");
  let isValid = true;

  let names = fullName.split(" ");

  isEmpty =
    $("input").filter(function () {
      return $.trim($(this).val()).length == 0;
    }).length == 0;

  if (isEmpty) {
    isValid = passwordValidation.test(fullName) ? numOfValidations-- : null;
    isValid = emailValidation.test(email) ? numOfValidations-- : null;

    const numberInName = names.filter((item) => !nameValidation.test(item));
    isValid = numberInName.length == 0 ? numOfValidations-- : null;
  }

  if (numOfValidations != 0) {
    alert("form is not defined well.");
  }
}
