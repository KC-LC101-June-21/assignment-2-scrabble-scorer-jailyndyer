// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = 
{
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const simplePointsStructure = 
{
  1: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 
      'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  0: [' ']
};

const vowelPointsStructure = 
{
  3: ['A', 'E', 'I', 'O', 'U'],
  1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z']
  0: [' ']
};

const newPointStructure = transform(oldPointStructure);

let algorithmA = {
  'name':'Simple Score',
  'description':'Each letter is worth 1 point.',
  'scorerFunction':function simpleScore(word) {
                    word = word.toUpperCase();
                    let score = 0;
                    for (i = 0; i < word.length; i++) {
                      score += 1;
                    }
                    return score;
                  }
}

let algorithmB = {
  'name':'Bonus Vowels',
  'description':'Vowels are 3 pts, consonants are 1 pt.',
  'scorerFunction':function vowelBonusScore(word) {
	                  word = word.toUpperCase();
	                  let score = 0;
	                  for (let i = 0; i < word.length; i++) {
	                    for (const pointValue in vowelPointsStructure) {
		                    if (vowelPointsStructure[pointValue].includes(word[i])) {
                          score += Number(pointValue);
		                    }
	                    }
	                  }
                    return score;
                  } 
}

let algorithmC = {
  'name':'Scrabble',
  'description':'	The traditional scoring algorithm.',
  'scorerFunction':function oldScrabbleScorer(word) {
	                  word = word.toUpperCase();
	                  let score = 0;
	                  for (let i = 0; i < word.length; i++) {
	                    for (const pointValue in oldPointStructure) {
		                    if (oldPointStructure[pointValue].includes(word[i])) {
			                    score += pointValue;
		                    }
	                     }
                  	}
                    return score;
                  }
}

let algorithmD = {
  'name':'Scrabble',
  'description':'	The traditional scoring algorithm.',
  'scorerFunction':function newScrabbleScorer(word) {
                    word = word.toLowerCase();
	                  let score = 0;
	                  for (let i = 0; i < word.length; i++) {
		                  score += newPointStructure[word[i]];
                  	}
                    return score;
                  }
}

const scoringAlgorithms = [algorithmA, algorithmB, /*algorithmC*/ algorithmD];

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) 
     {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
		 }
 
	  }
	}
	
  return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function simpleScore(word)
{
  word = word.toUpperCase();
  let letterPoints = "";

  for (i = 0; i < word.length; i++)
  {
    letterPoints += `Points for '${word[i]}': 1\n`;
  }
  
  return letterPoints;
}

function vowelBonusScore(word)
{
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in vowelPointsStructure) {
 
		 if (vowelPointsStructure[pointValue].includes(word[i])) 
     {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
		 }
 
	  }
	}

  return letterPoints;
}

function scrabbleScore(word)
{
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in newPointStructure) {
 
		 if (newPointStructure[pointValue].includes(word[i])) 
     {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
		 }
 
	  }
	}
	
  return letterPoints;
}

function initialPrompt() 
{
  let letterCount = 0;
  let response = "";
  
  console.log("Let's play some scrabble!\n")
  response = input.question("Enter a word: ");

  while (letterCount != response.length)
  {
    for (i = 0; i < response.length; i++)
    {
      if (response[i].toLowerCase() in newPointStructure)
      {
        letterCount += 1
      }
    }

    if (letterCount != response.length)
    {
      console.log("A word must only have letters or spaces.\n")
      response = input.question("Enter a word: ");
      letterCount = 0;
    }
    else
    {
      return response;
    }
  }
}

function scorerPrompt() 
{
  let notDone = true;
  console.log("Which scoring algorithm would you like to use?\n");
  console.log("0 - Simple: One point per character");
  console.log("1 - Vowel Bonus: Vowels are worth 3 points");
  console.log("2 - Scrabble: Uses scrabble point system");
  let selectedAlgorithm = input.question("Enter 0, 1, or 2: "); 

  while (notDone !== false)
  {
    if (Number(selectedAlgorithm) === 0 || Number(selectedAlgorithm) === 1 || Number(selectedAlgorithm) ===2)
    {
      notDone = false;
      return scoringAlgorithms[selectedAlgorithm];
    }
    else
    {
      console.log("Which scoring algorithm would you like to use?\n");
      console.log("0 - Simple: One point per character");
      console.log("1 - Vowel Bonus: Vowels are worth 3 points");
      console.log("2 - Scrabble: Uses scrabble point system");
      selectedAlgorithm = input.question("Enter 0, 1, or 2: ");
    }
  }
}

function transform(object) 
{
  let transformedPointStructure = {};
  let objectArray = [];

  for (i = 1; i < 11 ; i++)
    {
      if (object[i] !== undefined)
      {
        objectArray = object[i];
        for (j = 0; j < objectArray.length; j++)
        {
          let key = objectArray[j].toLowerCase();
          let value = i;
    
          transformedPointStructure[key] = value;      
        }
      }
    objectArray = [];
    }
  transformedPointStructure[" "] = 0;
  return transformedPointStructure;
};

function runProgram() 
{
  // Section A
  // console.log(oldScrabbleScorer(initialPrompt()));
  // console.log(simpleScore(initialPrompt()));
  // console.log(vowelBonusScore(initialPrompt()));

  // Section B - comment out algorithmD in scoringAlgorithms and uncomment algorithmC
  // let word = initialPrompt();
  // let selectedAlgorithm = scorerPrompt();
  // console.log(`Score for '${word}': ${selectedAlgorithm.scorerFunction(word)}`);

  // Section C - comment out algorithmD in scoringAlgorithms and uncomment algorithmC
  let word = initialPrompt();
  let selectedAlgorithm = scorerPrompt();
  console.log(`Score for '${word}': ${selectedAlgorithm.scorerFunction(word)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};