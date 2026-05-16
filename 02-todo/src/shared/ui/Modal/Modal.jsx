import { useState } from "react";

import { Input, Button, Text } from "@/shared";

import styles from "./Modal.module.css";

export default function Modal({ isOpen = true, onClose, onSave, title }) {
  const [text, setText] = useState("");

  if (!isOpen) {
    return null;
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      onSave(text);
      setText("");
    }
  }

  function handleContent(event) {
    event.stopPropagation();
  }

  function handleSave() {
    onSave(text);
    setText("");
  }

  function handleCancel() {
    setText("");
    onClose();
  }

  return (
    <div className={styles.modal} onClick={handleCancel}>
      <div className={styles.modalContent} onClick={handleContent}>
        <Text text={title} className={styles.modalTitle} />
        <div className={styles.modalInputContainer} onKeyDown={handleKeyDown}>
          <Input
            value={text}
            onChange={setText}
            placeholder="Введите текст..."
          />
        </div>
        <div className={styles.modalActions}>
          <Button
            text="Сохранить"
            onClick={handleSave}
            className={styles.modalBtnSave}
          ></Button>
          <Button
            text="Отмена"
            onClick={handleCancel}
            className={styles.modalBtnCancel}
          ></Button>
        </div>
      </div>
    </div>
  );
}
