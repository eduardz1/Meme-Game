const SERVER_URL = "http://localhost:3001/api";

function handleErrors(response) {
  if (response.error) throw Error(response.error);
  if (response.message) throw Error(response.message);
  throw Error("Something went wrong");
}

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

  handleErrors(response);
}

async function logout() {
  const response = await fetch(`${SERVER_URL}/sessions/current`, {
    method: "DELETE",
    credentials: "include",
  });

  if (response.ok) return response.json();

  handleErrors(response);
}

async function getUserInfo() {
  const response = await fetch(`${SERVER_URL}/sessions/current`, {
    method: "GET",
    credentials: "include",
  });

  if (response.ok) return response.json();

  handleErrors(response);
}

/** ---------------------------- Game APIs ---------------------------------- */

async function recordGame(rounds) {
  const response = await fetch(`${SERVER_URL}/games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ rounds }),
  });

  if (response.ok) return response.json();

  handleErrors(response);
}

async function getGames({ limit, offset }) {
  const response = await fetch(
    `${SERVER_URL}/games?${new URLSearchParams({
      limit,
      offset,
    })}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (response.ok) return response.json();

  handleErrors(response);
}

/** ---------------------------- Meme APIs ---------------------------------- */

async function getRandomMemes(count) {
  const response = await fetch(`${SERVER_URL}/memes/random?count=${count}`, {
    method: "GET",
  });

  if (response.ok) return response.json();

  handleErrors(response);
}

async function getCorrectCaptions(id, count) {
  const response = await fetch(
    `${SERVER_URL}/memes/${id}/captions/correct?count=${count}`,
    {
      method: "GET",
    }
  );

  if (response.ok) return response.json();

  handleErrors(response);
}

async function getIncorrectCaptions(id, count) {
  const response = await fetch(
    `${SERVER_URL}/memes/${id}/captions/incorrect?count=${count}`,
    {
      method: "GET",
    }
  );

  if (response.ok) return response.json();

  handleErrors(response);
}

const API = {
  login,
  logout,
  getUserInfo,
  recordGame,
  getGames,
  getRandomMemes,
  getCorrectCaptions,
  getIncorrectCaptions,
};

export default API;
