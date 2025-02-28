import classes from "./App.module.css";
import Keyboard from "./components/Keyboard/Keyboard.jsx";
import Board from "./components/Board/Board.jsx";
import Button from "./components/Button/Button.jsx";
import { useState } from "react";

export default function App() {
  const [attemptList, setAttemptList] = useState([
    {
      word: "",
      key: "",
      isAttempted: false,
    },
  ]);
  const attempt = getCurrentAttempt(attemptList);

  function handleKeyDown(e) {
    const key = e.key;

    if (attemptList.length > 5) return;
    if (attempt.isAttempted) return;
    if (!inRange(key)) return;
    if (key == "Enter" && attempt.word.length < 5) return;
    if (key == "Backspace" && attempt.word.length == 0) return;

    if (key == "Enter") {
      const nextAttempt = {
        word: "",
        key: "",
        isAttempted: false,
      };
      const nextAttemptList = attemptList.map((attempt) => {
        return attempt == attemptList.at(-1)
          ? {
              ...attempt,
              isAttempted: true,
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
    if ((attempt.word + key).length > 5) return;

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
      <Board buttons={getBoardButtons(attemptList, attempt.isAttempted)} />
      <Keyboard buttons={getKeyboardButtons(attempt.key)} />
    </section>
  );
}

function getBoardButtons(attempts, isAttempted) {
  const buttons = [];
  const attempt = getCurrentAttempt(attempts);
  const colors = isAttempted ? getResult(attempt.word.toLowerCase()) : null;

  for (let i = 0; i < 25; i++) {
    if (attempts.length * 5 - 5 > attempts.length * 5) {
      buttons.push(
        <Button
          key={i}
          size={{
            width: "75px",
            height: "75px",
          }}
          color={colors ? colors[i] : "#939B9F"}
          content={attempt.word[i]}
        />
      );
    } else {
      buttons.push(
        <Button
          key={i}
          size={{
            width: "75px",
            height: "75px",
          }}
          color={"#939B9F"}
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

function getResult(attempt) {
  const guest = "apple".toLowerCase(); // test guessing word because have not api feature
  const result = [];
  for (let i = 0; i < attempt.length; i++) {
    if (guest[i] == attempt[i]) {
      result.push("#008000");
      continue;
    }

    if (guest.includes(attempt[i])) {
      result.push("#FFFF00");
      continue;
    }

    result.push("#000");
  }

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
