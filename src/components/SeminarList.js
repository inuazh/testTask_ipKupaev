import React, { useState, useEffect } from 'react';
import SeminarItem from './SeminarItem';
import EditSeminarModal from './EditSeminarModal';

function SeminarList() {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSeminar, setEditingSeminar] = useState(null);

  // Функция для получения данных с json-server
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

  // Обработка удаления семинара
  const handleDelete = async (id) => {
    if (window.confirm("Вы действительно хотите удалить семинар?")) {
      try {
        const response = await fetch(`http://localhost:3001/seminars/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Ошибка при удалении семинара');
        }
        // Обновление локального состояния
        setSeminars(seminars.filter(seminar => seminar.id !== id));
      } catch (error) {
        alert("Ошибка: " + error.message);
      }
    }
  };

  // Открытие модального окна для редактирования
  const handleEdit = (seminar) => {
    setEditingSeminar(seminar);
  };

  // Сохранение изменений после редактирования
  const handleSave = async (updatedSeminar) => {
    try {
      const response = await fetch(`http://localhost:3001/seminars/${updatedSeminar.id}`, {
        method: 'PUT', // Можно использовать PATCH для частичного обновления
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedSeminar)
      });
      if (!response.ok) {
        throw new Error('Ошибка при обновлении семинара');
      }
      // Обновление локального состояния
      setSeminars(seminars.map(seminar => seminar.id === updatedSeminar.id ? updatedSeminar : seminar));
      setEditingSeminar(null);
    } catch (error) {
      alert("Ошибка: " + error.message);
    }
  };

  const handleCloseModal = () => {
    setEditingSeminar(null);
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

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
