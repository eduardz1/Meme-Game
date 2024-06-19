import db from "../db/db.mjs";

class MemeDAO {
  getMeme(id) {
    return db.prepare("SELECT * FROM Meme WHERE id = ?").get(id);
  }

  getRandomMemes(count) {
    return db
      .prepare("SELECT * FROM Meme ORDER BY RANDOM() LIMIT ?")
      .all(count);
  }

  getCorrectCaptions(id, count) {
    return db
      .prepare(
        "SELECT * FROM CorrectCaption WHERE idMeme = ? ORDER BY RANDOM() LIMIT ?"
      )
      .all(id, count);
  }

  getIncorrectCaptions(id, count) {
    return db
      .prepare(
        "SELECT * FROM CorrectCaption WHERE idMeme <> ? ORDER BY RANDOM() LIMIT ?"
      )
      .all(id, count);
  }
}

export default MemeDAO;
