var Letter = require("./Letter");

// The Word constructor is responsible for creating an array of Letter objects and determining if the user guessed every Letter correctly
function Word(word) {
  // word.split - splits word into array of letters
  //     .map - instantiate a new `Letter` for each character and return an array
  //            referred to with the instance variable, `letters`
  this.letters = word.split("").map(function(char) {
    return new Letter(char);
  });
  
  this.getSolution = function() {
    return this.letters
      .map(function(letter) {
        // iterate over each letter
        return letter.getSolution(); // return the solution for each to form an array of solved letters
      })
      .join(""); // create a string from the array of solved letters
  };

  this.toString = function() {
    return this.letters.join(" "); // see Letter.prototype.toString in Letter.js
  };

  this.guessLetter = function(char) {
    // Checks to see if any of the letters in the array match the user's guess and updates `foundLetter`
    var foundLetter = false;
    this.letters.forEach(function(letter) {
      if (letter.guess(char)) {
        foundLetter = true;
      }
    });

    console.log("\n" + this + "\n");
    // return whether we found a letter
    return foundLetter;
  };

  this.guessedCorrectly = function() {
    // The `every` method returns true if the callback function returns true for every element in the array
    return this.letters.every(function(letter) {
      return letter.visible;
    });
  };
}




// Returns true if all letters in the word have been guessed
Word.prototype.guessedCorrectly = function() {
  // The `every` method returns true if the callback function returns true for every element in the array
  return this.letters.every(function(letter) {
    return letter.visible;
  });
};

module.exports = Word;
