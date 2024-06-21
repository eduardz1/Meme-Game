import crypto from "crypto";
import db from "../db/db.mjs";
import { Buffer } from "buffer";

/**
 * Data access object for the User table.
 */
class UserDAO {
  /**
   * Creates a new user.
   * @param {string} email - User email
   * @param {string} password - User password
   * @return {Promise<Object>} User object
   */
  static getUser(email, password) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM User WHERE email = ?";

      const row = db.prepare(sql).get(email);

      if (!row) resolve(null);

      crypto.scrypt(password, row.salt, 32, (err, hashedPassword) => {
        if (err) reject(err);

        if (
          !crypto.timingSafeEqual(Buffer.from(row.hash, "hex"), hashedPassword)
        )
          return resolve(null);

        resolve({
          id: row.id,
          email: row.email,
          name: row.name,
          surname: row.surname,
          totalScore: row.totalScore,
        });
      });
    });
  }

  /**
   * Returns the totalScore of a user.
   * @param {number} idUser - User ID
   * @returns {number} Total score
   */
  static getTotalScore(idUser) {
    return db.prepare("SELECT totalScore FROM User WHERE id = ?").get(idUser)
      .totalScore;
  }
}

export default UserDAO;
