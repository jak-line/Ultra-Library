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
 createGame("Super Mario Bros 2", "nes", "mario2"),
 createGame("Super Mario Bros 3", "nes", "mario3"),
 createGame("Super Mario World", "snes", "marioworld"),
 createGame("Mario 64", "n64", "mario64"),
 createGame("Pokemon Red", "gb", "pokemonred"),
 createGame("Kirby's Dream Course", "snes", "kirbydc"),
 createGame("Kirby: Nightmare in Dream Land", "gba", "kirbynidl"),
 createGame("Donkey Kong Country", "snes", "dkcountry"),
 createGame("The New Tetris", "n64", "tntetris"),
 createGame("Super Bomberman 2", "snes", "sbomber2"),
 createGame("Super Bomberman 4", "snes", "sbomber4"),
 createGame("Super Bomberman 5", "snes", "sbomber5")
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

const changelog = [
 {
  version: "Beta v0.3",
  date: "26/03/2026",
  added: ["Super Mario Bros 2", "Super Mario Bros 3", "Super Mario World", "Super Bomberman 2", "Super Bomberman 4", "Super Bomberman 5", "Kirby Nightmare in Dream Land"],
  changes: [
   "Sistema de filtros adicionado",
   "Changelogs adicionado"
  ]
 }
];

function renderChangelog(){

 const container = document.getElementById("changelog");

 changelog.forEach(log => {

  const div = document.createElement("div");
  div.className = "log";

  div.innerHTML = `
   <h3>${log.version}</h3>
   <span class="date">${log.date}</span>

   <p>🎮 Novos jogos:</p>
   <ul>${log.added.map(g => `<li>${g}</li>`).join("")}</ul>

   <p>⚙️ Mudanças:</p>
   <ul>${log.changes.map(c => `<li>${c}</li>`).join("")}</ul>
  `;

  container.appendChild(div);

 });

}

const changelogBtn = document.getElementById("changelog-btn");
const changelogBox = document.getElementById("changelog");

changelogBtn.onclick = () => {
 changelogBox.classList.toggle("open");

 if(changelogBox.classList.contains("open")){
  document.getElementById("dim").style.opacity = "1";
 } else {
  document.getElementById("dim").style.opacity = "0";
 }
};

// render no container certo
function renderChangelog(){

 const container = document.getElementById("changelog-content");
 container.innerHTML = "";

 changelog.forEach(log => {

  const div = document.createElement("div");
  div.className = "log";

  div.innerHTML = `
   <h3>${log.version}</h3>
   <span class="date">${log.date}</span>

   <p class="section-title">🎮 Novos jogos</p>
   <ul>${log.added.map(g => `<li>${g}</li>`).join("")}</ul>

   <p class="section-title">⚙️ Mudanças</p>
   <ul>${log.changes.map(c => `<li>${c}</li>`).join("")}</ul>
  `;

  container.appendChild(div);

 });
}

renderChangelog();