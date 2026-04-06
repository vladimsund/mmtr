import React, { useState } from 'react';
import Image from 'next/image';
import styles from './EditItem.module.css';

export default function EditItem({ object, handleEditList, handleDeleteList, onClick }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(object.title);

  const handleSave = (e) => {
    if (e) e.stopPropagation();
    if (value.trim() && value !== object.title) {
      handleEditList(object.id, value);
    }
    setIsEditing(false);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    handleDeleteList(id);
  };

  const handleStartEdit = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  return (
    <div className={styles['edit']} onClick={onClick}>
      {isEditing ? (
        <input
          autoFocus
          className={styles['edit__input']}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === 'Enter' && handleSave(e)}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <span className={styles['edit__name']}>{object.title}</span>
      )}
      <div className={styles['edit__icons']}>
        <div className={styles['edit__icon-container']}>
          <Image src="/images/pen.svg" alt="edit" fill onClick={handleStartEdit} />
        </div>
        <div className={styles['edit__icon-container']}>
          <Image
            src="/images/cross.svg"
            alt="delete"
            fill
            onClick={(e) => handleDelete(e, object.id)}
          />
        </div>
      </div>
    </div>
  );
}
