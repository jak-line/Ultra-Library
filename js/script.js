// ===== FIREBASE =====
import {
  db,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs
} from "./firebase.js";

// ===== USERDATA =====
import {
  startTracking,
  savePlayTime,
  stopTracking,
  formatPlayTime,
  saveRecentGame,
  toggleFavorite
} from "./userdata.js";

// ===== CONTROLLER =====
import {
  startControllerNavigation,
  stopControllerNavigation,
  resetSelection
} from "./controller.js";

// ===== STATE =====
let currentFilter = "all";
let firstRender = true;
let startupBlock = null;
let currentUser = null;
let currentUserData = null;
let introStarted = false;

// ===== ELEMENTS =====
const $ = (id) => document.getElementById(id);

const library = $("library");
const msg = $("game-msg");
const bgm = $("bgm");
const cdInsertSfx = $("cd-insert-sfx");
const discRead = $("cd-read");
const loadingText = document.querySelector(".loading-text");

const intro = $("intro");
const cd = $("cd");
const ps2 = $("ps2");
const skipBtn = $("skip-intro");

const changelogBtn = $("changelog-btn");
const changelogBox = $("changelog");

const loginBtn = $("login-btn");
const loginBox = $("login-box");
const loginInput = $("login-input");
const loginPassword = $("login-password");
const loginConfirm = $("login-confirm");
const loginClose = $("login-close");

const userBox = $("user-box");
const userName = $("user-name");
const logoutBtn = $("logout-btn");

const avatarInput = $("avatar-input");
const avatarImg = $("avatar-img");
const avatarPicker = $("avatar-picker");

const historyBtn = $("history-btn");
const favoritesBtn = $("favorites-btn");

const leaderboardBtn = $("leaderboard-btn");
const leaderboard = $("leaderboard");
const leaderboardClose = $("leaderboard-close");

const DEFAULT_AVATAR = "img/default-avatar.png";

// ============================================
// ===== LOADING ==============================
// ============================================

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

// ============================================
// ===== GAME FLOW ============================
// ============================================

