import classes from "./Board.module.css";

export default function Board({ buttons }) {
  return <section className={classes["board"]}>{buttons}</section>;
}
