import { Buffer } from "buffer";
import crypto from "crypto";
import db from "../db/db.mjs";

/**
 * Data access object for the User table.
 */
class UserDAO {
  /**
   * Creates a new user.
   * @param {string} email - User email
   * @param {string} password - User password
   * @return {Object | false} User object or false
   */
  static getUser(email, password) {
    const row = db.prepare("SELECT * FROM User WHERE email = ?").get(email);
    if (!row) return false;

    const hashedPassword = crypto.scryptSync(password, row.salt, 32);
    const passwordHex = Buffer.from(row.hash, "hex");

    return crypto.timingSafeEqual(passwordHex, hashedPassword) ? row : false;
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
