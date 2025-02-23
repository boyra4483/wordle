import classes from "./Keyboard.module.css";
import Button from "../Button/Button";
import { useState } from "react";

export default function Keyboard() {
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
      className={classes["keyboard"]}
    >
      {getButtons(key)}
    </section>
  );
}

function getButtons(key) {
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
