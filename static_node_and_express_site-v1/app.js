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
    res.render('index', { projects });
});

//render project page
app.get('/project/:id', (req, res) => {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );

    if (project) {
        res.render('project', { project });
    } else {
        res.sendStatus(404);
    }
})

//render about page
app.get('/about', (req, res) => {
    res.render('about');
});

//Handling errors
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = `The page requested does not exist. You can navigate from the homepage.`
    console.log(`Error: ${err.status}. ${err.message}`);
    next(err);
    res.render('page-not-found');
});

app.use((err, req, res, next) => {
    if (err) {
        console.log('Global error handler called', err)
    }

    if (err.status === 404) {
        res.status(404).render('page-not-found', { err });
    } else {
        err.message = err.message || `Ooops! It looks like something went wrong on the server.`
        res.status(err.status || 500).render('error', { err });
    }
});
//listening on port 3000
app.listen(3000, () => {
    console.log("This app is running on http://localhost:3000/");
});