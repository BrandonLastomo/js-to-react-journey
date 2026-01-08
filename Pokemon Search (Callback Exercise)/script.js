// fetch using then
function getData(name) {
  const url = "https://pokeapi.co/api/v2/pokemon/" + name;
  const data = fetch(url).then((response) => response.json());
  return data;
}

// fetch using async await
// async function getData(name) {
//   const url = "https://pokeapi.co/api/v2/pokemon/" + name;
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     throw error;
//   }
// }

function renderCard(data) {
  cardContainer.innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src="${data.sprites.front_default}" class="card-img-top" alt="${data.name}">
        <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text">Types: ${data.types[0].type.name}</p>
            <p class="card-text">Moves: ${data.moves[0].move.name}</p>
        </div>
    </div>
  `;
}

const searchInput = document.getElementById("search-input");
const searchPokemon = document.getElementById("search-pokemon");
const cardContainer = document.getElementById("card-container");

// search btn with then
searchPokemon.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = searchInput.value;
  const data = getData(name).then((data) => renderCard(data));
});

// search btn with async await
// searchPokemon.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const data = await getData(searchInput.value);
//   renderCard(data);
// });
