export function startControllerNavigation() {

  let mode = "mouse";
  let index = 0;
  let lastMoveTime = 0;

  let filterIndex = 0;

  let lbPressed = false;
  let rbPressed = false;

  let buttonPressed = false;

  let startPressed = false;

  const DEADZONE = 0.25;
  const MOVE_DELAY = 140;

  function getGamepad() {
    const pads = navigator.getGamepads();

    for (let i = 0; i < pads.length; i++) {
      if (pads[i]?.connected) return pads[i];
    }

    return null;
  }

  function getStick(gamepad) {
    const sticks = [
      { x: gamepad.axes[0] ?? 0, y: gamepad.axes[1] ?? 0 },
      { x: gamepad.axes[2] ?? 0, y: gamepad.axes[3] ?? 0 }
    ];

    let best = sticks[0];

    const mag0 = Math.abs(sticks[0].x) + Math.abs(sticks[0].y);
    const mag1 = Math.abs(sticks[1].x) + Math.abs(sticks[1].y);

    if (mag1 > mag0) best = sticks[1];

    return best;
  }

  function getGames() {
    return [...document.querySelectorAll(".game")];
  }

  function setControllerMode() {
    if (mode !== "controller") {
      mode = "controller";
      document.body.classList.add("controller-mode");
    }
  }

  function setMouseMode() {
    if (mode !== "mouse") {
      mode = "mouse";
      document.body.classList.remove("controller-mode");
    }
  }

  function updateUI() {
    const games = getGames();
    if (!games.length) return;

    index = Math.max(0, Math.min(index, games.length - 1));

    games.forEach(g => g.classList.remove("selected"));

    games[index].classList.add("selected");

    games[index].scrollIntoView({
      block: "nearest",
      behavior: "smooth"
    });
  }

  function move(dx, dy) {
    const games = getGames();
    if (!games.length) return;

    const cols = Math.max(
      1,
      Math.floor(
        games[0].parentElement.offsetWidth /
        (games[0].offsetWidth + 20)
      )
    );

    index = Math.max(
      0,
      Math.min(index + dx + dy * cols, games.length - 1)
    );

    updateUI();
  }

  // 🖱️ mouse
  document.addEventListener("mousemove", (e) => {
    setMouseMode();

    const game = e.target.closest?.(".game");
    if (!game) return;

    const games = getGames();
    const i = games.indexOf(game);

    if (i !== -1) {
      index = i;
      updateUI();
    }
  });

  document.addEventListener("click", (e) => {
    const game = e.target.closest?.(".game");
    if (!game) return;

    setMouseMode();
    game.click();
  });

  function handleInput(gamepad) {
    const now = Date.now();

    if (now - lastMoveTime >= MOVE_DELAY) {
      const stick = getStick(gamepad);

      const x = stick.x;
      const y = stick.y;

      let moved = false;

      if (Math.abs(y) > Math.abs(x)) {
        if (y < -DEADZONE) {
          move(0, -1);
          moved = true;
        } else if (y > DEADZONE) {
          move(0, 1);
          moved = true;
        }
      } else {
        if (x < -DEADZONE) {
          move(-1, 0);
          moved = true;
        } else if (x > DEADZONE) {
          move(1, 0);
          moved = true;
        }
      }

      if (moved) {
        lastMoveTime = now;
      }
    }

    // LB
    if (gamepad.buttons[4]?.pressed) {
      if (!lbPressed) {
        lbPressed = true;
        changeFilter(-1);
      }
    } else {
      lbPressed = false;
    }

    // RB
    if (gamepad.buttons[5]?.pressed) {
      if (!rbPressed) {
        rbPressed = true;
        changeFilter(1);
      }
    } else {
      rbPressed = false;
    }

    // START
    if (gamepad.buttons[9]?.pressed) {

      if (!startPressed) {
        startPressed = true;

        const cd = document.querySelector("#cd");

        // só inicia se intro ainda existir
        if (cd && document.body.classList.contains("started") === false) {
          cd.click();
        }
      }

} else {
  startPressed = false;
}

    // 🎮 BOTÕES
    const pressed =
      gamepad.buttons[0]?.pressed || // X / A
      gamepad.buttons[1]?.pressed || // O / B
      gamepad.buttons[2]?.pressed || // □ / X
      gamepad.buttons[3]?.pressed;   // △ / Y

    // só executa UMA vez por clique
    if (pressed && !buttonPressed) {
      buttonPressed = true;

      const games = getGames();
      games[index]?.click();
    }

    // reset quando soltar
    if (!pressed) {
      buttonPressed = false;
    }
  }

  function loop() {
    const gamepad = getGamepad();

    if (gamepad) {
      const stick = getStick(gamepad);

      const x = stick.x;
      const y = stick.y;

      const moved =
        Math.abs(x) > 0.25 ||
        Math.abs(y) > 0.25 ||
        gamepad.buttons.some(b => b.pressed);

      if (moved) {
        setControllerMode();
      }

      handleInput(gamepad);
    }

    requestAnimationFrame(loop);
  }

  function getFilters() {
  return [...document.querySelectorAll(".filter-btn")];
}

function changeFilter(dir) {
  const filters = getFilters();
  if (!filters.length) return;

  filterIndex += dir;

  if (filterIndex < 0) {
    filterIndex = filters.length - 1;
  }

  if (filterIndex >= filters.length) {
    filterIndex = 0;
  }

  filters[filterIndex].click();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  // volta seleção pro primeiro jogo
  index = 0;

  updateUI();
}

  updateUI();
  loop();
}

// reset
export function resetSelection() {
  const games = [...document.querySelectorAll(".game")];

  if (!games.length) return;

  games.forEach(g => g.classList.remove("selected"));

  games[0].classList.add("selected");

  games[0].scrollIntoView({
    block: "nearest",
    behavior: "auto"
  });
}