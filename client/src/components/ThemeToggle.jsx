import React from 'react';

export default function ThemeToggle({ onToggle, isLight }){
  return (
    <button
      onClick={onToggle}
      className="control-btn"
    >
      {isLight ? '🌙 Dark' : '☀ Light'}
    </button>
  );
}