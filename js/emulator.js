let emulatorLoaded = false;

function startGame(core, rom){

// const saved = localStorage.getItem("controlPreset") || "single";
// if (window.applyPreset) {
//   applyPreset(saved);
// }

  // ===== EMULATOR CONFIG =====

  EJS_player = "#game";
  EJS_core = core;

  EJS_pathtodata = "https://cdn.emulatorjs.org/stable/data/";
  EJS_gameUrl = rom;

  EJS_startOnLoaded = true;

  if(!emulatorLoaded){
    const script = document.createElement("script");
    script.src = "https://cdn.emulatorjs.org/stable/data/loader.js";
    document.body.appendChild(script);

    emulatorLoaded = true;
  }
}