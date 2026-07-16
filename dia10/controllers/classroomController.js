const Classroom = require('../models/classroomModel');
const Person = require('../models/personModel');

// Función auxiliar para devolver el aula con profesor y alumnos completos
function expandClassroom(classroom) {
    const persons = Person.getAll();

    const teacher = persons.find(
        (p) => p.Id === classroom.Teacher_id
    );

    const students = classroom.Students
        ? classroom.Students
              .split(',')
              .map((id) => persons.find((p) => p.Id === id))
              .filter(Boolean)
        : [];

    return {
        Id: classroom.Id,
        Name: classroom.Name,
        Teacher: teacher,
        Students: students
    };
}


// GET /classrooms  (con busqueda por name, teacher_id, students)
exports.list = (req, res) => {
    let classrooms = Classroom.getAll();
    const { name, teacher_id, students } = req.query;

    if (name) {
        classrooms = classrooms.filter((c) =>
            c.Name.toLowerCase().includes(String(name).toLowerCase())
        );
    }
    if (teacher_id) {
        classrooms = classrooms.filter((c) =>
            c.Teacher_id === String(teacher_id)
        );
    }
    if (students) {
        classrooms = classrooms.filter((c) =>
            c.Students.split(',').includes(String(students))
        );
    }

    res.json(classrooms.map(expandClassroom));
};

// GET /classrooms/:id
exports.getOne = (req, res) => {
    const classrooms = Classroom.getAll();
    const classroom = classrooms.find((c) => c.Id === req.params.id);
    if (!classroom) return res.status(404).json({ error: 'Classroom no encontrada' });
    res.json(expandClassroom(classroom));
};

// POST /classrooms
exports.create = (req, res) => {
    const { Name, Teacher_id, Students } = req.body;

    if (!Name || !Teacher_id) {
        return res.status(400).json({
            error: 'Name y Teacher_id son obligatorios'
        });
    }

    // Leer todas las personas
    const persons = Person.getAll();

    // Comprobar que el profesor existe
    const teacherExists = persons.some(
        (p) => p.Id === String(Teacher_id)
    );

    if (!teacherExists) {
        return res.status(400).json({
            error: 'El profesor no existe'
        });
    }

    // Comprobar que todos los alumnos existen
    if (Students && Array.isArray(Students)) {
        const allStudentsExist = Students.every((id) =>
            persons.some((p) => p.Id === String(id))
        );

        if (!allStudentsExist) {
            return res.status(400).json({
                error: 'Uno o más estudiantes no existen'
            });
        }
    }

    const classrooms = Classroom.getAll();

    const newClassroom = {
        Id: String(Classroom.nextId(classrooms)),
        Name,
        Teacher_id,
        Students: Array.isArray(Students) ? Students.join(',') : ''
    };

    classrooms.push(newClassroom);
    Classroom.saveAll(classrooms);

    res.status(201).json(newClassroom);
};

// PUT /classrooms/:id
exports.update = (req, res) => {
    const classrooms = Classroom.getAll();
    const index = classrooms.findIndex((c) => c.Id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: 'Classroom no encontrada' });
    }

    const { Name, Teacher_id, Students } = req.body;

    // Validar profesor
    const persons = Person.getAll();

    if (Teacher_id !== undefined) {
        const teacherExists = persons.some(
            (p) => p.Id === String(Teacher_id)
        );

        if (!teacherExists) {
            return res.status(400).json({
                error: 'El profesor no existe'
            });
        }
    }

    // Validar alumnos
    if (Students !== undefined && Array.isArray(Students)) {
        const allStudentsExist = Students.every((id) =>
            persons.some((p) => p.Id === String(id))
        );

        if (!allStudentsExist) {
            return res.status(400).json({
                error: 'Uno o más estudiantes no existen'
            });
        }
    }

    const updated = {
        ...classrooms[index],
        ...(Name !== undefined && { Name }),
        ...(Teacher_id !== undefined && { Teacher_id }),
        ...(Students !== undefined && {
            Students: Array.isArray(Students)
                ? Students.join(',')
                : Students
        })
    };

    classrooms[index] = updated;
    Classroom.saveAll(classrooms);

    res.json(updated);
};

// DELETE /classrooms/:id
exports.remove = (req, res) => {
    const classrooms = Classroom.getAll();
    const index = classrooms.findIndex((c) => c.Id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Classroom no encontrada' });

    const [deleted] = classrooms.splice(index, 1);
    Classroom.saveAll(classrooms);
    res.json({ message: 'Classroom eliminada', classroom: deleted });
};

