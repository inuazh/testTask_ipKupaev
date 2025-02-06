import React from 'react';
import { Container, Typography } from '@mui/material';
import SeminarList from './components/SeminarList';

function App() {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Список семинаров
      </Typography>
      <SeminarList />
    </Container>
  );
}

export default App;