function startGameFlow(game) {
  stopControllerNavigation();

  startTracking(game);

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

// ============================================
// ===== FILTER + RENDER ======================
// ============================================

function setFilter(filter, el) {
  currentFilter = filter;

  document.querySelectorAll(".filter-btn").forEach(btn =>
    btn.classList.remove("active")
  );

  historyBtn.classList.remove("active");
  favoritesBtn.classList.remove("active");

  el.classList.add("active");
  renderGames();
}

function renderGames() {
  library.innerHTML = "";
  resetSelection();

  if (currentFilter === "history") {

    const title = document.createElement("div");

    title.id = "history-title";
    title.textContent = "Histórico";

    library.appendChild(title);
  }

  let filteredGames = games;

  const favorites =
  currentUserData?.favorites || [];

  if (currentFilter === "history") {

    const history =
      currentUserData?.recentGames || [];

    filteredGames = history
      .map(title =>
        games.find(g => g.title === title)
      )
      .filter(Boolean);

  } else if (currentFilter === "favorites") {

    filteredGames = games.filter(
      game => favorites.includes(game.title)
    );

  } else if (currentFilter !== "all") {

    filteredGames = games.filter(
      game => game.core === currentFilter
    );
  }

  filteredGames.forEach((game, index) => {

    const playTime = currentUserData?.playTime || {};

    const div = document.createElement("div");
    div.className = "game";
    div.dataset.index = games.indexOf(game);
    div.dataset.new = game.isNew ? "true" : "false";

    if ((index + 1) % 5 === 0) {
      div.classList.add("edge-right");
    }

    div.addEventListener("mouseenter", () => {
      document.body.classList.add("hovering-game");
    });

    div.addEventListener("mouseleave", () => {
      document.body.classList.remove("hovering-game");
    });

    const secondsPlayed =
      playTime[game.title] || 0;

    const formattedTime =
      formatPlayTime(secondsPlayed);

    const isFavorited =
      favorites.includes(game.title);

    div.innerHTML = `
      <div class="cover">

        <img src="${game.cover}">

        ${getNewBadge(game.isNew)}

        <button class="
          favorite-btn
          ${isFavorited ? "favorited" : ""}
        ">
          ★
        </button>

      </div>

      <p>${game.title}</p>

      <div class="game-time">
        ${formattedTime}
      </div>
    `;

    library.appendChild(div);
  });

  if (document.body.classList.contains("ready")) {
    animateGames();
  }

  firstRender = false;
}

function animateGames() {
  document.querySelectorAll(".game").forEach((game, i) => {
    setTimeout(() => {
      game.style.opacity = "1";
      game.style.transform = "translateY(0)";
    }, i * 80);
  });
}

// ============================================
// ===== INTRO ================================
// ============================================

cd.addEventListener("click", () => {
  if (introStarted) return;
  introStarted = true;

  startupBlock = createStartupBlock();
  cd.classList.add("insert");

  cdInsertSfx.currentTime = 0.9;
  cdInsertSfx.volume = 0.7;
  cdInsertSfx.play().catch(() => {});

  cd.addEventListener("animationend", handleDiscInsert, { once: true });
});

skipBtn.addEventListener("click", () => {
  if (introStarted) return;
  introStarted = true;

  startupBlock = createStartupBlock();

  ps2.src = "img/ps2closed.png";
  ps2.style.zIndex = 3;
  ps2.style.filter = "brightness(1)";

  intro.style.opacity = "0";

  setTimeout(() => finishStartup(2600), 600);
});

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

  setTimeout(() => ps2.style.filter = "brightness(1)", 100);

  ps2.classList.add("ps2-squish");
  setTimeout(() => ps2.classList.remove("ps2-squish"), 180);

  setTimeout(() => {
    intro.style.opacity = "0";
    setTimeout(() => finishStartup(2600), 600);
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
  $("filters-wrapper").style.opacity = "1";
  $("subtitle").style.opacity = "1";

  changelogBtn.style.opacity = "1";
  changelogBtn.style.pointerEvents = "auto";
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

// ============================================
// ===== EVENTS ===============================
// ============================================

library.addEventListener("click", async (e) => {

  // =================================
  // FAVORITE BUTTON
  // =================================

  const favoriteBtn =
    e.target.closest(".favorite-btn");

  if (favoriteBtn) {

    e.stopPropagation();

    const gameDiv =
      favoriteBtn.closest(".game");

    const game =
      games[gameDiv.dataset.index];

    currentUserData =
      await toggleFavorite(
        currentUser,
        currentUserData,
        game.title
      );

    favoriteBtn.classList.toggle(
      "favorited"
    );

    return;
  }

  // =================================
  // OPEN GAME
  // =================================

  const gameDiv = e.target.closest(".game");
  if (!gameDiv) return;

  const game = games[gameDiv.dataset.index];

  if (!game?.rom) {
    console.error("ROM AUSENTE:", game.title);
    return;
  }

  await saveRecentGame(currentUser, game);

  if (!currentUserData) {
    currentUserData = {};
  }

  if (!currentUserData.recentGames) {
    currentUserData.recentGames = [];
  }

  currentUserData.recentGames =
    currentUserData.recentGames.filter(
      title => title !== game.title
    );

  currentUserData.recentGames.unshift(game.title);

  currentUserData.recentGames =
    currentUserData.recentGames.slice(0, 5);
    
  renderContinuePlaying();
  startGameFlow(game);
});

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    setFilter(btn.dataset.filter, btn);
  });
});

historyBtn.addEventListener("click", () => {

  currentFilter = "history";

  document.querySelectorAll(".filter-btn").forEach(btn =>
    btn.classList.remove("active")
  );

  historyBtn.classList.add("active");

  renderGames();
});

favoritesBtn.addEventListener("click", () => {

  currentFilter = "favorites";

  document.querySelectorAll(".filter-btn").forEach(btn =>
    btn.classList.remove("active")
  );

  historyBtn.classList.remove("active");

  favoritesBtn.classList.add("active");

  renderGames();
});

changelogBtn.addEventListener("click", () => {

  const opened =
    changelogBox.classList.toggle("open");

  document.body.classList.toggle(
    "changelog-open",
    opened
  );

  changelogBtn.classList.toggle(
    "active",
    opened
  );
});



