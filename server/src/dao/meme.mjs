import db from "../db/db.mjs";

/**
 * Data access object for the Meme table.
 */
class MemeDAO {
  /**
   * Returns a meme by ID.
   * @param {number} id - Meme ID
   * @returns {Promise<Object>} Meme object
   */
  static async getMeme(id) {
    return db.prepare("SELECT * FROM Meme WHERE id = ?").get(id);
  }

  /**
   * Returns a random meme.
   * @param {number} count - Number of memes to fetch
   * @returns {Promise<Array>} Array of memes
   */
  static async getRandomMemes(count) {
    return db
      .prepare("SELECT * FROM Meme ORDER BY RANDOM() LIMIT ?")
      .all(count);
  }

  /**
   * Returns correct captions for a meme.
   * @param {number} id - Meme ID
   * @param {number} count - Number of captions to fetch
   * @returns {Promise<Array>} Array of captions
   */
  static async getCorrectCaptions(id, count) {
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
        `
      )
      .all(id, count);
  }

  /**
   * Returns incorrect captions for a meme.
   * @param {number} id - Meme ID
   * @param {number} count - Number of captions to fetch
   * @returns {Promise<Array>} Array of captions
   */
  static async getIncorrectCaptions(id, count) {
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
        `
      )
      .all(id, count);
  }
}

export default MemeDAO;
