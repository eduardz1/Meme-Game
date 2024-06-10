import Database from "better-sqlite3";

const db = new Database("meme-game.db", { verbose: console.log });

export default db;
