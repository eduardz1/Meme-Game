import db from "../db/db.mjs";
import Choice from "../components/choice.mjs";

class ChoiceDAO {
  static getChoices() {
    const sql = `
      SELECT *
      FROM
        Choice
        JOIN Caption ON Choice.idCaption = Caption.id
        JOIN Meme ON Choice.idMeme = Meme.id
        JOIN Round ON Choice.idRound = Round.id;`;

    const choices = db.prepare(sql).all();

    return choices.map((choice) => {
      return new Choice(choice.id, choice.path, choice.text);
    });
  }
}

export default ChoiceDAO;
