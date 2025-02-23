import classes from "./Keyboard.module.css";
import Button from "../Button/Button";

export default function Keyboard({ buttons }) {
  return <section className={classes["keyboard"]}>{buttons}</section>;
}
