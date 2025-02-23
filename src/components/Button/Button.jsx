import classes from "./Button.module.css";

export default function Button({
  size = null,
  source = null,
  content = "",
  color,
}) {
  const styles = size
    ? { backgroundColor: color, ...size, opacity: "30%" }
    : { backgroundColor: color };

  if (source == null) {
    return (
      <div style={styles} className={classes["button"]}>
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
