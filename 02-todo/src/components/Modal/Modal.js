import React, { useState } from 'react';
import styles from './Modal.module.css';
import { Input } from '@/components/Input/Input';

export default function Modal({ onClose, onSave, title }) {
  const [text, setText] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSave(text);
    }
  };

  return (
    <div className={styles['modal']} onClick={onClose}>
      <div className={styles['modal__content']} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles['modal__title']}>{title}</h3>
        <div className={styles['modal__input-container']} onKeyDown={handleKeyDown}>
          <Input value={text} onChange={(val) => setText(val)} placeholder="Введите текст..." />
        </div>
        <div className={styles['modal__actions']}>
          <button onClick={() => onSave(text)} className={styles['modal__btn-save']}>
            Сохранить
          </button>
          <button onClick={onClose} className={styles['modal__btn-cancel']}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
