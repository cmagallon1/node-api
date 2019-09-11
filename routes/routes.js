const Express = require('express');
const App = Express();
const Users = require('./controllers/users');
const Authors = require('./controllers/authors');
const Books = require('./controllers/books');

App.use('/users', Users);
App.use('/authors', Authors);
App.use('/books', Books);

module.exports = App;