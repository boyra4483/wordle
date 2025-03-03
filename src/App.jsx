import classes from "./App.module.css";
import Keyboard from "./components/Keyboard/Keyboard.jsx";
import Board from "./components/Board/Board.jsx";
import Button from "./components/Button/Button.jsx";
import { useState } from "react";
import randomWords from "./services/randomWords.js";

export default function App() {
  const [attemptList, setAttemptList] = useState([
    {
      word: "",
      key: "",
      colors: ["#939B9F", "#939B9F", "#939B9F", "#939B9F", "#939B9F"],
      isAttempted: false,
    },
  ]);
  const attempt = getCurrentAttempt(attemptList);

  async function handleKeyDown(e) {
    const key = e.key;

    if (attemptList.at(-1).isAttempted) return;
    if (!inRange(key)) return;

    if (key == "Enter" && attemptList.at(-1).word.length < 5) return;
    if (key == "Backspace" && attemptList.at(-1).word.length == 0) return;

    if (key == "Enter") {
      const colors = await getResult(attemptList.at(-1).word.toLowerCase());

      const nextAttempt = {
        word: "",
        key: "",
        colors: ["#939B9F", "#939B9F", "#939B9F", "#939B9F", "#939B9F"],
        isAttempted: false,
      };
      const nextAttemptList = attemptList.map((attempt) => {
        return attempt == attemptList.at(-1)
          ? {
              ...attempt,
              isAttempted: true,
              colors,
            }
          : attempt;
      });

      attemptList.length == 5 ? null : nextAttemptList.push(nextAttempt);
      return setAttemptList(nextAttemptList);
    }
    if (key == "Backspace") {
      const nextAttemptList = attemptList.map((attempt) => {
        return attempt == attemptList.at(-1)
          ? {
              ...attempt,
              word: attempt.word.slice(0, -1),
              key: key.toLowerCase(),
            }
          : attempt;
      });
      return setAttemptList(nextAttemptList);
    }

    if ((attemptList.at(-1).word + key).length > 5) return;
    const nextAttemptList = attemptList.map((attempt) => {
      return attempt == attemptList.at(-1)
        ? {
            ...attempt,
            word: (attempt.word + key).toUpperCase(),
            key: key.toLowerCase(),
          }
        : attempt;
    });

    setAttemptList(nextAttemptList);
  }

  function handleKeyUp() {
    const nextAttemptList = attemptList.map((attempt) => {
      return attempt == attemptList.at(-1)
        ? {
            ...attempt,
            key: null,
          }
        : attempt;
    });
    setAttemptList(nextAttemptList);
  }

  return (
    <section
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      className={classes["app"]}
    >
      <Board buttons={getBoardButtons(attemptList)} />
      <Keyboard buttons={getKeyboardButtons(attempt.key)} />
    </section>
  );
}

function getBoardButtons(attempts) {
  const buttons = [];

  for (let i = 0; i < 5; i++) {
    const attempt = attempts[i];

    for (let j = 0; j < 5; j++) {
      const letter = attempt?.word[j];

      buttons.push(
        <Button
          key={`${i + 1}.${j}`}
          size={{
            width: "75px",
            height: "75px",
          }}
          color={attempt ? attempt.colors[j] : "#939B9F"}
          content={letter ? letter : null}
        />
      );
    }
  }

  return buttons;
}

function getKeyboardButtons(key) {
  const keys = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "ENTER",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "/src/assets/icons/delete.svg",
  ];

  const buttons = keys.map((letter, id) => {
    if (letter.startsWith("/src")) {
      return (
        <Button
          color={"backspace" == key ? "#c2c2c2" : "#d3d6da"}
          key={id}
          source={letter}
        />
      );
    }
    return (
      <Button
        color={
          letter.toLowerCase() == key?.toLowerCase() ? "#c2c2c2" : "#d3d6da"
        }
        key={id}
        content={letter}
      />
    );
  });

  return buttons;
}

async function getResult(attempt) {
  const guessWords = await randomWords();
  const result = [];

  for (let i = 0; i < attempt.length; i++) {
    if (guessWords[0][i] == attempt[i]) {
      result.push("#008000");
      continue;
    }

    if (guessWords[0].includes(attempt[i])) {
      result.push("#FFFF00");
      continue;
    }

    result.push("#000");
  }

  guessWords.splice(0, 1);
  return result;
}

function inRange(key) {
  const keys = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "ENTER",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "BACKSPACE",
  ];
  return keys.includes(key.toUpperCase());
}

function getCurrentAttempt(attempts) {
  if (attempts.length == 1 || attempts.length == 5) {
    return attempts.at(-1);
  } else {
    return attempts.at(-2);
  }
}
