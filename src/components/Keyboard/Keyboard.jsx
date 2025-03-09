import classes from "./Keyboard.module.css";

export default function Keyboard({ buttons, onClickButton, onClickButtonUp }) {
  return (
    <section
      onPointerDown={(e) => {
        e.preventDefault();
        onClickButton(e);
      }}
      onPointerUp={onClickButtonUp}
      className={classes["keyboard"]}
    >
      {buttons}
    </section>
  );
}
