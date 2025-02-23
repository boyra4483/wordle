import classes from "./App.module.css";
import Keyboard from "./components/Keyboard/Keyboard.jsx";
import Board from "./components/Board/Board.jsx";
import { useState } from "react";
import Button from "./components/Button/Button.jsx";

export default function App() {
  const [key, setKey] = useState(null);

  function handleKeyDown(e) {
    setKey(e.key);
  }

  function handleKeyUp() {
    setKey(null);
  }

  return (
    <section
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      className={classes["app"]}
    >
      <Board buttons={getBoardButtons()} />
      <Keyboard buttons={getKeyboardButtons(key)} />
    </section>
  );
}

function getBoardButtons() {
  const buttons = [];
  for (let i = 0; i < 25; i++) {
    buttons.push(
      <Button
        key={i}
        size={{
          width: "4.688em",
          height: "4.688em",
        }}
        color={"#939B9F"}
      />
    );
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
