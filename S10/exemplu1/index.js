const express = require("express");
const app = express();
const port = 3000;

const sequelize = require("./sequelize");

const University = require("./models/university");
const Student = require("./models/student");
const Course = require("./models/course");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

University.hasMany(Student);
University.hasMany(Course);
Course.belongsTo(University);
Student.belongsToMany(Course, { through: 'enrollments' });
Course.belongsToMany(Student, { through: 'enrollments' });

app.get('/', async (req, res, next) => {
  try {
    const universities = await University.findAll({
      include: [
        {
          model: Student,
          include: [Course] 
        },
        {
          model: Course
        }
      ]
    });

    const exportData = universities.map(university => {
      const formattedUniversity = university.toJSON();
      const enrollmentPairs = [];

      if (formattedUniversity.students) {
        formattedUniversity.students.forEach(student => {
          if (student.courses) {
            student.courses.forEach(course => {
              enrollmentPairs.push({
                studentId: student.id,
                courseId: course.id
              });
            });
          }
        });
      }

      const cleanStudents = formattedUniversity.students.map(student => {
        const { courses, ...studentData } = student;
        return studentData;
      });

      return {
        id: formattedUniversity.id,
        name: formattedUniversity.name,
        students: cleanStudents,
        courses: formattedUniversity.courses,
        enrollments: enrollmentPairs
      };
    });

    res.status(200).json(exportData);
  } catch (err) {
    next(err);
  }
});

app.listen(port, () => {
  console.log("The server is running on http://localhost:" + port);
});

app.use((err, req, res, next) => {
  console.error("[ERROR]:" + err);
  res.status(500).json({ message: "500 - Server Error" });
});

app.get("/create", async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });
    res.status(201).json({ message: "Database created with the models." });
  } catch (err) {
    next(err);
  }
});

app.get("/universities", async (req, res, next) => {
  try {
    const universities = await University.findAll();
    res.status(200).json(universities);
  } catch (err) {
    next(err);
  }
});

app.post("/university", async (req, res, next) => {
  try {
    const university = await University.create(req.body);
    res.status(201).json(university);
  } catch (err) {
    next(err);
  }
});

app.get("/students", async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
});

app.post("/universities/:universityId/students", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (university) {
      const student = new Student(req.body);
      student.universityId = university.id;
      await student.save();
      res.status(201).json({ message: 'Student created!'});
    } else {
      res.status(404).json({ message: '404 - University Not Found'});
    }
  } catch (error) {
    next(error);
  }
});

app.get("/universities/:universityId/students", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId, {
      include: [Student]
    });
    if (university) {
      res.status(200).json(university.students);
    } else {
      res.status(404).json({ message: '404 - University Not Found!'});
    }
  } catch(error) {
    next(error);
  }
});

app.put("/universities/:universityId/students/:studentId", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (university) {
      const students = await university.getStudents({ where: { id: req.params.studentId } });
      const student = students.shift();
      if (student) {
        student.studentFullName = req.body.fullName;
        student.studentStatus = req.body.status;
        await student.save();
        res.status(202).json({ message: 'Student updated!' });
      } else {
        res.status(404).json({ message: '404 - Student Not Found!'});
      }
    } else {
      res.status(404).json({ message: '404 - University Not Found!'});
    }
  } catch (error) {
    next(error);
  }
});

app.get('/universities/:universityId/students/:studentId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (university) {
      const students = await university.getStudents({ where: { id: req.params.studentId } });
      const student = students.shift();
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: '404 - Student Not Found!' });
      }
    } else {
      res.status(404).json({ message: '404 - University Not Found!' });
    }
  } catch (err) {
    next(err);
  }
});

app.delete('/universities/:universityId/students/:studentId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (university) {
      const students = await university.getStudents({ where: { id: req.params.studentId } });
      const student = students.shift();

      if (student) {
        await student.destroy();
        res.status(202).json({ message: 'Student deleted!' });
      } else {
        res.status(404).json({ message: '404 - Student Not Found!' });
      }
    } else {
      res.status(404).json({ message: '404 - University Not Found!' });
    }
  } catch (err) {
    next(err);
  }
});

