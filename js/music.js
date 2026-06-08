const bgm = document.getElementById("bgm");

const playlist = [
  {
    title: "Can't Stop Coming",
    artist: "Azazel",
    album: "SNES Station",
    src: "audio/BGM'S/cantstopcoming.mp3",
    artwork: "img/BGM'S COVERS/cantstopcoming.png"
  },

  {
    title: "Forest Maze",
    artist: "Yoko Shimomura",
    album: "Super Mario RPG",
    src: "audio/BGM'S/forestmaze.mp3",
    artwork: "img/BGM'S COVERS/forestmaze.png"
  },

  {
    title: "Aquatic Ambiance",
    artist: "David Wise",
    album: "Donkey Kong Country",
    src: "audio/BGM'S/aquaticambiance.mp3",
    artwork: "img/BGM'S COVERS/aquaticambiance.png"
  },

  {
    title: "Corridors of Time",
    artist: "Yasunori Mitsuda",
    album: "Chrono Trigger",
    src: "audio/BGM'S/corridorsoftime.mp3",
    artwork: "img/BGM'S COVERS/corridorsoftime.png"
  },

  {
    title: "Dire, Dire Docks",
    artist: "Koji Kondo",
    album: "Super Mario 64",
    src: "audio/BGM'S/dirediredocks.mp3",
    artwork: "img/BGM'S COVERS/dirediredocks.png"
  },

  {
    title: "File Select",
    artist: "Koji Kondo",
    album: "Super Mario 64",
    src: "audio/BGM'S/fileselect.mp3",
    artwork: "img/BGM'S COVERS/fileselect.png"
  },

  {
    title: "Forest Interlude",
    artist: "David Wise",
    album: "Donkey Kong Country 2",
    src: "audio/BGM'S/forestinterlude.mp3",
    artwork: "img/BGM'S COVERS/forestinterlude.png"
  },

  {
    title: "Ice Cap Zone",
    artist: "Brad Buxer",
    album: "Sonic 3 & Knuckles",
    src: "audio/BGM'S/icecapzone.mp3",
    artwork: "img/BGM'S COVERS/icecapzone.png"
  },

  {
    title: "Stickerbush Symphony",
    artist: "David Wise",
    album: "Donkey Kong Country 2",
    src: "audio/BGM'S/stickerbush.mp3",
    artwork: "img/BGM'S COVERS/stickerbush.png"
  },

  {
    title: "Wii Shop",
    artist: "Kazumi Totaka",
    album: "Wii Shop Channel",
    src: "audio/BGM'S/wiishop.mp3",
    artwork: "img/BGM'S COVERS/wiishop.png"
  }
];

let currentTrack = 0;

// ========================
// LOAD TRACK
// ========================

function loadTrack(index) {
  const track = playlist[index];

  bgm.src = track.src;
  bgm.load();

  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.artist,
      album: track.album,
      artwork: [
        {
          src: track.artwork,
          sizes: "512x512",
          type: "image/png"
        }
      ]
    });
  }
}

// ========================
// NEXT TRACK
// ========================

function nextTrack() {

  // primeira música acabou
  if (currentTrack === 0) {

    currentTrack =
      Math.floor(Math.random() * (playlist.length - 1)) + 1;

  } else {

    let next;

    do {
      next =
        Math.floor(Math.random() * (playlist.length - 1)) + 1;
    }
    while (
      playlist.length > 2 &&
      next === currentTrack
    );

    currentTrack = next;
  }

  bgm.volume = 0;

  loadTrack(currentTrack);

  bgm.play();

  let vol = 0;

  const fade = setInterval(() => {

    vol += 0.05;

    bgm.volume = Math.min(vol, 0.4);

    if (vol >= 0.4) {
      clearInterval(fade);
    }

  }, 100);
}

// ========================
// PREVIOUS TRACK
// ========================

function previousTrack() {
  currentTrack--;

  if (currentTrack < 0) {
    currentTrack = playlist.length - 1;
  }

  loadTrack(currentTrack);
  bgm.play();
}

// ========================
// AUTO NEXT
// ========================

bgm.addEventListener("ended", nextTrack);

// ========================
// MEDIA SESSION
// ========================

if ("mediaSession" in navigator) {

  navigator.mediaSession.setActionHandler("play", () => {
    bgm.play();
  });

  navigator.mediaSession.setActionHandler("pause", () => {
    bgm.pause();
  });

  navigator.mediaSession.setActionHandler(
    "nexttrack",
    nextTrack
  );

  navigator.mediaSession.setActionHandler(
    "previoustrack",
    previousTrack
  );
}

// ========================
// INITIAL TRACK
// ========================

loadTrack(0);