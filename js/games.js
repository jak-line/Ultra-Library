function createGame(title, core, romKey, isNew = false) {
  return {
    title,
    core,
    rom: ROMS[romKey] || null,
    cover: `covers/${romKey}.png`,
    isNew
  };
}

const games = [

  // ================= MARIO =================
  createGame("Super Mario Bros", "nes", "mario1"),
  createGame("Super Mario Bros 2", "nes", "mario2"),
  createGame("Super Mario Bros 3", "nes", "mario3"),
  createGame("Super Mario World", "snes", "marioworld"),
  createGame("Super Mario World 2: Yoshi's Island", "snes", "marioworld2", true),
  createGame("Super Mario RPG", "snes", "mariorpg", true),
  createGame("Super Mario Kart", "snes", "mariokart", true),
  createGame("Super Mario 64", "n64", "mario64"),
  createGame("Mario Kart 64", "n64", "mariokart64", true),

  // ================= ZELDA =================
  createGame("Zelda: A Link to the Past", "snes", "zelda_lttp", true),
  createGame("Zelda: Ocarina of Time", "n64", "zelda_oot", true),
  createGame("Zelda: Majora's Mask", "n64", "zelda_mm", true),

  // ================= METROID =================
  createGame("Super Metroid", "snes", "supermetroid", true),
  createGame("Metroid Fusion", "gba", "metroidfusion", true),
  createGame("Metroid Zero Mission", "gba", "metroidzero", true),

  // ================= DONKEY KONG =================
  createGame("Donkey Kong Country", "snes", "dkcountry"),
  createGame("Donkey Kong Country 2", "snes", "dkcountry2", true),
  createGame("Donkey Kong Country 3", "snes", "dkcountry3", true),

  // ================= KIRBY =================
  createGame("Kirby's Dream Course", "snes", "kirbydc"),
  createGame("Kirby: Nightmare in Dream Land", "gba", "kirbynidl"),

  // ================= MEGA MAN =================
  createGame("Mega Man 2", "nes", "megaman2", true),
  createGame("Mega Man 3", "nes", "megaman3", true),
  createGame("Mega Man X", "snes", "megamanx", true),
  createGame("Mega Man Zero", "gba", "megamanzero", true),
  createGame("Mega Man Zero 2", "gba", "megamanzero2", true),

  // ================= SONIC =================
  createGame("Sonic the Hedgehog", "genesis", "sonic", true),
  createGame("Sonic the Hedgehog 2", "genesis", "sonic2", true),
  createGame("Sonic 3 & Knuckles", "genesis", "s3k", true),
  createGame("Sonic Advance", "gba", "sonicadvance", true),
  createGame("Sonic Advance 2", "gba", "sonicadvance2", true),
  createGame("Sonic Advance 3", "gba", "sonicadvance3", true),

  // ================= FIGHTING =================
  createGame("Super Street Fighter II Turbo", "snes", "sf2turbo", true),
  createGame("Street Fighter Alpha 3", "gba", "sfalpha3", true),
  createGame("Super Smash Bros", "n64", "smashbros", true),

  // ================= RPG =================
  createGame("EarthBound", "snes", "earthbound", true),
  createGame("Final Fantasy V", "snes", "FFV", true),
  createGame("Final Fantasy VI", "gba", "FFVI", true),
  createGame("Pokemon Red", "gb", "pokemonred"),

  // ================= BOMBERMAN =================
  createGame("Super Bomberman 2", "snes", "sbomber2"),
  createGame("Super Bomberman 4", "snes", "sbomber4"),
  createGame("Super Bomberman 5", "snes", "sbomber5"),

  // ================= OUTROS =================
  createGame("Zombies Ate My Neighbors", "snes", "zombiesamn", true),
  createGame("Tetris Worlds", "gba", "tetrisworlds", true),
  createGame("The New Tetris", "n64", "tntetris"),
  createGame("Dolucky no A.League Soccer", "snes", "dolucky", true)

];