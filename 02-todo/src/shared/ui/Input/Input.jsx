import clsx from "clsx";

import styles from "./Input.module.css";

export default function Input({
  value,
  onChange,
  variant = "filled",
  className,
  ...props
}) {
  function handleChange(e) {
    if (onChange) {
      onChange(e.target.value);
    }
  }

  return (
    <input
      value={value}
      onChange={handleChange}
      className={clsx(styles.input, styles[variant], className)}
      {...props}
    />
  );
}
