import db from "../db/db.mjs";

class GameDAO {
  async getGame(id) {
    return db.prepare("SELECT * FROM Game WHERE id = ?").get(id);
  }

  async saveGame(userId, rounds) {
    const insertGame = db.prepare("INSERT INTO Game (idUser) VALUES (?)");

    const gameId = insertGame.run(userId).lastInsertRowid;

    const insertRound = db.prepare(
      "INSERT INTO Round (idGame, idMeme, idCaption, score) VALUES (?, ?, ?, ?)"
    );

    db.transaction(() => {
      for (const round of rounds) {
        insertRound.run(gameId, round.idMeme, round.idCaption, round.score);
      }
    })();

    return gameId;
  }
}

export default GameDAO;
