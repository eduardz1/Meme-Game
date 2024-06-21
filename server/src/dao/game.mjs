import db from "../db/db.mjs";
import dayjs from "dayjs";

/**
 * Data access object for the Game table.
 */
class GameDAO {
  /**
   * Returns all games for a user, including corresponding rounds and memes.
   * @param {number} idUser - User ID
   * @param {number} limit - Maximum number of games to return
   * @param {number} offset - Number of games to skip
   * @returns {Promise<Array>} Array of games, ordered by date descending
   */
  static getGames(idUser, limit, offset) {
    let selectedGames = `
      SELECT
        *
      FROM
        Game
      WHERE
        idUser = ?
      ORDER BY
        date DESC`;

    if (limit) {
      selectedGames += ` LIMIT ${limit}`;
    }

    if (offset) {
      selectedGames += ` OFFSET ${offset}`;
    }

    let sql = `
      SELECT
        *
      FROM
        (
          ${selectedGames}
        ) AS Game
        JOIN Round ON Game.id = Round.idGame
        LEFT JOIN Meme ON Round.idMeme = Meme.id
        LEFT JOIN Caption ON Round.idCaption = Caption.id`;

    console.log(sql);

    const getGamesAndRounds = db.prepare(sql);

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

  /**
   * Records a new game.
   * @param {number} idUser - User ID
   * @param {Array} rounds - Array of rounds
   * @returns {Promise<number>} Game ID of the newly recorded game
   */
  static recordGame(idUser, rounds) {
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
