var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var monstersInterval;
var page;
var startAngle = 0;
var endAngle = 0;
var eyeX = 5;
var eyeY = -15;
var usersMap = { k: "k" };
var isLoggedIn = false;
var prizeIsAlive = true;
var isEating = false;
var UserName = "";


$(document).ready(function () {
  handleMenuPages();
  context = canvas.getContext("2d");
  $('#dialog-2').bind({
    mouseenter: function(e) {
    // Hover event handler
    aboutClick = false;
    },
    mouseleave: function(e) {
    // Hover event handler
    aboutClick = true;
    },
   });

});

function handlePages(page, clean) {
  cleanUp(clean);

  switch (page) {
    case "game":
      isLoggedIn ? Start() : null;
      isLoggedIn ? playBackGroundAudio() : null;
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
      aboutClick = false;
      handleAboutPage();
      break;
  }

  $(".pages:visible").slideUp(function () {
    if(page == "about"){
      aboutClick = true;
    };
    $("#" + page).slideDown();
  });
}
function handleMenuPages() {
  $(".pages").hide();

  $(".tabs a").click(function (e) {
    e.preventDefault();

    var oldPage = page;
    page = this.href.split("#")[1];

    handlePages(page, oldPage);
  });

  // first page
  $("#welcome").show();
  page = "welcome";
  handleWelcomePage();
}


function cleanUp(oldPage) {
  switch (oldPage) {
    case "welcome":
      document
        .getElementById("welcome-reg")
        .removeEventListener("click", signUpButton);
      document
        .getElementById("welcome-log")
        .removeEventListener("click", loginButton);
      break;
    case "signUp":
      // alert(" cleanUp -> signUp");
      break;
    case "login":
      document
        .getElementById("loginSubmit")
        .removeEventListener("click", loginUser);
      break;
    case "settings":
      break;
    case "about":
      break;
    case "game":
      window.clearInterval(interval);
      window.clearInterval(monstersInterval);
      $("#canvas").hide();
      lblScore.value = 0;
      lblTime.value = 0;

      stopGroundAudio();
      break;
  }
}

function handleWelcomePage() {
  document
    .getElementById("welcome-reg")
    .addEventListener("click", signUpButton);
  document.getElementById("welcome-log").addEventListener("click", loginButton);
}

function signUpButton() {
  page = "signUp";
  // to trigger the menu slide
  $("a[href='#signUp']").click();
  handlePages(page, "welcome");
}

function loginButton() {
  page = "login";
  // to trigger the menu slide
  $("a[href='#login']").click();
  handlePages(page, "welcome");
}

function handleSignUpPage() {
  // alert(" signUp page ");
}
function handleLoginPage() {
  document.getElementById("loginSubmit").addEventListener("click", loginUser);
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
    window.addEventListener("keydown", function(e) {
      if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
          e.preventDefault();
      }}, false);
        
  $(".pages:visible").slideUp(function () {
    $("#game").slideDown();
  });
  $("#canvas").show();

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
      }
      else {
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
  while (food_remain > 0) {
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

  initMonsters();
  interval = setInterval(UpdatePosition,150);
  setTimeout(() => {
    monstersInterval = setInterval(updateMonsters, 250);
  },3000);

  
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
        context.arc(
          center.x,
          center.y,
          30,
          0.15 * Math.PI + startAngle,
          1.85 * Math.PI + endAngle
        ); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = pac_color; //color
        context.fill();
        context.beginPath();
        context.arc(center.x + eyeX, center.y + eyeY, 5, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color
        context.fill();
      } else if (board[i][j] == 1) {
        let imageObj = new Image();
        imageObj.src = "photos\\gel.png";
        context.drawImage(imageObj,center.x, center.y,40,40);
        // context.beginPath();
        // context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        // context.fillStyle = "white"; //color
        // context.fill();
      } else if (board[i][j] == 4) {
        context.beginPath();
        context.rect(center.x - 30, center.y - 30, 60, 60);
        context.fillStyle = "grey"; //color
        context.fill();
      }
    }
  }
  drawMonsters()

  if(prizeIsAlive){
    drawPrizeCharacter()
  }

  if(isEating)
  {
    playEatAudio();
  }
  else
  {
    StopEatAudio();
  }
}

