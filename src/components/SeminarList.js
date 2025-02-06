import React, { useState, useEffect } from 'react';
import SeminarItem from './SeminarItem';
import EditSeminarModal from './EditSeminarModal';
import { CircularProgress, Alert } from '@mui/material';

function SeminarList() {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSeminar, setEditingSeminar] = useState(null);

  // Получение данных с json-server
  const fetchSeminars = async () => {
    try {
      const response = await fetch('http://localhost:3001/seminars');
      if (!response.ok) {
        throw new Error('Ошибка сети');
      }
      const data = await response.json();
      setSeminars(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeminars();
  }, []);

  // Удаление семинара с подтверждением
  const handleDelete = async (id) => {
    if (window.confirm('Вы действительно хотите удалить семинар?')) {
      try {
        const response = await fetch(`http://localhost:3001/seminars/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Ошибка при удалении семинара');
        }
        setSeminars(seminars.filter(seminar => seminar.id !== id));
      } catch (error) {
        alert('Ошибка: ' + error.message);
      }
    }
  };

  // Открытие модального окна для редактирования
  const handleEdit = (seminar) => {
    setEditingSeminar(seminar);
  };

  // Сохранение изменений семинара
  const handleSave = async (updatedSeminar) => {
    try {
      const response = await fetch(`http://localhost:3001/seminars/${updatedSeminar.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedSeminar)
      });
      if (!response.ok) {
        throw new Error('Ошибка при обновлении семинара');
      }
      setSeminars(
        seminars.map(seminar =>
          seminar.id === updatedSeminar.id ? updatedSeminar : seminar
        )
      );
      setEditingSeminar(null);
    } catch (error) {
      alert('Ошибка: ' + error.message);
    }
  };

  const handleCloseModal = () => {
    setEditingSeminar(null);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Ошибка: {error.message}</Alert>;

  return (
    <div>
      {seminars.map(seminar => (
        <SeminarItem 
          key={seminar.id}
          seminar={seminar}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
      {editingSeminar && (
        <EditSeminarModal 
          seminar={editingSeminar}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default SeminarList;
