const SERVER_URL = "http://localhost:3001/api";

function handleErrors(response) {
  let errorMessage = "";

  if (response.error) errorMessage += `${response.error}`;
  if (response.message) errorMessage += `${response.message}`;
  if (response.statusText) errorMessage += `${response.statusText}`;
  if (response.errors && Array.isArray(response.errors)) {
    const errorDetails = response.errors
      .map((err) => `${err.msg} (Field: ${err.path}, Value: ${err.value})`)
      .join(",");
    errorMessage += ` | Errors: ${errorDetails}`;
  }

  throw Error(errorMessage || "Something went wrong");
}

/** --------------------------- Access APIs --------------------------------- */

async function login(email, password) {
  const response = await fetch(`${SERVER_URL}/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) return response.json();

  handleErrors(await response.json());
}

async function logout() {
  const response = await fetch(`${SERVER_URL}/sessions/current`, {
    method: "DELETE",
    credentials: "include",
  });

  if (response.ok) return response;

  handleErrors(await response.json());
}

async function getUserInfo() {
  const response = await fetch(`${SERVER_URL}/sessions/current`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    credentials: "include",
  });

  if (response.ok) return response.json();

  handleErrors(await response.json());
}

/** ---------------------------- Game APIs ---------------------------------- */

async function recordGame(rounds) {
  const response = await fetch(`${SERVER_URL}/games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ rounds }),
  });

  if (response.ok) return response.json();

  handleErrors(await response.json());
}

async function getGames({ limit, offset }) {
  const response = await fetch(
    `${SERVER_URL}/games?${new URLSearchParams({
      limit,
      offset,
    })}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    },
  );

  if (response.ok) return response.json();

  handleErrors(await response.json());
}

/** ---------------------------- Meme APIs ---------------------------------- */

async function getRandomMemes(count) {
  const response = await fetch(`${SERVER_URL}/memes/random?count=${count}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (response.ok) return response.json();

  handleErrors(await response.json());
}

/** -------------------------- Caption APIs --------------------------------- */

async function getRandomCaptionsForMeme(idMeme) {
  const response = await fetch(
    `${SERVER_URL}/captions/random?idMeme=${idMeme}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (response.ok) return response.json();

  handleErrors(await response.json());
}

async function validateCaption(id, idMeme) {
  const response = await fetch(`${SERVER_URL}/captions/${id}/${idMeme}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (response.ok) return response.json();

  handleErrors(await response.json());
}

const API = {
  login,
  logout,
  getUserInfo,
  recordGame,
  getGames,
  getRandomMemes,
  getRandomCaptionsForMeme,
  validateCaption,
};

export default API;