app.get('/universities/:universityId/courses', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (university) {
      const courses = await university.getCourses();
      if (courses.length > 0) {
        res.json(courses);
      } else {
        res.sendStatus(204);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

app.get('/universities/:universityId/courses/:courseId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (university) {
      const courses = await university.getCourses({
        where: { id: req.params.courseId } 
      });
      const course = courses.shift();
      if (course) {
        res.json(course);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

app.post('/universities/:universityId/courses', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (university) {
      const course = await Course.create(req.body);
      university.addCourse(course);
      await university.save();
      res.status(201).json(course); 
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

app.put('/universities/:universityId/courses/:courseId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (university) {
      const courses = await university.getCourses({
        where: { id: req.params.courseId } 
      });
      const course = courses.shift();
      if (course) {
        await course.update(req.body);
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

app.delete('/universities/:universityId/courses/:courseId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (university) {
      const courses = await university.getCourses({
        where: { id: req.params.courseId } 
      });
      const course = courses.shift();
      if (course) {
        await course.destroy();
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

app.get('/universities/:universityId/students/:studentId/enrollements', async (req, res, next) => {
  try {
    const student = await Student.findOne({
      where: {
        id: req.params.studentId,
        universityId: req.params.universityId
      }
    });
    if (student) {
      const courses = await student.getCourses();
      if (courses.length > 0) {
        res.status(200).json(courses);
      } else {
        res.sendStatus(204);
      }
    } else {
      res.status(404).json({ message: '404 - Student Not Found!' });
    }
  } catch (err) {
    next(err);
  }
});

app.post('/universities/:universityId/students/:studentId/enrollements', async (req, res, next) => {
  try {
    const student = await Student.findOne({
      where: {
        id: req.params.studentId,
        universityId: req.params.universityId
      }
    });
    const course = await Course.findOne({
      where: {
        id: req.body.courseId,
        universityId: req.params.universityId
      }
    });

    if (student && course) {
      await student.addCourse(course);
      res.status(201).json({ message: 'Student enrolled!' });
    } else {
      res.status(404).json({ message: '404 - Student or Course Not Found in this University!' });
    }
  } catch (err) {
    next(err);
  }
});

app.delete('/universities/:universityId/students/:studentId/enrollements/:courseId', async (req, res, next) => {
  try {
    const student = await Student.findOne({
      where: {
        id: req.params.studentId,
        universityId: req.params.universityId
      }
    });
    const course = await Course.findOne({
      where: {
        id: req.params.courseId,
        universityId: req.params.universityId
      }
    });

    if (student && course) {
      await student.removeCourse(course);
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: '404 - Student or Course Not Found!' });
    }
  } catch (err) {
    next(err);
  }
});

app.get('/universities/:universityId/courses/:courseId/enrollements', async (req, res, next) => {
  try {
    const course = await Course.findOne({
      where: {
        id: req.params.courseId,
        universityId: req.params.universityId
      }
    });
    if (course) {
      const students = await course.getStudents();
      if (students.length > 0) {
        res.status(200).json(students);
      } else {
        res.sendStatus(204);
      }
    } else {
      res.status(404).json({ message: '404 - Course Not Found!' });
    }
  } catch (err) {
    next(err);
  }
});

app.post('/universities/:universityId/courses/:courseId/enrollements/:studentId', async (req, res, next) => {
  try {
    const course = await Course.findOne({
      where: {
        id: req.params.courseId,
        universityId: req.params.universityId
      }
    });
    const student = await Student.findOne({
      where: {
        id: req.params.studentId,
        universityId: req.params.universityId
      }
    });

    if (course && student) {
      await course.addStudent(student);
      res.status(201).json({ message: 'Student added to course!' });
    } else {
      res.status(404).json({ message: '404 - Course or Student Not Found!' });
    }
  } catch (err) {
    next(err);
  }
});

app.delete('/universities/:universityId/courses/:courseId/enrollements/:studentId', async (req, res, next) => {
  try {
    const course = await Course.findOne({
      where: {
        id: req.params.courseId,
        universityId: req.params.universityId
      }
    });
    const student = await Student.findOne({
      where: {
        id: req.params.studentId,
        universityId: req.params.universityId
      }
    });

    if (course && student) {
      await course.removeStudent(student);
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: '404 - Course or Student Not Found!' });
    }
  } catch (err) {
    next(err);
  }
});