function drawMonsters(){
  for (var i = 0; i < numOfMonsters; i++) {
    context.beginPath();
    context.rect(monstersPositions[monstersNames[i]].x * 60 + 30, monstersPositions[monstersNames[i]].y * 60 + 30,20,20);
    context.fillStyle = "green";
    context.fill();

    //Game Over!
    if(monstersPositions[monstersNames[i]].x == shape.i && monstersPositions[monstersNames[i]].y == shape.j){
      livesCounter--;
      score -= 10;
      if(livesCounter <= 0){
        alert("You are dead!")
        window.clearInterval(interval);
        window.clearInterval(monstersInterval);
        stopGroundAudio();
      }
      else{
        resetPositions()
      }
    }
  }
}


// after getting hit by a monster, all monsters go back to the corners.
function resetPositions(){
  let pacmanCell = findRandomEmptyCell(board)
  board[shape.i][shape.j] = 0;
  shape.i = pacmanCell[0];
  shape.j = pacmanCell[1];

  clearInterval(monstersInterval);
  monstersInterval = null;

  initMonsters()
  setTimeout(() => {
    monstersInterval = setInterval(updateMonsters, 100);
     },3000);
}

//draws the prize. 50 points are added.
function drawPrizeCharacter(){

  context.beginPath();
//   let imageObj = new Image();
//   imageObj.src = "photos\\vaccine.png";
//   context.drawImage(imageObj,prizeCharacter.x* 60 ,prizeCharacter.y* 60,60,60);

  context.drawImage(prizeCharacter.x,prizeCharacter.y,canvas.width/10,canvas.height/10);
  context.rect(prizeCharacter.x * 60 + 30, prizeCharacter.y * 60 + 30,20,20);
  
  context.fillStyle = "blue";
  context.fill();

  context.beginPath();
  context.rect(prizeCharacter.x * 60 + 30, prizeCharacter.y * 60 + 30,20,20);
  context.fillStyle = "blue";
  context.fill();


  if(prizeCharacter.x == shape.i && prizeCharacter.y == shape.j){
    score += 50;
    prizeIsAlive = false;
  }
}

//updates pacman position on the board.
function UpdatePosition() {
  // updateMonsters()
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
    isEating = true;
    score++;
  }

  else if(isEating)
  {
    isEating = false;
  }

  board[shape.i][shape.j] = 2;
  var currentTime = new Date();
  time_elapsed = (currentTime - start_time) / 1000;
  if (score >= 20 && time_elapsed <= 10) {
    pac_color = "green";
  }
  if (score >= 90 - (10 * (5 - livesCounter))) {
    Draw();
    window.alert("Game completed");
    window.clearInterval(interval);
    window.clearInterval(monstersInterval);
    stopGroundAudio();
  } else {
    Draw();
  }
  if (time_elapsed >= 90){
    window.alert("You Lost!!!\n You exceeded time limit");
    window.clearInterval(interval);
    window.clearInterval(monstersInterval);
    stopGroundAudio();
  }
}

//GUY -------> i think we need to replace onclick="loginUser()" with addEvent Listener (ronit)
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

  $(".signup").filter(function () {
    return $.trim($(this).val()).length == 0;
  }).length == 0
    ? numOfValidations--
    : null;

  passwordValidation.test(password) ? numOfValidations-- : null;
  emailValidation.test(email) ? numOfValidations-- : null;
  password === repeatPassWord ? numOfValidations-- : null;

  const numberInName = names.filter((item) => nameValidation.test(item));
  numberInName.length == 0 ? numOfValidations-- : null;

  if (numOfValidations != 0) {
    alert("form is not defined well.");
  } else {
    location.href = "#welcome";
    usersMap[userName] = password;
  }
}

function loginUser(e) {
  e.preventDefault();
  let loginUserName = $("#loginUserName").val();
  let loginPassword = $("#loginPassword").val();

  if (isLoggedIn == true) {
    alert("A user is already logged in.");
  } else if (
    loginUserName in usersMap &&
    usersMap[loginUserName] == loginPassword
  ) {
    UserName = loginUserName;
    isLoggedIn = true;

    $("a[href='#game']").click();
    // handlePages("game","login");   

  } else {
    alert("Details are wrong. Try again or register.");
  }
}