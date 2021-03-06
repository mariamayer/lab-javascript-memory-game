// //******************************************************************
// // Helper Functions
// //******************************************************************
var flipBack = function(item){
  $('#'+item+' .front').fadeOut(300);
};

var updateHtml = function(node,value){
  $(node).html(value);
};
var displayRed = function(){
  $("#score").addClass("red");
  setTimeout(function(){
    $("#score").removeClass("red");
  }, 500);
};

// //******************************************************************
// // Game Logic
// //******************************************************************
var MemoryGame = function() {
  this.cards = [
  		{ name: "aquaman",         img: "aquaman.jpg" },
  		{ name: "batman",          img: "batman.jpg" },
  		{ name: "captain america", img: "captain-america.jpg" },
  		{ name: "fantastic four",  img: "fantastic-four.jpg" },
  		{ name: "flash",           img: "flash.jpg" },
      { name: "green arrow",     img: "green-arrow.jpg" },
  		{ name: "green lantern",   img: "green-lantern.jpg" },
  		{ name: "ironman",         img: "ironman.jpg" },
  		{ name: "spiderman",       img: "spiderman.jpg" },
  		{ name: "superman",        img: "superman.jpg" },
  		{ name: "the avengers",    img: "the-avengers.jpg" },
  		{ name: "thor",            img: "thor.jpg" },
      { name: "aquaman",         img: "aquaman.jpg" },
  		{ name: "batman",          img: "batman.jpg" },
  		{ name: "captain america", img: "captain-america.jpg" },
      { name: "fantastic four",  img: "fantastic-four.jpg" },
  		{ name: "flash",           img: "flash.jpg" },
  		{ name: "green arrow",     img: "green-arrow.jpg" },
  		{ name: "green lantern",   img: "green-lantern.jpg" },
  		{ name: "ironman",         img: "ironman.jpg" },
  		{ name: "spiderman",       img: "spiderman.jpg" },
  		{ name: "superman",        img: "superman.jpg" },
  		{ name: "the avengers",    img: "the-avengers.jpg" },
  		{ name: "thor",            img: "thor.jpg" },
  	];
    this.selectedCards = [];
    this.pairsClicked = 0;
    this.correctPairs = 0;
};

MemoryGame.prototype._shuffleCards = function(array) {
  for(var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
  return array;
};

MemoryGame.prototype.selectCard = function(card){
  this.selectedCards.push(card);

  if(this.selectedCards.length==2){

    this.pairsClicked+=1;
    updateHtml('#pairs_clicked',this.pairsClicked);

    if(this.selectedCards[0]==card){

      this.correctPairs += 1;
      updateHtml('#pairs_guessed',this.correctPairs);
      this.selectedCards = [];

    }else{

      var prev=this.selectedCards[0];
      var current=card;

      setTimeout(function(){
        flipBack(prev);
      }, 600);

      setTimeout(function(){
        flipBack(current);
      }, 550);

      //Wrong answer
      displayRed();
      this.selectedCards = [];

    }
  }
};

// //******************************************************************
// // HTML/CSS Interactions
// //******************************************************************

var memoryGame;

$(document).ready(function(){
  memoryGame = new MemoryGame();
  var html = '';

  memoryGame._shuffleCards(memoryGame.cards);

  memoryGame.cards.forEach(function(pic, index) {
    var sanitizedName = pic.name.split(' ').join('_');

    html += '<div class= "card" id="card_' + sanitizedName + '">';
    html += '<div class="back"';
    html += '    name="img/' + pic.name + '"';
    html += '    id="'       + pic.img +  '">';
    html += '<div class="front" ';
    html += 'style="background: url(img/' + pic.img + ') no-repeat"';
    html += '    id="'       + pic.img +  '">';
    html += '</div>';
    html += '</div>';
    html += '</div>';
  });

  // Add all the divs to the HTML
  document.getElementById('memory_board').innerHTML = html;

  var totalPairs=13;
  $('.back').on('click', function(){
    var card=$(this).parent().attr('id');
    memoryGame.selectCard(card);
    $(this).find('div').show();

    //Finished
    if(memoryGame.correctPairs==totalPairs){
      swal({
        title: 'You win!',
        text: "Want to give it another try?",
        type: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: "Nah, I'm good.",
        confirmButtonText: 'Yes!'
      }).then(function () {
        location.reload();
      });
    }
  });
});
