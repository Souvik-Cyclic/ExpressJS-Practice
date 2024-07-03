const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

function logger(req, res, next) {
    const method = req.method;
    const ip = req.ip;
    const hostname = req.hostname;
    const date = new Date().toISOString();

    console.log(`[${date}] ${method} request from ${ip} to ${hostname}${req.originalUrl}`);
    next();
}

app.use(logger);

let courses = [
    { id: 1, name: "java" },
    { id: 2, name: "javascript" },
    { id: 3, name: "python" }
];

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.post('/courses', (req, res) => {
    const newCourse = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

//put call update id 1 to spring
app.put('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const courseToUpdate = courses.find(course => course.id === courseId);
    if (!courseToUpdate) {
        return res.status(404).send('Course not found');
    }
    courseToUpdate.name = req.body.name;
    res.json(courseToUpdate);
});

//delete call delete id 2
app.delete('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const courseIndex = courses.findIndex(course => course.id === courseId);
    if (courseIndex === -1) {
        return res.status(404).send('Course not found');
    }
    const deletedCourse = courses.splice(courseIndex, 1);
    res.json(deletedCourse[0]);
});

// function middleware(req, res, next) {
//     console.log("called");
//     next()
// }

//logger
//method, ip, hostname, date

app.listen(port, () => {
    console.log(`Server started`);
});

