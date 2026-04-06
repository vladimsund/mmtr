import React, { useState } from 'react';
import Image from 'next/image';
import styles from './TaskItem.module.css';

export default function TaskItem({
  task,
  list,
  handleChangeStatus,
  handleEditTask,
  handleDeleteTask,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.text);

  const handleSave = () => {
    if (!value) return;
    handleEditTask(list.id, task.id, value);
    setIsEditing(false);
  };

  return (
    <div className={styles['task']}>
      <div className={styles['task__left']}>
        <div className={`${styles['task__icon']} ${styles['task__icon_status']}`}>
          <Image
            src={task.isActive ? '/images/circle-active.svg' : '/images/circle.svg'}
            alt="status"
            fill
            onClick={() => handleChangeStatus(list.id, task.id)}
          />
        </div>
        {isEditing ? (
          <input
            autoFocus
            className={styles['task__input']}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
        ) : (
          <span className={styles['task__name']}>{task.text}</span>
        )}
      </div>
      <div className={styles['task__icons']} onClick={(e) => e.stopPropagation()}>
        <div className={`${styles['task__icon']} ${styles['task__icon_action']}`}>
          <Image src="/images/pen.svg" alt="edit" fill onClick={() => setIsEditing(true)} />
        </div>
        <div className={`${styles['task__icon']} ${styles['task__icon_action']}`}>
          <Image
            src="/images/cross.svg"
            alt="delete"
            fill
            onClick={() => handleDeleteTask(list.id, task.id)}
          />
        </div>
      </div>
    </div>
  );
}
