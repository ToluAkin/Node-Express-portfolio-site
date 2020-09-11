const express = require('express');
const { projects } = require('../data.json');

const router = express.Router();

// render the landing page
router.get('/', (req, res) => {
    res.render('index', { projects });
});

//render project page
router.get('/project/:id', (req, res) => {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );

    res.render('project', { project });
})

//render about page
router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;
