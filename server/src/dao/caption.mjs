import db from "../db/db.mjs";
import { config } from "../../config.mjs";

/**
 * Data access object for captions.
 */
class CaptionDAO {
  /**
   * Returns a random mix of correct and incorrect captions for a meme.
   * @param {number} idMeme - Meme ID
   * @returns {Object[]} Array of captions
   */
  static getRandomCaptionsForMeme(idMeme) {
    const sql = `
      SELECT
          *
      FROM
          (
              SELECT
                  *
              FROM
                  (
                      SELECT
                          Caption.id,
                          caption
                      FROM
                          CorrectCaption
                          JOIN Caption ON CorrectCaption.idCaption = Caption.id
                      WHERE
                          idMeme = @idMeme
                      ORDER BY
                          RANDOM()
                      LIMIT
                          @numCorrectCaptions
                  )
              UNION
              SELECT
                  *
              FROM
                  (
                      SELECT
                          Caption.id,
                          caption
                      FROM
                          Caption
                          LEFT JOIN CorrectCaption ON CorrectCaption.idCaption = Caption.id
                      WHERE
                          idMeme <> @idMeme
                      ORDER BY
                          RANDOM()
                      LIMIT
                          @numIncorrectCaptions
                  )
          )
      ORDER BY
          RANDOM();`;

    return db.prepare(sql).all({
      idMeme: idMeme,
      numCorrectCaptions: config.numCorrectMemes,
      numIncorrectCaptions: config.numIncorrectMemes,
    });
  }

  /**
   * Validates whether a caption is correct for a meme.
   * @param {number} idMeme - Meme ID
   * @param {number} id - Caption ID
   * @returns {boolean} True if the caption is correct, false otherwise
   */
  static validateCaption(id, idMeme) {
    return !!db
      .prepare(
        `
        SELECT
            COUNT(*) AS count
        FROM
            CorrectCaption
        WHERE
            idMeme = ? AND idCaption = ?
        `,
      )
      .get(idMeme, id).count;
  }
}

export default CaptionDAO;
