import Database from "better-sqlite3";

// eslint-disable-next-line no-console
const db = new Database("./src/db/meme-game.sqlite", { verbose: console.log });
db.pragma("foreign_keys = ON");
db.pragma("journal_mode = WAL");

export default db;
