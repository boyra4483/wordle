import classes from "./App.module.css";
import Keyboard from "./components/Keyboard/Keyboard.jsx";
import Board from "./components/Board/Board.jsx";
import Button from "./components/Button/Button.jsx";
import { useState } from "react";

export default function App() {
  const [wordInfo, setwordInfo] = useState({
    word: "",
    key: "",
    isAttempted: false,
  });
  const key = wordInfo.key;

  function handleKeyDown(e) {
    const key = e.key;

    if (!inRange(key)) return;
    if (wordInfo.isAttempted) return;
    if (key == "Enter" && wordInfo.word.length < 5) return;
    if (key == "Backspace" && wordInfo.word.length == 0) return;

    if (key == "Enter") {
      return setwordInfo({
        ...wordInfo,
        isAttempted: true,
      });
    }
    if (key == "Backspace") {
      return setwordInfo({
        ...wordInfo,
        word: wordInfo.word.slice(0, -1),
        key: key.toLowerCase(),
      });
    }
    if ((wordInfo.word + key).length > 5) return;

    setwordInfo({
      word: wordInfo.word + key,
      key: key.toLowerCase(),
    });
  }

  function handleKeyUp() {
    setwordInfo({
      ...wordInfo,
      key: null,
    });
  }

  return (
    <section
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      className={classes["app"]}
    >
      <Board
        buttons={getBoardButtons(
          wordInfo.word.toUpperCase(),
          wordInfo.isAttempted
        )}
      />
      <Keyboard buttons={getKeyboardButtons(key)} />
    </section>
  );
}

function getBoardButtons(word, isAttempted) {
  const buttons = [];
  const colors = isAttempted ? getResult(word.toLowerCase()) : null;

  for (let i = 0; i < 25; i++) {
    if (i < word.length) {
      buttons.push(
        <Button
          key={i}
          size={{
            width: "75px",
            height: "75px",
          }}
          color={colors ? colors[i] : "#939B9F"}
          content={word[i]}
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
          color={"Backspace" == key ? "#c2c2c2" : "#d3d6da"}
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

function getResult(word) {
  const guest = "apple".toLowerCase(); // test guessing word because have not api feature
  const result = [];

  for (let i = 0; i < word.length; i++) {
    if (guest[i] == word[i]) {
      result.push("#008000");
      continue;
    }

    if (guest.includes(word[i])) {
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
