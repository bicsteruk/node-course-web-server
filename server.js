const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// app.use code is called in order of declaration

// __dirname gives us the root of the project
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


// express middleware is a mechanism to add functionality to express
// you can use it to add behaviours which don't exist
app.use((request, response, next) => {
    // this middleware is a logger
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });

    // need to call next to signify the function is complete
    next();
});

// app.use((request, response, next) => {
//     response.render('maintenance.hbs');

//     // don't call next and regardless of what we get back we
// });

// import static directory - this has to be below the maintenance
// code otherwise the help will still be viewable
app.use(express.static(__dirname + '/public'));

// helper method that can be called from hbs templates
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
// helpers are used to run javascript code from within hbs templates
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

// setup route handlers
app.get('/', (request, response) => {

response.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to our web app!'
});

    //response.send('<h1>hello express!!</h1>');
    // response.send({
    //     name: "Chris",
    //     likes: [
    //         "Beer",
    //         "Cars",
    //         "Football"
    //     ]
    // });
});

app.get('/about', (request, response) => {
    //response.send('About page');
    response.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: "Error handling request"
    });
});

app.listen(3000, () => {
    console.log('Server is up on port: 3000');
});