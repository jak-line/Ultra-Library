let currentTheme = "default";

function setTheme(theme) {
  currentTheme = theme;
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateSubtitle(theme);

  document.querySelectorAll(".game").forEach((el) => {
    const game = games[el.dataset.index];
    const cover = el.querySelector(".cover");

    const old = cover.querySelector(".new-badge, .new-badge-text");
    if (old) old.remove();

    cover.insertAdjacentHTML("beforeend", getNewBadge(game.isNew));
  });
}

function loadTheme() {
  const saved = localStorage.getItem("theme") || "default";
  currentTheme = saved;
  document.body.setAttribute("data-theme", saved);
  updateSubtitle(saved);
}

function updateSubtitle(theme) {
  const subtitle = document.getElementById("subtitle");

  if (theme === "blocks") {
    subtitle.textContent = "PC Edition";
  } else {
    subtitle.textContent = "Emulação retrô direto no navegador";
  }
}

function getNewBadge(isNew) {
  if (!isNew) return "";

  return currentTheme === "blocks"
    ? `<span class="new-badge-text">NEW!</span>`
    : `<img class="new-badge" src="img/new.png">`;
}

const dropdown = document.getElementById("theme-dropdown");
const btn = document.getElementById("theme-btn");
const options = document.querySelectorAll("#theme-menu button");

// abrir/fechar
btn.addEventListener("click", () => {

  const opened =
    dropdown.classList.toggle("open");

  btn.classList.toggle(
    "active",
    opened
  );
});

// selecionar tema
options.forEach(opt => {

  opt.addEventListener("click", () => {

    setTheme(opt.dataset.theme);

    dropdown.classList.remove("open");

    btn.classList.remove("active");
  });
});

// fechar clicando fora
document.addEventListener("click", (e) => {

  if (!dropdown.contains(e.target)) {

    dropdown.classList.remove("open");

    btn.classList.remove("active");
  }
});

// carrega automaticamente ao abrir o site
window.addEventListener("DOMContentLoaded", loadTheme);