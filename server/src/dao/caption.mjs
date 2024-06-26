import db from "../db/db.mjs";

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
        WITH CorrectCaptions AS (
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
        ), IncorrectCaptions AS (
            SELECT
                id,
                caption
            FROM
                Caption
            WHERE
                id NOT IN (
                    SELECT
                        idCaption
                    FROM
                        CorrectCaption
                    WHERE
                        idMeme = @idMeme
                )
            ORDER BY
                RANDOM()
            LIMIT
                @numIncorrectCaptions
        )
        SELECT
            *
        FROM
            (
                SELECT
                    *
                FROM
                    CorrectCaptions
                UNION
                ALL
                SELECT
                    *
                FROM
                    IncorrectCaptions
            )
        ORDER BY
            RANDOM();`;

    return db.prepare(sql).all({
      idMeme: idMeme,
      numCorrectCaptions: process.env.NUM_CORRECT_CAPTIONS,
      numIncorrectCaptions: process.env.NUM_INCORRECT_CAPTIONS,
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
