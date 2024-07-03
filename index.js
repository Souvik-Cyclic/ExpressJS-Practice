const express = require('express');
const app = express();
const port = 3000;

let courses = [
    { id: 1, name: "java" },
    { id: 2, name: "javascript" },
    { id: 3, name: "python" }
];

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.listen(port, () => {
    console.log(`Server started`);
});
