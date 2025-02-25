import classes from "./Keyboard.module.css";

export default function Keyboard({ buttons }) {
  return <section className={classes["keyboard"]}>{buttons}</section>;
}
