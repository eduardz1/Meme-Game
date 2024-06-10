import db from "../db/db.mjs";
import Choice from "../components/choice.mjs";

class ChoiceDAO {
  static getChoices() {
    const choices = db.prepare("SELECT * FROM Choice").all();

    choices.map((choice) => {
      const caption = db
        .prepare("SELECT * FROM Caption WHERE id = ?")
        .get(choice.idCaption);
      const meme = db
        .prepare("SELECT * FROM Meme WHERE id = ?")
        .get(choice.idMeme);

      return new Choice(caption, meme);
    });

    return choices;
  }
}

export default ChoiceDAO;
