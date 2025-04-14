import refreshUrl from "../../assets/icons/refresh.svg";
import { words } from "../../services/randomWords";
import classes from "./Board.module.css";

export default function Board({ resetAttemptList, buttons }) {
  function handleClick() {
    resetAttemptList([
      {
        word: "",
        key: "",
        colors: ["#939B9F", "#939B9F", "#939B9F", "#939B9F", "#939B9F"],
        isAttempted: false,
      },
    ]);
    words.length = 0;
  }

  return (
    <section className={classes["board"]}>
      {buttons}
      <img
        onClick={handleClick}
        className={classes["refreshButton"]}
        src={refreshUrl}
        alt="refresh icon"
      />
    </section>
  );
}
