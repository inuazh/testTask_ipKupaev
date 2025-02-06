import React, { useState } from 'react';

function EditSeminarModal({ seminar, onSave, onClose }) {
  const [formData, setFormData] = useState({ ...seminar });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // Простейшие стили для модального окна и затемнения фона
  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#fff',
    padding: '20px',
    zIndex: 1000,
    border: '1px solid #ccc',
    borderRadius: '4px'
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose}></div>
      <div style={modalStyle}>
        <h2>Редактировать семинар</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Название:</label>
            <input 
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Описание:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Дата:</label>
            <input 
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Время:</label>
            <input 
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Фото (URL):</label>
            <input 
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <button type="submit">Сохранить</button>
            <button type="button" onClick={onClose}>Отмена</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditSeminarModal;
