import clsx from "clsx";

import styles from "./Input.module.css";

export default function Input({
  value,
  onChange,
  variant = "filled",
  className,
  ...props
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={clsx(styles.input, styles[variant], className)}
      {...props}
    />
  );
}
