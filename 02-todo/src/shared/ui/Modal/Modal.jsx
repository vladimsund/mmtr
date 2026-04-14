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
    }
  }

  function handleContentClick(event) {
    event.stopPropagation();
  }

  function handleSaveClick() {
    onSave(text);
  }

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={handleContentClick}>
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
            onClick={handleSaveClick}
            className={styles.modalBtnSave}
          ></Button>
          <Button
            text="Отмена"
            onClick={onClose}
            className={styles.modalBtnCancel}
          ></Button>
        </div>
      </div>
    </div>
  );
}
