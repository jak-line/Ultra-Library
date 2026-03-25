let currentFilter = "all";

function createGame(title, core, romKey){
 return {
  title: title,
  core: core,
  rom: ROMS[romKey] || null,
  cover: "covers/" + romKey + ".png"
 };
}

// ADD GAMES HERE ---------------------------------------------------

const games = [
 createGame("Super Mario Bros", "nes", "mario1"),
 createGame("Pokemon Red", "gb", "pokemonred"),
 createGame("Kirby's Dream Course", "snes", "kirbydc"),
 createGame("Donkey Kong Country", "snes", "dkcountry"),
 createGame("Mario 64", "n64", "mario64"),
 createGame("The New Tetris", "n64", "tntetris")
];

// FILTER

function setFilter(filter, el){
 currentFilter = filter;

 document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.classList.remove("active");
 });

 el.classList.add("active");

 renderGames();
}

// OTHERS -----------------------------------------------------------

const library = document.getElementById("library");

function renderGames(){

 library.innerHTML = "";

 games.forEach(game => {

  if(currentFilter !== "all" && game.core !== currentFilter){
   return;
  }

  const div = document.createElement("div");
  div.className = "game";

  div.onclick = () => {
   if(!game.rom) return;
   startGame(game.core, game.rom);
  };

  div.innerHTML = `
  <img src="${game.cover}">
  <p>${game.title}</p>
  `;

  library.appendChild(div);

 });

}

window.addEventListener("load", () => {

 setTimeout(() => {
  document.body.classList.remove("startup");
 }, 900);

 setTimeout(() => {
  document.getElementById("fade").style.display = "none";
 }, 500);

});

renderGames();