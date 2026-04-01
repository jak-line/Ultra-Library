// ===== STATE =====

let currentFilter = "all";
let firstRender = true;
let startupBlock = null;

// ===== ELEMENTS =====

const library = document.getElementById("library");
const msg = document.getElementById("game-msg");
const bgm = document.getElementById("bgm");
const cdInsertSfx = document.getElementById("cd-insert-sfx");
const discRead = document.getElementById("cd-read");
const loadingText = document.querySelector(".loading-text");

const intro = document.getElementById("intro");
const cd = document.getElementById("cd");
const ps2 = document.getElementById("ps2");
const skipBtn = document.getElementById("skip-intro");

const changelogBtn = document.getElementById("changelog-btn");
const changelogBox = document.getElementById("changelog");

// ===== LOADING =====

let dots = 0;
let loadingInterval = null;

function startLoadingDots() {
  dots = 0;

  loadingInterval = setInterval(() => {
    dots = (dots + 1) % 4;
    loadingText.textContent = "Carregando" + ".".repeat(dots);
  }, 400);
}

function stopLoadingDots() {
  clearInterval(loadingInterval);
}

// ===== GAME FLOW =====

function startGameFlow(game) {
  document.body.classList.add("playing");
  bgm.pause();

  setTimeout(() => {
    startLoadingDots();
    msg.style.opacity = "1";

    setTimeout(() => {
      msg.style.opacity = "0";
      stopLoadingDots();

      setTimeout(() => {
        startGame(game.core, game.rom);
      }, 400);

    }, 2500);
  }, 1000);
}

// ===== FILTER =====

function setFilter(filter, el) {
  currentFilter = filter;

  document.querySelectorAll(".filter-btn").forEach(btn =>
    btn.classList.remove("active")
  );

  el.classList.add("active");
  renderGames();
}

// ===== RENDER =====

function renderGames() {
  library.innerHTML = "";

  games.forEach((game, index) => {
    if (currentFilter !== "all" && game.core !== currentFilter) return;

    const div = document.createElement("div");
    div.className = "game";
    div.dataset.index = index;

    div.addEventListener("mouseenter", () => {
      document.body.classList.add("hovering-game");
    });

    div.addEventListener("mouseleave", () => {
      document.body.classList.remove("hovering-game");
    });

    div.innerHTML = `
      <div class="cover">
        <img src="${game.cover}">
        ${game.isNew ? '<img class="new-badge" src="img/new.png">' : ''}
      </div>
      <p>${game.title}</p>
    `;

    library.appendChild(div);
  });

  if (document.body.classList.contains("ready")) {
    animateGames();
  }

  firstRender = false;
}

function animateGames() {
  const allGames = document.querySelectorAll(".game");

  allGames.forEach((game, i) => {
    setTimeout(() => {
      game.style.opacity = "1";
      game.style.transform = "translateY(0)";
    }, i * 80);
  });
}

// ===== EVENTS =====

// click nos jogos
library.addEventListener("click", (e) => {
  const gameDiv = e.target.closest(".game");
  if (!gameDiv) return;

  const game = games[gameDiv.dataset.index];
  if (!game || !game.rom) return;

  startGameFlow(game);
});

// filtros
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    setFilter(btn.dataset.filter, btn);
  });
});

// changelog toggle
changelogBtn.addEventListener("click", () => {
  changelogBox.classList.toggle("open");
  document.body.classList.toggle("changelog-open");
});

// ===== INTRO =====

let introStarted = false;

cd.addEventListener("click", () => {
  if (introStarted) return;
  introStarted = true;

  startupBlock = createStartupBlock();

  cd.classList.add("insert");

  cdInsertSfx.currentTime = 0.9;
  cdInsertSfx.volume = 0.7;
  cdInsertSfx.play().catch(() => {});

  cd.addEventListener("animationend", () => {
    handleDiscInsert();
  }, { once: true });
});

// skip intro
skipBtn.addEventListener("click", () => {
  if (introStarted) return;
  introStarted = true;

  startupBlock = createStartupBlock();

  ps2.src = "img/ps2closed.png";
  ps2.style.zIndex = 3;
  ps2.style.filter = "brightness(1)";

  intro.style.opacity = "0";

  setTimeout(() => {
    finishStartup(2600);
  }, 600);
});

// ===== INTRO HELPERS =====

function createStartupBlock() {
  const block = document.createElement("div");
  block.id = "startup-block";
  document.body.appendChild(block);
  return block;
}

function handleDiscInsert() {
  setTimeout(() => {
    discRead.currentTime = 0;
    discRead.volume = 0.7;
    discRead.play().catch(() => {});
  }, 350);

  ps2.src = "img/ps2closed.png";
  ps2.style.zIndex = 3;
  ps2.style.filter = "brightness(1.6) contrast(1.2)";

  setTimeout(() => {
    ps2.style.filter = "brightness(1)";
  }, 100);

  ps2.classList.add("ps2-squish");

  setTimeout(() => {
    ps2.classList.remove("ps2-squish");
  }, 180);

  setTimeout(() => {
    intro.style.opacity = "0";

    setTimeout(() => {
      finishStartup(2600);
    }, 600);

  }, 900);
}

function finishStartup(delay) {
  window.scrollTo(0, 0);

  intro.style.display = "none";

  document.body.classList.add("started", "startup");

  renderGames();

  setTimeout(() => {
    showUI();
    startBGM();
    document.body.classList.add("ready");

    startupBlock.style.opacity = "0";
    setTimeout(() => startupBlock.remove(), 300);

    animateGames();

  }, delay);
}

function showUI() {
  document.getElementById("filters").style.opacity = "1";
  document.getElementById("subtitle").style.opacity = "1";

  const btn = document.getElementById("changelog-btn");
  btn.style.opacity = "1";
  btn.style.pointerEvents = "auto";
}

function startBGM() {
  bgm.volume = 0;
  bgm.play();

  discRead.pause();
  discRead.currentTime = 0;

  let vol = 0;

  const fade = setInterval(() => {
    vol += 0.05;
    bgm.volume = vol;

    if (vol >= 0.4) clearInterval(fade);
  }, 100);
}