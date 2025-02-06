import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';

function SeminarItem({ seminar, onDelete, onEdit }) {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardMedia
        component="img"
        image={seminar.photo}
        alt={seminar.title}
        sx={{
          maxWidth: '100%',
          height: 'auto'
        }}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {seminar.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {seminar.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          {seminar.date} {seminar.time}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          variant="contained" 
          color="primary" 
          onClick={() => onEdit(seminar)}
        >
          Редактировать
        </Button>
        <Button 
          size="small" 
          variant="outlined" 
          color="error" 
          onClick={() => onDelete(seminar.id)}
        >
          Удалить
        </Button>
      </CardActions>
    </Card>
  );
}

export default SeminarItem;
