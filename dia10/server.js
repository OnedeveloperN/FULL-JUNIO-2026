const express = require('express');
const personRoutes = require('./routes/personRoutes');
const classroomRoutes = require('./routes/classroomRoutes');

const app = express();
app.use(express.json());
app.use('/classrooms', classroomRoutes);

app.use('/persons', personRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API CRUD de Person con CSV - Nivel 1' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
