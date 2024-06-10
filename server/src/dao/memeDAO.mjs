import db from "../db/db.mjs";
import Meme from "../components/meme.mjs";

class MemeDAO {
  static getMemes() {
    const memes = db.prepare("SELECT * FROM Meme").all();

    memes.map((meme) => {
      const captions = db
        .prepare("SELECT * FROM Caption WHERE idMeme = ?")
        .all(meme.id);

      return new Meme(meme.path, captions);
    });
  }
}

export default MemeDAO;
