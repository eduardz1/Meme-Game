const SERVER_URL = "http://localhost:3001/api";

/** --------------------------- Access APIs --------------------------------- */

async function login(email, password) {
  const response = await fetch(`${SERVER_URL}/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) return response.json();

  throw response.text();
}

async function logout() {
  await fetch(`${SERVER_URL}/sessions`, {
    method: "DELETE",
    credentials: "include",
  });
}

async function getUserInfo() {
  const response = await fetch(`${SERVER_URL}/sessions/current`, {
    method: "GET",
    credentials: "include",
  });

  if (response.ok) return response.json();

  throw response.text();
}

/** ---------------------------- Game APIs ---------------------------------- */

async function play() {
  const response = await fetch(`${SERVER_URL}/games`, {
    method: "POST",
    credentials: "include",
  });

  if (response.ok) return response.json();

  throw response.text();
}

/** ---------------------------- Meme APIs ---------------------------------- */

async function getMeme(memeId) {
  const response = await fetch(`${SERVER_URL}/memes/${memeId}`, {
    method: "GET",
  });

  if (response.ok) return response.json();

  throw response.text();
}

async function getRandomMemes(count) {
  const response = await fetch(`${SERVER_URL}/memes/random/${count}`, {
    method: "GET",
  });

  if (response.ok) return response.json();

  throw response.text();
}

async function getCorrectCaptions(memeId, count) {
  const response = await fetch(
    `${SERVER_URL}/memes/${memeId}/captions/correct/${count}`,
    {
      method: "GET",
    }
  );

  if (response.ok) return response.json();

  throw response.text();
}

async function getIncorrectCaptions(memeId, count) {
  const response = await fetch(
    `${SERVER_URL}/memes/${memeId}/captions/incorrect/${count}`,
    {
      method: "GET",
    }
  );

  if (response.ok) return response.json();

  throw response.text();
}

const API = {
  login,
  logout,
  getUserInfo,
  play,
  getMeme,
  getRandomMemes,
  getCorrectCaptions,
  getIncorrectCaptions,
};

export default API;
