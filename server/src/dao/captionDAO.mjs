import db from "../db/db";

class CaptionDAO {
  static getCaptions() {
    return db.prepare("SELECT * FROM Caption").all();
  }
}

export default CaptionDAO;
