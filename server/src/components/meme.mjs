import Caption from "./caption.mjs";

class Meme {
  /**
   * Initializes a new Meme object
   * @param {string} image path to the image
   * @param {Caption[]} correctCaptions array of correct captions
   */
  constructor(image, correctCaptions) {
    this.image = image;
    this.correctCaptions = correctCaptions;
  }
}

export default Meme;
