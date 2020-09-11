//require global variables
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//custom 404 error message
const fourOhFourError = `The page requested does not exist.`;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Add static middleware
app.use('/static', express.static('public'));

// view engine setup
app.set('view engine', 'pug');

//require the routes folder
const mainRoutes = require('./routes');
app.use(mainRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error(fourOhFourError );
    err.status = 404;
    console.log(`Error: ${ err.status }. ${ err.message }`);
    next(err);
});

//Global Error Handler
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);

    if (res.status(404)) {
        err.status = 404;
        err.message = fourOhFourError;
        console.log(`${ err.status }: ${ fourOhFourError }`);
        res.status(404).render('page-not-found', { err });
    } else {
        err.message = `Ooops! It looks like something went wrong on the server.`
        console.log(err.message);
        res.status(err.status || 500).render('error', { err });
    }
});

//listening on port 3000
app.listen(3000, () => {
    console.log("This app is running on http://localhost:3000/");
});