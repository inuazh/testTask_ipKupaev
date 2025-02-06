import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

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

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Редактировать семинар</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            margin="dense"
            label="Название"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Описание"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
          />
          <TextField
            margin="dense"
            label="Дата"
            name="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Время"
            name="time"
            value={formData.time}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Фото (URL)"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Отмена</Button>
          <Button type="submit" variant="contained" color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EditSeminarModal;
