import { useCallback, useEffect, useState } from "react";

import './App.css';

//components
import StartScreen from "./components/StartScreen";
import Game from './components/GameScreen';
import GameOver from "./components/GameOver";

//database
import { wordsList } from "./data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name); //start
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");

  const [letters, setLetters] = useState([]);
  
  const [guessedLetters, setGuessedLetters] = useState([]); //many 
  const [wrongLetters, setWrongLetters] = useState([]); //many 
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  console.log(words);

  const pickWordAndCategory = useCallback(() => {
    //generate random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //generate random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    return { category, word };
  }, [words])
  

  const startGame = useCallback(() => {
    clearLettersStates();

    const { category, word } = pickWordAndCategory();

    let wordLetters = word.split(""); //divide
    //
    wordLetters = wordLetters.map((l) => l.toLowerCase()); 

    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory])


  //verify if letter has been utilized
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    //add correct letter or remove chance
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };
  console.log(wrongLetters);


//restart game
  const retry = () => {
    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name);
  };

  const clearLettersStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  //if guesses end
  useEffect(() => {
    if (guesses === 0) {
      //game over 
      clearLettersStates();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  //victory condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    console.log(uniqueLetters);
    console.log(guessedLetters);

    if (guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      //add score
      setScore((actualScore) => (actualScore += 100));
      // restart game with new word
      startGame();
    }
  }, [guessedLetters, letters, startGame]);


  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
