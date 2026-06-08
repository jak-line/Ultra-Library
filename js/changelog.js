const changelog = [
{
  version: "ULTRA Release v2.0.0",
  date: "08/06/2026",

  features: [
    "Sistema de contas",
    "Sistema de avatar personalizado",
    "Sistema de favoritos",
    "Sistema de histórico",
    "Sistema de tempo jogado",
    "Leaderboard global",
    "Continue Jogando",
    "Sistema de temas",
    "Suporte a Firebase"
  ],

  themes: [
    "Tema Dark",
    "Tema Blocks",
    "Tema Dreamcore"
  ],

  musics: [
    "Forest Maze",
    "Aquatic Ambiance",
    "Corridors of Time",
    "Dire, Dire Docks",
    "File Select",
    "Forest Interlude",
    "Ice Cap Zone",
    "Stickerbush Symphony",
    "Wii Shop"
  ],

  consoles: [
    "Game Boy Color",
    "Neo Geo Arcade"
  ],

  games: [
    "Mario Kart: Super Circuit",
    "Mario Party",
    "Mario Party 2",

    "Donkey Kong",
    "Donkey Kong Jr.",
    "Donkey Kong 3",

    "Pac-Man Collection",
    "Pac-Man 2: The New Adventures",

    "Chrono Trigger",

    "Pokémon Blue",
    "Pokémon Yellow",
    "Pokémon Gold",
    "Pokémon Silver",
    "Pokémon Crystal",
    "Pokémon Ruby",
    "Pokémon Sapphire",
    "Pokémon Emerald",
    "Pokémon FireRed",
    "Pokémon LeafGreen",

    "Metal Slug",
    "Metal Slug X",
    "Metal Slug 3",
    "Metal Slug 4",
    "Metal Slug 5",

    "The King of Fighters '98",
    "Shock Troopers",

    "Final Fight",
    "Final Fight 2",
    "Final Fight 3",
    "Streets of Rage 2",
    "Captain Commando",
    "TMNT: Turtles in Time",
    "Joe & Mac",
    "Joe & Mac 2",
    "Sunset Riders",

    "Contra III",
    "The Lion King",
    "Lost Vikings",
    "Pocky & Rocky",
    "Animaniacs",

    "Golden Axe",
    "Golden Axe 2",
    "Altered Beast",
    "Gunstar Heroes",
    "Shadow Dancer: The Secret of Shinobi",
    "The Firemen",

    "Super Smash Bros",

    "International Superstar Soccer Deluxe",
    "NBA Jam",

    "Super Off Road",
    "Top Gear",
    "Rock 'n Roll Racing",
    "Micro Machines",

    "Goof Troop",
    "Puyo Puyo Tsuu",

    "Hollow Knight",
    "Hollow Knight: Silksong",

    "Tony Hawk's Pro Skater 2"
  ],

  changes: [
    "Biblioteca completamente reformulada",
    "Código modularizado em múltiplos arquivos CSS e JavaScript",
    "Sistema de ROMs reorganizado por plataforma",
    "Novo layout da interface",
    "Nova barra superior de navegação",
    "Novo sistema de filtros",
    "Novo sistema de perfil",
    "Novo sistema de login persistente",
    "Novo sistema de armazenamento em nuvem",
    "Exibição do tempo jogado em cada jogo",
    "Renderização da biblioteca otimizada",
    "Navegação por controle adicionada",
    "Animações e transições melhoradas",
    "Estrutura preparada para futuras expansões",
    "Diversas correções de bugs e otimizações gerais"
  ]
}
];

function renderChangelog() {
  const container = document.getElementById("changelog-content");
  container.innerHTML = "";

  changelog.forEach(log => {
    const div = document.createElement("div");
    div.className = "log";

    const totalFeatures = log.features.length;
    const totalThemes = log.themes.length;
    const totalMusics = log.musics.length;
    const totalConsoles = log.consoles.length;
    const totalGames = log.games.length;

    div.innerHTML = `
      <h3>${log.version}</h3>
      <span class="date">${log.date}</span>

      <p class="release-summary">
        A maior atualização da Ultra Library até agora.
        ${totalGames} jogos, ${totalConsoles} plataformas,
        ${totalFeatures} recursos, ${totalThemes} temas
        e ${totalMusics} músicas adicionadas.
      </p>

      <p class="section-title">✨ Novos Recursos</p>
      <ul>${log.features.map(i => `<li>${i}</li>`).join("")}</ul>

      <p class="section-title">🎨 Temas</p>
      <ul>${log.themes.map(i => `<li>${i}</li>`).join("")}</ul>

      <p class="section-title">🎵 Músicas</p>
      <ul>${log.musics.map(i => `<li>${i}</li>`).join("")}</ul>

      <p class="section-title">🕹️ Consoles</p>
      <ul>${log.consoles.map(i => `<li>${i}</li>`).join("")}</ul>

      <p class="section-title">🎮 Novos Jogos</p>
      <ul>${log.games.map(i => `<li>${i}</li>`).join("")}</ul>

      <p class="section-title">⚙️ Mudanças</p>
      <ul>${log.changes.map(i => `<li>${i}</li>`).join("")}</ul>
    `;

    container.appendChild(div);
  });
}

renderChangelog();