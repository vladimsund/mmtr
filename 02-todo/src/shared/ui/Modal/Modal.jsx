import { useState } from "react";

import Input from "../Input/Input";

import styles from "./Modal.module.css";

export default function Modal({ onClose, onSave, title }) {
  const [text, setText] = useState("");

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
        <h3 className={styles.modalTitle}>{title}</h3>
        <div className={styles.modalInputContainer} onKeyDown={handleKeyDown}>
          <Input
            value={text}
            onChange={setText}
            placeholder="Введите текст..."
          />
        </div>
        <div className={styles.modalActions}>
          <button onClick={handleSaveClick} className={styles.modalBtnSave}>
            Сохранить
          </button>
          <button onClick={onClose} className={styles.modalBtnCancel}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
