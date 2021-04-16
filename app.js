var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var page;
var startAngle = 0;
var endAngle = 0;
var eyeX = 5;
var eyeY = -15
// var usersMap = {"k": "k"};
sessionStorage.setItem("k", "k")
var isLoggedIn = false;

$(document).ready(function () {
	handlePages();
  
  context = canvas.getContext("2d");
  $("#game").hide()
});

// $(document).ready(function() {
// 	context = canvas.getContext("2d");

// 	Start();
// });

// @TODO - we need to think about Game page. 
function handlePages() {
	$(".pages").hide();
    
	$("#navigationMenu a").click(function (e) {
        e.preventDefault();

		cleanUp(page);

    page = this.href.split("#")[1];
    switch(page) {
      
      case "game":
				handleGamePage();
        isLoggedIn ? Start() : null;
			  break;
			case "welcome":
				handleWelcomePage();
			  break;
			case "signUp":
				handleSignUpPage();
			  break;
			case "login":
				handleLoginPage();
			  break;
			case "settings":
				handleSettingsPage();
			  break;
			case "about":
				handleAboutPage();
			  break;
		  }
		
        $(".pages:visible").slideUp(function () {
            $("#" + page).slideDown();
        });
    });
    
	// first page
	$("#welcome").show();
	page = "welcome";
}

function cleanUp(oldPage) {
	switch(oldPage) {
		case "welcome":
			alert(" cleanUp -> welcome");
		  break;
		case "signUp":
			alert(" cleanUp -> signUp");
		  break;
		case "login":
			alert(" cleanUp -> login");
		  break;
		case "settings":
			alert(" cleanUp -> settings");
		  break;
		case "about":
			alert(" cleanUp -> about");
		  break;
    case "game":
      window.clearInterval(interval);
      $("#canvas").hide()      
      lblScore.value = 0;
      lblTime.value = 0;
			alert(" cleanUp -> game");
		  break;
	  }
}

function handleWelcomePage() {
	alert(" welcome page ");
}
function handleSignUpPage() {
	alert(" signUp page ");
}
function handleLoginPage() {
	alert(" login page ");
}
function handleSettingsPage() {
	alert(" settings page ");
}
function handleAboutPage() {
	alert(" about page ");
}
function handleGamePage() {
	alert(" about page ");
}

function Start() {
  $(".pages").hide();
  $("#game").show()
  $("#canvas").show()
    
  board = new Array();
  score = 0;
  pac_color = "yellow";
  var cnt = 100;
  var food_remain = 50;
  var pacman_remain = 1;
  start_time = new Date();
  for (var i = 0; i < 10; i++) {
    board[i] = new Array();
    //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
    for (var j = 0; j < 10; j++) {
      if (
        (i == 3 && j == 3) ||
        (i == 3 && j == 4) ||
        (i == 3 && j == 5) ||
        (i == 6 && j == 1) ||
        (i == 6 && j == 2)
      ) {
        board[i][j] = 4;
      } else {
        var randomNum = Math.random();
        if (randomNum <= (1.0 * food_remain) / cnt) {
          food_remain--;
          board[i][j] = 1;
        } else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
          shape.i = i;
          shape.j = j;
          pacman_remain--;
          board[i][j] = 2;
        } else {
          board[i][j] = 0;
        }
        cnt--;
      }
    }
  }
  while (food_remain > 0 && location.href == "#game") {
    var emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = 1;
    food_remain--;
  }
  keysDown = {};
  addEventListener(
    "keydown",
    function (e) {
      keysDown[e.keyCode] = true;
    },
    false
  );
  addEventListener(
    "keyup",
    function (e) {
      keysDown[e.keyCode] = false;
    },
    false
  );
  interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
  var i = Math.floor(Math.random() * 9 + 1);
  var j = Math.floor(Math.random() * 9 + 1);
  while (board[i][j] != 0) {
    i = Math.floor(Math.random() * 9 + 1);
    j = Math.floor(Math.random() * 9 + 1);
  }
  return [i, j];
}

function GetKeyPressed() {
  if (keysDown[38]) {
    return 1;
  }
  if (keysDown[40]) {
    return 2;
  }
  if (keysDown[37]) {
    return 3;
  }
  if (keysDown[39]) {
    return 4;
  }
}

