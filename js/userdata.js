import { db, doc, setDoc, getDoc } from "./firebase.js";

let currentGame = null;
let gameStartTime = null;


// ============================================
// ===== START TRACKING =======================
// ============================================

export function startTracking(game) {
  currentGame = game;
  gameStartTime = Date.now();
}


// ============================================
// ===== SAVE PLAY TIME =======================
// ============================================

export async function savePlayTime(currentUser) {
  if (!currentUser || !currentGame || !gameStartTime) return;

  const secondsPlayed =
    Math.floor((Date.now() - gameStartTime) / 1000);

  if (secondsPlayed < 5) return;

  const userRef = doc(db, "users", currentUser);
  const snap = await getDoc(userRef);

  let gamesPlayed = {};

  if (snap.exists() && snap.data().playTime) {
    gamesPlayed = snap.data().playTime;
  }

  const gameId = currentGame.title;

  gamesPlayed[gameId] =
    (gamesPlayed[gameId] || 0) + secondsPlayed;

  await setDoc(userRef, {
    playTime: gamesPlayed
  }, { merge: true });

  gameStartTime = Date.now();
}

export function stopTracking() {
  currentGame = null;
  gameStartTime = null;
}


// ============================================
// ===== FORMAT PLAY TIME =====================
// ============================================

export function formatPlayTime(seconds) {

  const hours = Math.floor(seconds / 3600);

  const minutes =
    Math.floor((seconds % 3600) / 60);

  // menos de 1 hora
  if (hours <= 0) {

    // menos de 1 minuto
    if (minutes <= 0) {
      return `${seconds}s`;
    }

    return `${minutes}min`;
  }

  return `${hours}h ${minutes}min`;
}


// ============================================
// ===== RECENT GAMES =========================
// ============================================

export async function saveRecentGame(
  currentUser,
  game
) {

  if (!currentUser || !game) return;

  const userRef = doc(db, "users", currentUser);

  const snap = await getDoc(userRef);

  let recentGames = [];

  if (snap.exists() && snap.data().recentGames) {
    recentGames = snap.data().recentGames;
  }

  // remove duplicata
  recentGames = recentGames.filter(
    title => title !== game.title
  );

  // adiciona no topo
  recentGames.unshift(game.title);

  // limita em 5
  recentGames = recentGames.slice(0, 5);

  await setDoc(userRef, {
    recentGames
  }, { merge: true });
}


// ============================================
// ===== FAVORITES ============================
// ============================================

export async function toggleFavorite(
  currentUser,
  currentUserData,
  gameTitle
) {

  if (!currentUser) return currentUserData;

  if (!currentUserData) {
    currentUserData = {};
  }

  if (!currentUserData.favorites) {
    currentUserData.favorites = [];
  }

  const favorites =
    currentUserData.favorites;

  const alreadyFavorited =
    favorites.includes(gameTitle);

  if (alreadyFavorited) {

    currentUserData.favorites =
      favorites.filter(
        title => title !== gameTitle
      );

  } else {

    favorites.push(gameTitle);
  }

  await setDoc(
    doc(db, "users", currentUser),
    {
      favorites:
        currentUserData.favorites
    },
    { merge: true }
  );

  return currentUserData;
}