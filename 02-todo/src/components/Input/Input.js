import React from 'react';
import styles from './Input.module.css';

export const Input = ({ value, onChange, type = 'text', placeholder, className }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${styles['custom-input']} ${className || ''}`}
      placeholder={placeholder}
    />
  );
};
