import classes from "./Button.module.css";

export default function Button({ source, content, color }) {
  if (source == undefined) {
    return (
      <div style={{ backgroundColor: color }} className={classes["button"]}>
        {content}
      </div>
    );
  }
  return (
    <div style={{ backgroundColor: color }} className={classes["button"]}>
      <img src={source} alt="delete-icon" />
    </div>
  );
}
