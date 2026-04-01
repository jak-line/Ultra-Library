const CONTROLS_ENABLED = false;

if (!CONTROLS_ENABLED) {
  console.log("Sistema de controles desativado");
}

// ===== PRESETS =====
if (CONTROLS_ENABLED) {

const PRESETS = {
  single: {
    name: "1 Player",
    players: {
      p1: {
        up: "ArrowUp",
        down: "ArrowDown",
        left: "ArrowLeft",
        right: "ArrowRight",
        a: "KeyZ",
        b: "KeyX",
        start: "Enter",
        select: "ShiftRight"
      }
    }
  },

  multiKeyboard: {
    name: "2 Players",
    players: {
      p1: {
        up: "KeyW",
        down: "KeyS",
        left: "KeyA",
        right: "KeyD",
        a: "KeyF",
        b: "KeyG"
      },
      p2: {
        up: "ArrowUp",
        down: "ArrowDown",
        left: "ArrowLeft",
        right: "ArrowRight",
        a: "KeyK",
        b: "KeyL"
      }
    }
  }
};

// ===== STATE =====

let currentPresetKey = "single";

// ===== APPLY =====

function applyPreset(key) {
  const preset = PRESETS[key];
  if (!preset) return;

  currentPresetKey = key;

  localStorage.setItem("controlPreset", key);

  applyToEmulator(preset);

  console.log("Preset aplicado:", preset.name);
}

// ===== EMULATOR INTEGRATION =====

function applyToEmulator(preset) {

  const controls = {};

  // ===== PLAYER 1 =====
  if (preset.players.p1 !== "gamepad") {
    const p = preset.players.p1;

    controls[1] = {
      up: p.up,
      down: p.down,
      left: p.left,
      right: p.right,
      a: p.a,
      b: p.b,
      start: p.start || "Enter",
      select: p.select || "ShiftRight"
    };
  }

  // ===== PLAYER 2 =====
  if (preset.players.p2 && preset.players.p2 !== "gamepad") {
    const p = preset.players.p2;

    controls[2] = {
      up: p.up,
      down: p.down,
      left: p.left,
      right: p.right,
      a: p.a,
      b: p.b
    };
  }

  window.EJS_controls = controls;

  console.log("Controles aplicados:", controls);
}

// ===== LOAD SAVED =====

window.addEventListener("load", () => {
  const saved = localStorage.getItem("controlPreset") || "single";
  applyPreset(saved);
});

}