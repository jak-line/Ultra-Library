let controllerRunning = false;
let controllerAnimationFrame = null;

export function startControllerNavigation() {
    if (controllerRunning) return;

    controllerRunning = true;

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
            if (pads[i]?.connected) {
                return pads[i];
            }
        }

        return null;
    }

    function getStick(gamepad) {
        const sticks = [
            {
                x: gamepad.axes[0] ?? 0,
                y: gamepad.axes[1] ?? 0
            },
            {
                x: gamepad.axes[2] ?? 0,
                y: gamepad.axes[3] ?? 0
            }
        ];

        const mag0 =
            Math.abs(sticks[0].x) +
            Math.abs(sticks[0].y);

        const mag1 =
            Math.abs(sticks[1].x) +
            Math.abs(sticks[1].y);

        return mag1 > mag0 ? sticks[1] : sticks[0];
    }

    function getGames() {
        return [...document.querySelectorAll(".game")];
    }

    function setControllerMode() {
        if (mode === "controller") return;

        mode = "controller";
        document.body.classList.add("controller-mode");
    }

    function setMouseMode() {
        if (mode === "mouse") return;

        mode = "mouse";
        document.body.classList.remove("controller-mode");
    }

    function updateUI() {
        const games = getGames();

        if (!games.length) return;

        index = Math.max(
            0,
            Math.min(index, games.length - 1)
        );

        games.forEach(game => {
            game.classList.remove("selected");
        });

        games[index].classList.add("selected");

        games[index].scrollIntoView({
            block: "nearest",
            behavior: "smooth"
        });
    }

    function move(dx, dy) {
        const games = getGames();

        if (!games.length) return;

        const firstGame = games[0];

        const cols = Math.max(
            1,
            Math.floor(
                firstGame.parentElement.offsetWidth /
                (firstGame.offsetWidth + 20)
            )
        );

        index = Math.max(
            0,
            Math.min(
                index + dx + dy * cols,
                games.length - 1
            )
        );

        updateUI();
    }

    function getFilters() {
        return [...document.querySelectorAll(".filter-btn")];
    }

    function changeFilter(direction) {
        const filters = getFilters();

        if (!filters.length) return;

        filterIndex += direction;

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

        index = 0;
        updateUI();
    }

    function handleInput(gamepad) {
        const now = Date.now();

        // =========================
        // ANALOG STICK
        // =========================

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

        // =========================
        // LB
        // =========================

        const lb = gamepad.buttons[4]?.pressed;

        if (lb) {
            if (!lbPressed) {
                lbPressed = true;
                changeFilter(-1);
            }
        } else {
            lbPressed = false;
        }

        // =========================
        // RB
        // =========================

        const rb = gamepad.buttons[5]?.pressed;

        if (rb) {
            if (!rbPressed) {
                rbPressed = true;
                changeFilter(1);
            }
        } else {
            rbPressed = false;
        }

        // =========================
        // START
        // =========================

        const start = gamepad.buttons[9]?.pressed;

        if (start) {
            if (!startPressed) {
                startPressed = true;

                const cd = document.querySelector("#cd");

                if (
                    cd &&
                    !document.body.classList.contains("started")
                ) {
                    cd.click();
                }
            }
        } else {
            startPressed = false;
        }

        // =========================
        // A / B / X / Y
        // =========================

        const pressed =
            gamepad.buttons[0]?.pressed ||
            gamepad.buttons[1]?.pressed ||
            gamepad.buttons[2]?.pressed ||
            gamepad.buttons[3]?.pressed;

        if (pressed && !buttonPressed) {
            buttonPressed = true;

            const games = getGames();

            games[index]?.click();
        }

        if (!pressed) {
            buttonPressed = false;
        }
    }

    function loop() {
        if (!controllerRunning) return;

        const gamepad = getGamepad();

        if (gamepad) {
            const stick = getStick(gamepad);

            const moved =
                Math.abs(stick.x) > DEADZONE ||
                Math.abs(stick.y) > DEADZONE ||
                gamepad.buttons.some(button => button.pressed);

            if (moved) {
                setControllerMode();
            }

            handleInput(gamepad);
        }

        controllerAnimationFrame =
            requestAnimationFrame(loop);
    }

    // =========================
    // MOUSE
    // =========================

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleMouseClick);

    function handleMouseMove(event) {
        setMouseMode();

        const game = event.target.closest?.(".game");

        if (!game) return;

        const games = getGames();
        const gameIndex = games.indexOf(game);

        if (gameIndex !== -1) {
            index = gameIndex;
            updateUI();
        }
    }

    function handleMouseClick(event) {
        const game = event.target.closest?.(".game");

        if (!game) return;

        setMouseMode();

        // NÃO chama game.click() aqui.
        // O clique original já aconteceu.
    }

    updateUI();
    loop();
}

export function stopControllerNavigation() {
    controllerRunning = false;

    if (controllerAnimationFrame !== null) {
        cancelAnimationFrame(controllerAnimationFrame);
        controllerAnimationFrame = null;
    }

    document.body.classList.remove("controller-mode");
}

export function resetSelection() {
    const games = [
        ...document.querySelectorAll(".game")
    ];

    if (!games.length) return;

    games.forEach(game => {
        game.classList.remove("selected");
    });

    games[0].classList.add("selected");

    games[0].scrollIntoView({
        block: "nearest",
        behavior: "auto"
    });
}
