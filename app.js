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
var eyeY = -7;
var usersMap = { k: "k" };
var isLoggedIn = false;
var prizeIsAlive = true;
var isEating = false;
var UserName = "";
var arrowFunc = null;
var medicine = {x:0, y:0};
var clock = {x:0, y:0};
var skilt = {x:0, y:0};
var isMedicineAlive = true;
var isClockAlive = true;
var isSkiltAlive = true;
var isSkiltCell = true;
var pressDownArrow = function() { changeArrow('down'); };
var pressUpArrow = function() { changeArrow('up'); };
var pressRightArrow = function() { changeArrow('right'); };
var pressLeftArrow = function() { changeArrow('left'); };
var keys = {left:37, up:38, right:39, down:40};
var food_remain;
var food_remain_settings = 70; //defualt
var numberOfElementsEaten;
var totalFood;
var isDrawGel = true;
var totalGameTime = 90 //default
var ballColor1;
var ballColor2;
var ballColor3;


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

  $(".pages:visible").slideUp(function () {
    if(page == "about"){
      aboutClick = true;
    };
    $("#" + page).slideDown();
  });

  switch (page) {
    case "game":
      handleGamePage()
      break;
    case "welcome":
      handleWelcomePage();
      break;
    case "signUp":
      handleSignUpPage();
      playMenuMusic();
      break;
    case "login":
      handleLoginPage();
      playMenuMusic();
      break;
    case "settings":
      handleSettingsPage();
      break;
    case "about":
      aboutClick = false;
      handleAboutPage();
      break;
  }
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
      document.getElementById("welcome-reg").removeEventListener("click", signUpButton);
      document.getElementById("welcome-log").removeEventListener("click", loginButton);
      break;
    case "signUp":
      document.getElementById("signupSubmit").removeEventListener("click", validateSignUp);
      break;
    case "login":
      document.getElementById("loginSubmit").removeEventListener("click", loginUser);
      break;
    case "settings":
      document.getElementById("up-arrow").removeEventListener("click", pressUpArrow, false);
      document.getElementById("down-arrow").removeEventListener("click", pressDownArrow, false);
      document.getElementById("left-arrow").removeEventListener("click", pressLeftArrow, false);
      document.getElementById("right-arrow").removeEventListener("click", pressRightArrow, false);
      break;
    case "about":
      break;
    case "game":
      resetGame();
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
  document.getElementById("signupSubmit").addEventListener("click", validateSignUp);
}

function handleLoginPage() {
  document.getElementById("loginSubmit").addEventListener("click", loginUser);
}

function handleSettingsPage() {
  document.getElementById("up-arrow").addEventListener("click", pressUpArrow, false);
  document.getElementById("down-arrow").addEventListener("click", pressDownArrow, false);
  document.getElementById("left-arrow").addEventListener("click", pressLeftArrow, false);
  document.getElementById("right-arrow").addEventListener("click", pressRightArrow, false);

  let slider = document.getElementById("myRange");
  let output = document.getElementById("demo");
  output.innerHTML = slider.value;
  food_remain_settings = parseInt(slider.value);

  slider.oninput = function() {
    output.innerHTML = this.value;
    food_remain_settings = parseInt(slider.value);
  }
}

function handleAboutPage() {
  alert(" about page ");
}

function handleGamePage() {
  // alert(" about page ");
  isLoggedIn ? Start() : null;
  isLoggedIn ? playBackGroundAudio() : null;

  document
  .getElementById("new-game")
  .addEventListener("click", () => {$("a[href='#settings']").click()});
}

function changeArrow(arrow) {

  arrowFunc = function(event) {
    event.preventDefault();
    
    if (!checkIfKeyExist(event.keyCode)) {
      switch (event.keyCode) {
        case 37:
          key = "←";
          break;
        case 38:
          key = "↑";;
          break;
        case 39:
          key = "→";
          break;
        case 40:
          key = "↓";
          break;
        default:
          key = String.fromCharCode(event.keyCode);
      }

      keys[arrow] = event.keyCode;
      changeKeyCode(arrow ,key);
    }
    else {
      removeEventListener("keydown", arrowFunc, true);
    }
  }

  addEventListener("keydown", arrowFunc, true);
}

