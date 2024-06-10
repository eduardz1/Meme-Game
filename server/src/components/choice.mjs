import { Caption, Meme } from "./meme.mjs";

class Choice {
  /**
   * Initializes a new Choice object
   * @param {Caption} caption
   * @param {Meme} meme
   */
  constructor(caption, meme) {
    this.caption = caption;
    this.meme = meme;
  }
}

export default Choice;
