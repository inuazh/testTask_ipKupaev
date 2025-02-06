import React from 'react';

function SeminarItem({ seminar, onDelete, onEdit }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '10px' }}>
      <img 
        src={seminar.photo} 
        alt={seminar.title} 
        style={{ maxWidth: '100%', height: 'auto' }} 
      />
      <h2>{seminar.title}</h2>
      <p>{seminar.description}</p>
      <p>{seminar.date} {seminar.time}</p>
      <button onClick={() => onEdit(seminar)}>Редактировать</button>
      <button onClick={() => onDelete(seminar.id)}>Удалить</button>
    </div>
  );
}

export default SeminarItem;
