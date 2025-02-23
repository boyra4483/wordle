import classes from "./App.module.css";
import Keyboard from "./components/Keyboard/Keyboard.jsx";
import Board from "./components/Board/Board.jsx";

export default function App() {
  return <section className={classes["app"]}>{<Board />}</section>;
}
