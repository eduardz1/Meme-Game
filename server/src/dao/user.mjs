import crypto from "crypto";
import db from "../db/db.mjs";
import { Buffer } from "buffer";

class UserDAO {
  async getUser(email, password) {
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
        });
      });
    });
  }
}

export default UserDAO;