function resetUserSession() {

  // limpa dados carregados
  currentUserData = null;

  // reseta avatar
  avatarImg.src = DEFAULT_AVATAR;

  // volta pro filtro padrão
  currentFilter = "all";

  // remove estados ativos
  historyBtn.classList.remove("active");
  favoritesBtn.classList.remove("active");

  // ativa botão ALL
  document.querySelectorAll(".filter-btn")
    .forEach(btn => {

      btn.classList.remove("active");

      if (btn.dataset.filter === "all") {
        btn.classList.add("active");
      }
    });

  // rerenderiza jogos
  renderGames();
}

function getTotalPlayTime(playTime = {}) {

  return Object.values(playTime)
    .reduce((total, seconds) => {

      return total + seconds;

    }, 0);
}



// ============================================
// ===== LOGIN ================================
// ============================================

window.addEventListener("load", () => {
  const saved = localStorage.getItem("user");

  if (saved) {
    currentUser = saved;
    updateUserUI();
    loadUserData();
  }
});

loginConfirm.addEventListener("click", async () => {
  const name = loginInput.value.trim();
  const password = loginPassword.value.trim();
  if (!name || !password) return;

  const userRef = doc(db, "users", name);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, { password: btoa(password) });
  } else if (snap.data().password !== btoa(password)) {
    alert("Senha incorreta");
    return;
  }

  currentUser = name;

  resetUserSession();

  localStorage.setItem("user", name);

  loginInput.value = "";
  loginPassword.value = "";
  loginBox.classList.remove("open");

  updateUserUI();
  await loadUserData();
  renderGames();
});

loginInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") loginConfirm.click();
});

loginBtn.addEventListener("click", () => {

  if (currentUser) {

    const opened =
      userBox.classList.toggle("open");

    loginBtn.classList.toggle(
      "active",
      opened
    );

  } else {

    loginBox.classList.add("open");

    loginBtn.classList.add("active");
  }
});

loginClose.addEventListener("click", () => {
  loginBox.classList.remove("open");

  loginBtn.classList.remove("active");
});

document.addEventListener("click", (e) => {

  if (
    loginBox.classList.contains("open") &&
    !loginBox.contains(e.target) &&
    e.target !== loginBtn
  ) {

    loginBox.classList.remove("open");

    loginBtn.classList.remove("active");
  }
});

logoutBtn.addEventListener("click", async () => {

  await savePlayTime(currentUser);
  stopTracking();

  currentUser = null;

  resetUserSession();

  localStorage.removeItem("user");

  userBox.classList.remove("open");

  updateUserUI();
});

function updateUserUI() {
  if (currentUser) {
    loginBtn.innerHTML = `👤 <span class="username">${currentUser}</span>`;
    userName.textContent = "Logado como: " + currentUser;
    loginBtn.classList.add("logged");
  } else {
    loginBtn.textContent = "👤";
    loginBtn.classList.remove("logged");
    userBox.classList.remove("open");
  }
}

// ============================================
// ===== AVATAR ===============================
// ============================================

avatarPicker.addEventListener("click", () => {
  avatarInput.click();
});

avatarInput.addEventListener("change", async () => {
  const file = avatarInput.files[0];
  if (!file || !currentUser) return;

  const img = new Image();
  const reader = new FileReader();

  reader.onload = () => (img.src = reader.result);

  img.onload = async () => {
    const canvas = document.createElement("canvas");
    const size = 256;

    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");

    const minSide = Math.min(img.width, img.height);
    const sx = (img.width - minSide) / 2;
    const sy = (img.height - minSide) / 2;

    ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size);

    const base64 = canvas.toDataURL("image/jpeg", 0.7);
    avatarImg.src = base64;

    await setDoc(doc(db, "users", currentUser), {
      avatarBase64: base64
    }, { merge: true });

    avatarInput.value = "";
  };

  reader.readAsDataURL(file);
});

