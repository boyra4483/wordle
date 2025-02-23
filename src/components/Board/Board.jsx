import classes from "./Board.module.css";
import Button from "../Button/Button";

export default function Board() {
  return <section className={classes["board"]}>{getButtons()}</section>;
}

function getButtons() {
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