function Draw() {
  canvas.width = canvas.width; //clean board
  lblScore.value = score;
  lblTime.value = time_elapsed;
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      var center = new Object();
      center.x = i * 60 + 30;
      center.y = j * 60 + 30;
      if (board[i][j] == 2) {
        context.beginPath();
        context.arc(center.x, center.y, 30, 0.15 * Math.PI + startAngle, 1.85 * Math.PI + endAngle); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = pac_color; //color
        context.fill();
        context.beginPath();
        context.arc(center.x + eyeX, center.y + eyeY, 5, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color
        context.fill();
      } else if (board[i][j] == 1) {
        context.beginPath();
        context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color
        context.fill();
      } else if (board[i][j] == 4) {
        context.beginPath();
        context.rect(center.x - 30, center.y - 30, 60, 60);
        context.fillStyle = "grey"; //color
        context.fill();
      }
    }
  }
}

function UpdatePosition() {
  board[shape.i][shape.j] = 0;
  var x = GetKeyPressed();
  if (x == 1) {
    if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
      shape.j--;
      startAngle = -Math.PI / 2;
      endAngle = -Math.PI / 2;
      eyeX = 17;
      eyeY = -9;

    }
  }
  if (x == 2) {
    if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
      shape.j++;
      startAngle = Math.PI / 2;
      endAngle = Math.PI / 2;
      eyeX = -17;
      eyeY = 9;
      
    }
  }
  if (x == 3) {
    if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
      shape.i--;
      startAngle = Math.PI;
      endAngle = Math.PI;
      eyeX = -5;
      eyeY = -15;
    }
  }
  if (x == 4) {
    if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
      shape.i++;
      startAngle = 0;
      endAngle = 0;
      eyeX = 5;
      eyeY = -15;
    }
  }
  if (board[shape.i][shape.j] == 1) {
    score++;
  }
  board[shape.i][shape.j] = 2;
  var currentTime = new Date();
  time_elapsed = (currentTime - start_time) / 1000;
  if (score >= 20 && time_elapsed <= 10) {
    pac_color = "green";
  }
  if (score == 50) {
    window.clearInterval(interval);
    window.alert("Game completed");
  } else {
    Draw();
  }
}

//GUY
function validateSignUp() {
  let userName = $("#uname").val();
  let fullName = $("#fname").val();
  let email = $("#email").val();
  let password = $("#pword").val();
  let repeatPassWord = $("#repeatPword").val();
  
  const passwordValidation = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z]).{6,}");
  const nameValidation = new RegExp("![^a-zA-Z]");
  const emailValidation = new RegExp("[S+@S+.S+]");

  let names = fullName.split(" ");
  let numOfValidations = 5;

  ($(".signup").filter(function () {
    return $.trim($(this).val()).length == 0;
  }).length == 0 ? numOfValidations-- : null)

  passwordValidation.test(password) ? numOfValidations-- : null;
  emailValidation.test(email) ? numOfValidations-- : null;
  password === repeatPassWord ? numOfValidations-- : null;

  const numberInName = names.filter((item) => nameValidation.test(item));
  numberInName.length == 0 ? numOfValidations-- : null;
 
  if (numOfValidations != 0) {
    alert("form is not defined well.");
  }

  else{
    location.href = "#welcome";
    // usersMap[userName] = password;   
    sessionStorage.setItem(userName, password); 
  }
}

//GUY
function loginUser(){
  let loginUserName = $("#loginUserName").val();
  let loginPassword = $("#loginPassword").val();

  // if(loginUserName in usersMap && usersMap[loginUserName] == loginPassword){    
  //   location.href = "#game";  
  //   isLoggedIn = true;
  //   page = "game";
  //   Start()        
  // }

  if(isLoggedIn == true){
    alert("A user is already logged in.")
  }

  else if(sessionStorage.getItem(loginUserName) === loginPassword){    
    location.href = "#game";  
    isLoggedIn = true;
    page = "game";
    Start()        
  }

  else{
    alert("Details are wrong. Try again or register.");
  }
}
