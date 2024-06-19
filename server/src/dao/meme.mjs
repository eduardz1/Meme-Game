import db from "../db/db.mjs";

class MemeDAO {
  async getMeme(id) {
    return db.prepare("SELECT * FROM Meme WHERE id = ?").get(id);
  }

  async getRandomMemes(count) {
    return db
      .prepare("SELECT * FROM Meme ORDER BY RANDOM() LIMIT ?")
      .all(count);
  }

  async getCorrectCaptions(id, count) {
    return db
      .prepare(
        `
        SELECT
          Caption.id AS id,
          caption
        FROM
          CorrectCaption
          JOIN Caption ON CorrectCaption.idCaption = Caption.id
        WHERE
          idMeme = ?
        ORDER BY
          RANDOM()
        LIMIT
          ?
        `,
      )
      .all(id, count);
  }

  async getIncorrectCaptions(id, count) {
    return db
      .prepare(
        `
        SELECT
          Caption.id AS id,
          caption
        FROM
          CorrectCaption
          JOIN Caption ON CorrectCaption.idCaption = Caption.id
        WHERE
          idMeme <> ?
        ORDER BY
          RANDOM()
        LIMIT
          ?
        `,
      )
      .all(id, count);
  }
}

export default MemeDAO;
