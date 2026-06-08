function createGame(title, core, romKey, isNew = false) {
  return {
    title,
    core,
    rom: ROMS?.[core]?.[romKey] || null,
    cover: `covers/${romKey}.png`,
    isNew
  };
}

/* =====================================================
   📚 CATALOGS
===================================================== */

const CATALOG = {

  mario: [
    ["Super Mario Bros", "nes", "mario1"],
    ["Super Mario Bros 2", "nes", "mario2"],
    ["Super Mario Bros 3", "nes", "mario3"],
    ["Super Mario World", "snes", "marioworld"],
    ["Super Mario World 2: Yoshi's Island", "snes", "marioworld2"],
    ["Super Mario RPG", "snes", "mariorpg"],
    ["Super Mario Kart", "snes", "mariokart"],
    ["Mario Kart: Super Circuit", "gba", "mariokartscircuit", true],
    ["Super Mario 64", "n64", "mario64"],
    ["Mario Kart 64", "n64", "mariokart64"],
    ["Mario Party", "n64", "marioparty", true],
    ["Mario Party 2", "n64", "marioparty2", true]
  ],

  zelda: [
    ["Zelda: A Link to the Past", "snes", "zelda_lttp"],
    ["Zelda: Ocarina of Time", "n64", "zelda_oot"],
    ["Zelda: Majora's Mask", "n64", "zelda_mm"]
  ],

  metroid: [
    ["Super Metroid", "snes", "supermetroid"],
    ["Metroid Fusion", "gba", "metroidfusion"],
    ["Metroid Zero Mission", "gba", "metroidzero"]
  ],

  donkeykong: [
    ["Donkey Kong", "nes", "dk", true],
    ["Donkey Kong Jr.", "nes", "dkjr", true],
    ["Donkey Kong 3", "nes", "dk3", true],
    ["Donkey Kong Country", "snes", "dkcountry"],
    ["Donkey Kong Country 2", "snes", "dkcountry2"],
    ["Donkey Kong Country 3", "snes", "dkcountry3"]
  ],

  kirby: [
    ["Kirby's Dream Course", "snes", "kirbydc"],
    ["Kirby: Nightmare in Dream Land", "gba", "kirbynidl"]
  ],

  pacman: [
    ["Pac-Man Collection", "gba", "paccollection", true],
    ["Pac-Man 2: The New Adventures", "snes", "pacman2", true]
  ],

  megaman: [
    ["Mega Man 2", "nes", "megaman2"],
    ["Mega Man 3", "nes", "megaman3"],
    ["Mega Man X", "snes", "megamanx"],
    ["Mega Man Zero", "gba", "megamanzero"],
    ["Mega Man Zero 2", "gba", "megamanzero2"]
  ],

  sonic: [
    ["Sonic the Hedgehog", "sega", "sonic"],
    ["Sonic the Hedgehog 2", "sega", "sonic2"],
    ["Sonic 3 & Knuckles", "sega", "s3k"],
    ["Sonic Advance", "gba", "sonicadvance"],
    ["Sonic Advance 2", "gba", "sonicadvance2"],
    ["Sonic Advance 3", "gba", "sonicadvance3"]
  ],

  hollowknight: [
    ["Hollow Knight", "gba", "hollow", true],
    ["Hollow Knight: Silksong", "gba", "silksong", true]
  ],

  fighting: [
    ["Super Street Fighter II Turbo", "snes", "sf2turbo"],
    ["Street Fighter Alpha 3", "gba", "sfalpha3"],
    ["Super Smash Bros", "n64", "smash", true]
  ],

  beatemup: [
    ["Final Fight", "snes", "ffight", true],
    ["Final Fight 2", "snes", "ffight2", true],
    ["Final Fight 3", "snes", "ffight3", true],
    ["Streets of Rage 2", "sega", "sor2", true],
    ["Captain Commando", "snes", "capcommando", true],
    ["Teenage Mutant Ninja Turtles: Turtles in Time", "snes", "turtletime", true],
    ["Joe & Mac", "snes", "joemac", true],
    ["Joe & Mac 2", "snes", "joemac2", true],
    ["Sunset Riders", "snes", "sunsetriders", true]
  ],

  platformer: [
    ["Contra III", "snes", "contra3", true],
    ["The Lion King", "snes", "lionking", true],
    ["Lost Vikings", "snes", "lostvikings", true],
    ["Pocky & Rocky", "snes", "pockyrocky", true],
    ["Animaniacs", "snes", "animaniacs", true]
  ],

  action: [
    ["Altered Beast", "sega", "alteredbeast", true],
    ["Golden Axe", "sega", "goldenaxe", true],
    ["Golden Axe 2", "sega", "goldenaxe2", true],
    ["Gunstar Heroes", "sega", "gunstarheroes", true],
    ["Shadow Dancer: The Secret of Shinobi", "sega", "shadowdancer", true],
    ["The Fireman", "snes", "fireman", true]
  ],

  rpg: [
    ["EarthBound", "snes", "earthbound"],
    ["Final Fantasy V", "snes", "ffv"],
    ["Final Fantasy VI", "gba", "ffvi"],
    ["Chrono Trigger", "snes", "chronotrigger", true]
  ],

  pokemon: [
    ["Pokémon Red", "gb", "pokemonred"],
    ["Pokémon Blue", "gb", "pokemonblue", true],
    ["Pokémon Yellow", "gb", "pokemonyellow", true],
    ["Pokémon Gold", "gbc", "pokemongold", true],
    ["Pokémon Silver", "gbc", "pokemonsilver", true],
    ["Pokémon Crystal", "gbc", "pokemoncrystal", true],
    ["Pokémon Ruby", "gba", "pokemonruby", true],
    ["Pokémon Sapphire", "gba", "pokemonsapphire", true],
    ["Pokémon Emerald", "gba", "pokemonemerald", true],
    ["Pokémon FireRed", "gba", "pokemonfirered", true],
    ["Pokémon LeafGreen", "gba", "pokemonleafgreen", true]
  ],

  bomberman: [
    ["Super Bomberman 2", "snes", "sbomber2"],
    ["Super Bomberman 4", "snes", "sbomber4"],
    ["Super Bomberman 5", "snes", "sbomber5"]
  ],

  arcade: [
    ["Metal Slug", "arcade", "metalSlug", true],
    ["Metal Slug X", "arcade", "metalSlugX", true],
    ["Metal Slug 3", "arcade", "metalSlug3", true],
    ["Metal Slug 4", "arcade", "metalSlug4", true],
    ["Metal Slug 5", "arcade", "metalSlug5", true],
    ["The King of Fighters '98", "arcade", "kof98", true],
    ["Shock Troopers", "arcade", "shocktro", true],
  ],

  sports: [
    ["International Super Star Soccer Deluxe", "snes", "intsuperstarsoccer", true],
    ["Dolucky no A.League Soccer", "snes", "dolucky"],
    ["NBA Jam", "snes", "nbajam", true]
  ],

  racing: [
    ["Super Off Road", "snes", "superoffroad", true],
    ["Rock 'n Roll Racing", "snes", "rocknrollracing", true],
    ["Micro Machines", "snes", "micromachines", true],
    ["Top Gear", "snes", "topgear", true]
  ],

  puzzle: [
    ["Goof Troop", "snes", "gooftroop", true],
    ["Puyo Puyo Tsuu", "snes", "puyotsuu", true]
  ],

  others: [
    ["Zombies Ate My Neighbors", "snes", "zombiesamn"],
    ["Tetris Worlds", "gba", "tetrisworlds"],
    ["The New Tetris", "n64", "tntetris"],
    ["Tony Hawk's Pro Skater 2", "gba", "tony2", true]
  ]
};

/* =====================================================
   🎮 FLATTEN
===================================================== */

const games = Object.values(CATALOG)
  .flat()
  .map(([title, core, romKey, isNew]) =>
    createGame(title, core, romKey, isNew)
  );