import db from "../db/db.mjs";
import dayjs from "dayjs";

class GameDAO {
  async getGames(idUser) {
    // TODO: Coalesce the values if needed
    const getGamesAndRounds = db.prepare(`
      SELECT
        *
      FROM
        Game
        JOIN Round ON Game.id = Round.idGame
        LEFT JOIN Meme ON Round.idMeme = Meme.id
        LEFT JOIN Caption ON Round.idCaption = Caption.id
      WHERE
        idUser = ?
      `);

    const rows = getGamesAndRounds.all(idUser);
    const games = {};

    rows.forEach((row) => {
      if (!games[row.idGame]) {
        games[row.idGame] = {
          id: row.idGame,
          idUser: row.idUser,
          date: row.date,
          rounds: [],
        };
      }
      games[row.idGame].rounds.push({
        id: row.idRound,
        idMeme: row.idMeme,
        tag: row.tag,
        idCaption: row.idCaption,
        caption: row.caption,
        score: row.score,
      });
    });

    return Object.values(games);
  }

  async recordGame(idUser, rounds) {
    const insertGame = db.prepare(
      "INSERT INTO Game (idUser, date) VALUES (?, ?)"
    );

    const gameId = insertGame.run(
      idUser,
      dayjs().toISOString()
    ).lastInsertRowid;

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
