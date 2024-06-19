import db from "../db/db.mjs";

class GameDAO {
  async getGame(id) {
    return db.prepare("SELECT * FROM Game WHERE id = ?").get(id);
  }

  async saveGame(userId, rounds) {
    const insertGame = db.prepare("INSERT INTO Game (idUser) VALUES (?)");

    const gameId = insertGame.run(userId).lastInsertRowid;

    const inserRound = db.prepare(
      "INSERT INTO Round (idGame, idMeme, idCaption, score) VALUES (?, ?, ?, ?)",
    );

    return db.transaction(() => {
      for (const round of rounds) {
        inserRound.run(gameId, round.idMeme, round.idCaption, round.score);
      }
    })();
  }
}

export default GameDAO;
