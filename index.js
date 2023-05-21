function setupGrid() {
  var cardData = [
    { id: 'img1', frontFace: '001.png' },
    { id: 'img2', frontFace: '002.png' },
    { id: 'img3', frontFace: '003.png' },
    { id: 'img4', frontFace: '001.png' },
    { id: 'img5', frontFace: '002.png' },
    { id: 'img6', frontFace: '003.png' }
  ];

  var gameGrid = $('#game_grid');

  for (var i = 0; i < cardData.length; i++) {
    var card = $('<div>').addClass('card');
    var frontFace = $('<img>').attr('id', cardData[i].id).addClass('front_face').attr('src', cardData[i].frontFace).attr('alt', '');
    var backFace = $('<img>').addClass('back_face').attr('src', 'back.webp').attr('alt', '');

    card.append(frontFace);
    card.append(backFace);
    gameGrid.append(card);
  }
}

const setup = () => {
  setupGrid();
  let firstCard = undefined
  let secondCard = undefined
  $(".card").on(("click"), function () {
    $(this).toggleClass("flip");

    if (!firstCard)
      firstCard = $(this).find(".front_face")[0]
    else {
      secondCard = $(this).find(".front_face")[0]
      console.log(firstCard, secondCard);
      if (
        firstCard.src
        ==
        secondCard.src
      ) {
        console.log("match")
        $(`#${firstCard.id}`).parent().off("click")
        $(`#${secondCard.id}`).parent().off("click")
      } else {
        console.log("no match")
        setTimeout(() => {
          $(`#${firstCard.id}`).parent().toggleClass("flip")
          $(`#${secondCard.id}`).parent().toggleClass("flip")
        }, 1000)
      }
    }
  });
}

$(document).ready(setup)