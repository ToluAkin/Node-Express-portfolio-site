//require global variables
const express = require('express');
const bodyParser = require('body-parser');
const { projects } = require('./data.json');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Add static middleware
app.use('/static', express.static('public'));

// view engine setup
app.set('view engine', 'pug');

// render the landing page
app.get('/', (req, res) => {
    res.render('index');
});

//render project page
app.get('/project/:id', (req, res) => {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    res.render('project', { project })
})

//render about page
app.get('/about', (req, res) => {
    res.render('about');
});

//listening on port 3000
app.listen(3000, () => {
    console.log("This app is running on http://localhost:3000/");
});