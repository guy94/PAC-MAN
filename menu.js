var tabs = $(".tabs");
var selector = $(".tabs").find("a").length;
var slideIndex = 1;
var activeItem = tabs.find(".active");
var activeWidth = activeItem.innerWidth();
var aboutClick = false;

$(".selector").css({
  left: activeItem.position.left + "px",
  width: activeWidth + "px",
});

$(".tabs").on("click", "a", function (e) {
  e.preventDefault();
  $(".tabs a").removeClass("active");
  $(this).addClass("active");
  var activeWidth = $(this).innerWidth();
  var itemPos = $(this).position();
  $(".selector").css({
    left: itemPos.left + "px",
    width: activeWidth + "px",
  });
});

$(function() {
  $( "#dialog-2" ).dialog({
     autoOpen: false, 
     buttons: {
        Esc: function() {$(this).dialog("close");}
     },
     hide: { effect: "explode", duration: 1000 },
     title: "Submitters",
     position: {
        my: "center",
        at: "center"
     },
  });
  $( "#aboutbuttom" ).click(function() {
     $( "#dialog-2" ).dialog( "open" );
     window.addEventListener("click", function(event) {
      if(event.target != $("#dialog-2") && aboutClick){
        $("#dialog-2").dialog("close");
    }
       for(var item of $("#dialog-2").children()){
          if(event.target != item && aboutClick){
              $("#dialog-2").dialog("close");
          }
      }
     })
  });

});

showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

var background = document.getElementById("backGroundGame");
var eat = document.getElementById("Eating");

function playBackGroundAudio() {
  background.volume = 0;

  background.play();
}

function stopGroundAudio() {
  background.pause();
}

function playEatAudio() {
  eat.volume = 0;

  eat.play();
}
function StopEatAudio() {
  eat.pause();
}