async function loadUserData() {

  if (!currentUser) return;

  const snap =
    await getDoc(
      doc(db, "users", currentUser)
    );

  currentUserData = snap.data();

  avatarImg.src =
    snap.exists() &&
    snap.data().avatarBase64

      ? snap.data().avatarBase64

      : DEFAULT_AVATAR;

  renderContinuePlaying();
}

setInterval(() => {
  if (document.body.classList.contains("playing")) {
    savePlayTime(currentUser);
  }
}, 30000);

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    savePlayTime(currentUser);
  }
});

startControllerNavigation();


leaderboardBtn.addEventListener("click", async () => {

  leaderboard.classList.add("open");

  await loadLeaderboard();
});

leaderboardClose.addEventListener("click", () => {

  leaderboard.classList.remove("open");
});

async function loadLeaderboard() {

  const usersSnap =
    await getDocs(collection(db, "users"));

  const users = [];

  usersSnap.forEach((docSnap) => {

    const data = docSnap.data();

    const totalPlayTime =
      getTotalPlayTime(data.playTime);

    users.push({
      name: docSnap.id,

      avatar:
        data.avatarBase64 ||
        DEFAULT_AVATAR,

      totalPlayTime
    });
  });

  // ordena maior -> menor
  users.sort((a, b) =>
    b.totalPlayTime - a.totalPlayTime
  );

  const podium = leaderboard.querySelector(".leaderboard-podium");
const list = leaderboard.querySelector(".leaderboard-list");

podium.innerHTML = "";
list.innerHTML = "";

// =====================================
// TOP 3
// =====================================

const top3 = users.slice(0, 3);

const positions = [
  { place: 2, icon: "🥈" },
  { place: 1, icon: "🥇" },
  { place: 3, icon: "🥉" }
];

// ordem visual:
// segundo | primeiro | terceiro

const visualOrder = [
  top3[1],
  top3[0],
  top3[2]
];

visualOrder.forEach((user, index) => {

  if (!user) return;

  const pos = positions[index];

  const div = document.createElement("div");

  const classes = {
    1: "first",
    2: "second",
    3: "third"
  };

div.className = `
  podium
  ${classes[pos.place]}
`;

  div.innerHTML = `
    <div class="podium-avatar">
      <img
        src="${user.avatar}"
        draggable="false"
      >
    </div>

    <div class="podium-name">
      ${user.name}
    </div>

    <div class="podium-time">
      ${formatPlayTime(user.totalPlayTime)}
    </div>

    <div class="podium-rank">
      ${pos.icon}
    </div>
  `;

  podium.appendChild(div);
});

// =====================================
// RESTO DA LISTA
// =====================================

users.slice(3, 7).forEach((user, index) => {

  const div = document.createElement("div");

  div.className = "leaderboard-entry";

  div.innerHTML = `
    <span>#${index + 4}</span>
    <span>${user.name}</span>
    <span>${formatPlayTime(user.totalPlayTime)}</span>
  `;

  list.appendChild(div);
});

// =====================================
// YOUR RANK
// =====================================

const yourRank =
  document.getElementById("your-rank");

if (!currentUser) {

  yourRank.textContent =
    "Faça login para aparecer no ranking";

} else {

  const userIndex =
    users.findIndex(
      user => user.name === currentUser
    );

  if (userIndex === -1) {

    yourRank.textContent =
      "Você não está no ranking";

  } else {

    const user =
      users[userIndex];

    yourRank.textContent = `
      #${userIndex + 1}
      •
      ${user.name}
      •
      ${formatPlayTime(user.totalPlayTime)}
    `;
  }
}
}


function renderContinuePlaying() {

  const slider =
    document.getElementById("continue-slider");

  if (!slider) return;

  slider.innerHTML = "";

  const recentGames =
    currentUserData?.recentGames || [];

  recentGames.forEach(title => {

    const game =
      games.find(g => g.title === title);

    if (!game) return;

    const card =
      document.createElement("div");

    card.className = "continue-card";

    card.innerHTML = `
      <img
        src="${game.cover}"
        alt="${game.title}"
      >
    `;

    card.addEventListener("click", () => {

      if (!game.rom) return;

      startGameFlow(game);

    });

    slider.appendChild(card);

  });
}
