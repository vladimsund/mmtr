import clsx from "clsx";

import styles from "./Icon.module.css";

export default function Icon({ src, alt, onClick, className }) {
  return (
    <button className={clsx(styles.icon, className)} onClick={onClick}>
      <img src={src} alt={alt} className={styles.image} />
    </button>
  );
}
