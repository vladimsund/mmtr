import styles from "./AddButton.module.css";

export default function AddButton({ text, onClick, id }) {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <div className={styles.new} onClick={handleClick}>
      + {text}
    </div>
  );
}
