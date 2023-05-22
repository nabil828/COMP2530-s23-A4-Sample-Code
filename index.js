function setupGrid() {
// Example usage: Constructing an array of card data with Pokémon URLs
constructCardData(6)
  .then((cardData) => {
    console.log(cardData);
  })
  .catch((error) => {
    console.log(error);
  });
  var cardData = [
    { id: 'img1', frontFace: '001.png' },
    { id: 'img2', frontFace: '002.png' },
    { id: 'img3', frontFace: '003.png' },
    { id: 'img4', frontFace: '001.png' },
    { id: 'img5', frontFace: '002.png' },
    { id: 'img6', frontFace: '003.png' }
  ];

  // var gameGrid = $('#game_grid');

  // for (var i = 0; i < cardData.length; i++) {
  //   var card = $('<div>').addClass('card');
  //   var frontFace = $('<img>').attr('id', cardData[i].id).addClass('front_face').attr('src', cardData[i].frontFace).attr('alt', '');
  //   var backFace = $('<img>').addClass('back_face').attr('src', 'back.webp').attr('alt', '');

  //   card.append(frontFace);
  //   card.append(backFace);
  //   gameGrid.append(card);
  // }
}

const fetchPokemonInfo = async (numberOfPokemon) => {
  const pokemonArray = [];
  const startTime = new Date();

  const getRandomNumber = () => Math.floor(Math.random() * 1000) + 1;

  // Create an array of promises for fetching each Pokemon
  const fetchPromises = Array.from({ length: numberOfPokemon }, () =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomNumber()}`)
      .then((response) => response.json())
      .then((data) => pokemonArray.push(data.sprites.other["official-artwork"].front_default))
  );

  // Wait for all promises to resolve
  await Promise.all(fetchPromises);

  const endTime = new Date();
  const totalTime = endTime - startTime;

  console.log(`Fetched ${numberOfPokemon} Pokémon in ${totalTime} milliseconds.`);

  return pokemonArray;
};

// Function to construct an array of card data with Pokémon URLs
const constructCardData = async (numberOfCards) => {
  const pokemonUrls = await fetchPokemonInfo(numberOfCards / 2);

  const cardData = [];
  for (let i = 0; i < numberOfCards; i += 2) {
    const id = `img${i + 1}`;
    const frontFace = pokemonUrls[i / 2];

    cardData.push({ id, frontFace }, { id: `img${i + 2}`, frontFace });
  }

  return cardData;
};

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