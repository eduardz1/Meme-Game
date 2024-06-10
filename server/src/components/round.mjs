import Choice from "./choice.mjs";

class Round {
  /**
   * Initializes a new Round object
   * @param {string} user
   * @param {number} score
   * @param {Choice[]} choices
   */
  constructor(user, score, choices) {
    this.user = user;
    this.score = score;
    this.choices = choices;
  }
}

export default Round;
