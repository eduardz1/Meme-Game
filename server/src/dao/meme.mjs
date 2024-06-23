import db from "../db/db.mjs";

/**
 * Data access object for the Meme table.
 */
class MemeDAO {
  /**
   * Returns a random meme.
   * @param {number} count - Number of memes to fetch
   * @returns {Object[]} Array of memes
   */
  static getRandomMemes(count) {
    return db
      .prepare("SELECT * FROM Meme ORDER BY RANDOM() LIMIT ?")
      .all(count);
  }
}

export default MemeDAO;