function checkIfKeyExist(keyCode) {
  let result = false;
  for (let [key, value] of Object.entries(keys)) {
    if (keyCode == value) {
      result = true;
    }
  }
  return result;
}

function changeKeyCode(arrow ,key) {
  
  switch (arrow) {
    case "up":
      document.getElementById("kbd-up").innerHTML = key;
      break;
    case "down":
      document.getElementById("kbd-down").innerHTML = key;
      break;
    case "left":
      document.getElementById("kbd-left").innerHTML = key;
      break;
    case "right":
      document.getElementById("kbd-right").innerHTML = key;
      break;
  }
  removeEventListener("keydown", arrowFunc, true);
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

  ballColor1 = $("#favcolor1").val();
  ballColor2 = $("#favcolor2").val();
  ballColor3 = $("#favcolor3").val();
  board = new Array();
  score = 0;
  pac_color = "yellow";
  var cnt = 100;
  totalFood = food_remain;
  // food_remain = 50;
  food_remain = food_remain_settings;
  numberOfElementsEaten = food_remain_settings + 1;
  var pacman_remain = 1;
  start_time = new Date();

  for (var i = 0; i < 10; i++) {
    board[i] = new Array();
    //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
    for (var j = 0; j < 10; j++) {
      if ( (i == 3 && j == 3) || (i == 3 && j == 4) || (i == 3 && j == 5) ||
           (i == 6 && j == 1) || (i == 6 && j == 2)) {
              board[i][j] = 4;
      }
      else {
        var randomNum = Math.random();
        if (randomNum <= (1.0 * food_remain) / cnt) {
          food_remain--;
          board[i][j] = 1;
        }
        else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
          shape.i = i;
          shape.j = j;
          pacman_remain--;
          board[i][j] = 2;
        }
        else {
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

  addEventListener("keydown",function (e) {
      keysDown[e.keyCode] = true;
    },false
  );

  addEventListener("keyup",function (e) {
      keysDown[e.keyCode] = false;
    },false
  );

  initMonsters();
  initMedicineAndClock();

  x = location.href
  console.log(x);
  
  interval = setInterval(UpdatePosition,250);
  setTimeout(() => {
    if(page == "game") {
      monstersInterval = setInterval(updateMonsters, 500);
    }
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
  if (keysDown[keys["up"]]) {
    return 1;
  }
  if (keysDown[keys["down"]]) {
    return 2;
  }
  if (keysDown[keys["left"]]) {
    return 3;
  }
  if (keysDown[keys["right"]]) {
    return 4;
  }
}

function initMedicineAndClock(){
  let medicineCell = findRandomEmptyCell(board);
  board[medicineCell[0]][medicineCell[1]] = 9;
  medicine.x = medicineCell[0];
  medicine.y = medicineCell[1];

  let clockCell = findRandomEmptyCell(board);
  board[clockCell[0]][clockCell[1]] = 9;
  clock.x = clockCell[0];
  clock.y = clockCell[1];

  isMedicineAlive = true;
  isClockAlive = true;
}

function Draw() {
  canvas.width = canvas.width; //clean board
  lblScore.value = score;
  lblTime.value = totalGameTime - Math.floor(time_elapsed);
  lblLife.value = livesCounter;
  lblName.value = UserName;
  
  // let gel_25 = 0.1 * totalFood;
  // let gel_15 = 0.3 * totalFood;
  // let gel_5 = 0.6 * totalFood;
  let gels = [0.6 * totalFood, 0.3 * totalFood, 0.1 * totalFood]

  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      var center = new Object();
      center.x = i * 60 + 30;
      center.y = j * 60 + 30;
      if (board[i][j] == 2) {
        context.beginPath();
        context.arc(
          center.x,
          center.y + 7,
          22,
          0.15 * Math.PI + startAngle,
          1.85 * Math.PI + endAngle
        ); // half circle
        context.lineTo(center.x, center.y + 7);
        context.fillStyle = pac_color; //color
        context.fill();
        context.beginPath();
        context.arc(center.x + eyeX, center.y + eyeY, 3, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color
        context.fill();
      } else if (board[i][j] == 1 ) {
        
        if(gels != []){

          let gelIndex = Math.floor(Math.random() * gels.length);
          gelIndex == 0 ? board[i][j] = 5 : null;
          gelIndex == 1 ? board[i][j] = 15 : null;
          gelIndex == 2 ? board[i][j] = 25 : null;
          
          gels[gelIndex]--;
          if(gels[gelIndex] == 0){
            gels.splice(gelIndex, 1);
          }
        }
      } 
      else if (board[i][j] == 5) {
        drawGel(center, "5", ballColor1)
      }else if (board[i][j] == 15) {
        drawGel(center, "15", ballColor2)
      }else if (board[i][j] == 25) {
        drawGel(center, "25", ballColor3)
      }
      
      else if (board[i][j] == 4) {
        context.beginPath();
        let imageObj = new Image();
        imageObj.src ="photos\\wall.png";
        context.drawImage(imageObj, center.x - 27, center.y - 20, 60, 60);
      }
    }
  }

  prizeIsAlive ? drawPrizeCharacter() : null;
  isMedicineAlive ? drawMedicine() : null;
  isClockAlive ? drawClock() : null;
  isEating ? playEatAudio() : StopEatAudio();
  drawMonsters();
  isDrawGel = false;

  let skiltTime = (time_elapsed % 10) - 7;
  // (skiltTime > 0 && isSkiltAlive) ? drawSkilt() : (function() {isSkiltCell = true; isSkiltAlive = true})

  if(skiltTime > 0 && isSkiltAlive){
    drawSkilt()
  }else{
    isSkiltCell = true; 
    isSkiltAlive = true;
  }
}

function drawGel(center, text, color){
  // context.beginPath();
  // let imageObj = new Image();
  // imageObj.src ="photos\\" + gel + ".png";
  // context.drawImage(imageObj,center.x - 30, center.y - 20, 60, 50);
  context.beginPath();
  context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
  context.fillStyle = color; //color
  context.fill();

  context.font = '8pt Calibri';
  context.fillStyle = 'white';
  context.textAlign = 'center';
  context.fillText(text, center.x, center.y+3);

}

function drawMedicine(){
  context.beginPath();
  let imageObj = new Image();
  imageObj.src ="photos\\medicine.png";
  context.drawImage(imageObj, medicine.x * 60 + 5, medicine.y * 60 + 17, 45, 45);

  if(medicine.x == shape.i && medicine.y == shape.j){
    livesCounter += 2;
    isMedicineAlive = false;
  }
}

function drawClock(){
  context.beginPath();
  let imageObj = new Image();
  imageObj.src ="photos\\clock.png";
  context.drawImage(imageObj, clock.x * 60, clock.y * 60, 45, 45);

  if(clock.x == shape.i && clock.y == shape.j){
    isClockAlive = false;
  }
}

function drawSkilt(){

  if(isSkiltCell){
    isSkiltCell = false
    let cell = findRandomEmptyCell(board);
    skilt.x = cell[0];
    skilt.y = cell[1];
  }

  context.beginPath();
  let imageObj = new Image();
  imageObj.src ="photos\\skilts.png";
  context.drawImage(imageObj, skilt.x * 60 + 5, skilt.y * 60 + 10, 45, 45);

  if(skilt.x == shape.i && skilt.y == shape.j){
    score += 10;
    isSkiltAlive = false;
  }
}

function drawMonsters(){
  let names = Object.keys(monstersPositions);
  for (var i = 0; i < numOfMonsters; i++) {

  context.beginPath();
  let imageObj = new Image();
  imageObj.src ="photos\\" + names[i] + ".png";
  context.drawImage(imageObj, monstersPositions[monstersNames[i]].x * 60 - 10, monstersPositions[monstersNames[i]].y * 60, 80, 80);

    //Game Over!
    if(monstersPositions[monstersNames[i]].x == shape.i && monstersPositions[monstersNames[i]].y == shape.j){
      
      //2 monsters have super strength (bonus stage).
      if(i == 0){//monster1
        livesCounter--;
        score -= 20;
      }
      else if(i == 2) {//monster3
        livesCounter -= 2;
        score -= 30;
       }
      else{
        livesCounter--;
        score -= 10;
      }
      
      if(livesCounter <= 0){
        timeOutAlert("Loser!");
        resetGame()
        break;
      }
      else{
        resetPositions()
      }
    }
  }
}

//draws the prize. 50 points are added.
function drawPrizeCharacter(){

  context.beginPath();
  let imageObj = new Image();
  imageObj.src = "photos\\vaccine.png";
  context.drawImage(imageObj, prizeCharacter.x * 60 - 7, prizeCharacter.y * 60, 60, 60);

  if(prizeCharacter.x == shape.i && prizeCharacter.y == shape.j){
    score += 50;
    numberOfElementsEaten--;
    prizeIsAlive = false;
  }
}

//Use this message if you need to pop up an alert
function timeOutAlert(message){
  setTimeout(function(){
    alert(message)
  }, 10);        
}

// after getting hit by a monster, all monsters go back to the corners.
function resetPositions(){
  let pacmanCell = findRandomEmptyCell(board)
  board[shape.i][shape.j] = 0;
  shape.i = pacmanCell[0];
  shape.j = pacmanCell[1];

  if (monstersInterval != null) {
    clearInterval(monstersInterval);
    monstersInterval = null;
  }

  initMonsters();
  
  setTimeout(() => {
    if(page == "game") {
      monstersInterval = setInterval(updateMonsters, 500);
    } 
  },3000);
}

//when game is stopped a reset is made to few fields
function resetGame(){
  livesCounter = 5;
  prizeIsAlive = true;
  isEating = false;

  if (interval != null) {
    clearInterval(interval);
    interval = null;
  }
  if (monstersInterval != null) {
    clearInterval(monstersInterval);
    monstersInterval = null;
  }
  stopGroundAudio();
  numberOfElementsEaten = food_remain_settings + 1;
  isSkiltCell = true;
  isSkiltAlive = true;

  lblLife.value = 0;
  lblName.value = "";
  stopGroundAudio();
}

//updates pacman position on the board.
function UpdatePosition() {
  board[shape.i][shape.j] = 0;
  var x = GetKeyPressed();
  if (x == 1) {
    if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {//up
      shape.j--;
      startAngle = -Math.PI / 2;
      endAngle = -Math.PI / 2;
      eyeX = 13;
      eyeY = -2;
    }
  }
  if (x == 2) {
    if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {//down
      shape.j++;
      startAngle = Math.PI / 2;
      endAngle = Math.PI / 2;
      eyeX = -13;
      eyeY = 7;
    }
  }
  if (x == 3) {
    if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {//left
      shape.i--;
      startAngle = Math.PI;
      endAngle = Math.PI;
      eyeX = -5;
      eyeY = -7;
    }
  }
  if (x == 4) {
    if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {//right
      shape.i++;
      startAngle = 0;
      endAngle = 0;
      eyeX = 5;
      eyeY = -7;
    }
  }
  if (board[shape.i][shape.j] == 5) {
    isEating = true;
    score += 5;
    numberOfElementsEaten--;
  }
  else if (board[shape.i][shape.j] == 15) {
    isEating = true;
    score += 15;
    numberOfElementsEaten--;
  }
  else if (board[shape.i][shape.j] == 25) {
    isEating = true;
    score += 25;
    numberOfElementsEaten--;
  }

  else
  {
    isEating = false;
  }

  board[shape.i][shape.j] = 2;
  var currentTime = new Date();
  time_elapsed = (currentTime - start_time) / 1000;
  isClockAlive ? null  : (time_elapsed -= 15)

  if (score >= 220 && time_elapsed <= 10) {
    pac_color = "green";
  }

  Draw()

  if(numberOfElementsEaten == 0){
    (score >= 100) ? timeOutAlert("Winner!") :  timeOutAlert("You are better than " + score + " points.");
    resetGame()
  }

  if (time_elapsed >= 120){
    (score >= 100) ? timeOutAlert("Winner!") :  timeOutAlert("You are better than " + score + " points.");
    $("#canvas").hide();
    lblScore.value = 0;
    lblTime.value = 0;
    document
    .getElementById("new-game")
    .removeEventListener("click", () => {$("a[href='#settings']").click()});
    resetGame()
  }
}

function validateSignUp(e) {
  e.preventDefault();

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