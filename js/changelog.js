const changelog = [
  {
    version: "ULTRA Release v1.0",
    date: "01/04/2026",
    added: [
      "Yoshi's Island",
      "Super Mario RPG",
      "Super Mario Kart",
      "Mario Kart 64",

      "Zelda: A Link to the Past",
      "Zelda: Ocarina of Time",
      "Zelda: Majora's Mask",

      "Super Metroid",
      "Metroid Fusion",
      "Metroid Zero Mission",

      "Donkey Kong Country 2",
      "Donkey Kong Country 3",

      "Mega Man 2",
      "Mega Man 3",
      "Mega Man X",
      "Mega Man Zero",
      "Mega Man Zero 2",

      "Sonic the Hedgehog",
      "Sonic the Hedgehog 2",
      "Sonic 3 & Knuckles",
      "Sonic Advance",
      "Sonic Advance 2",
      "Sonic Advance 3",

      "Super Street Fighter II Turbo",
      "Street Fighter Alpha 3",
      "Super Smash Bros",

      "EarthBound",
      "Final Fantasy V",
      "Final Fantasy VI",

      "Zombies Ate My Neighbors",
      "Tetris Worlds",
      "Dolucky no A.League Soccer"
    ],
    changes: [
      "Introdução melhorada",
      "Exibição do emulador melhorada",
      "Música de fundo adicionada",
      "Interface melhorada",
      "Indicador de novidade adicionado",
      "Código otimizado",
      "Novas animações adicionadas",
      "Novo modo de jogo adicionado",
      "Nova tela de carregamento adicionada"
    ]
  }
];

function renderChangelog() {
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