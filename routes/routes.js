const Express = require('express');
const App = Express();
const Users = require('./controllers/users');
const Authors = require('./controllers/authors');
const Books = require('./controllers/books');
const Roles = require('./controllers/roles');
const Loans = require('./controllers/loans');

App.use('/users', Users);
App.use('/authors', Authors);
App.use('/books', Books);
App.use('/roles', Roles);
App.use('/loans', Loans);

module.exports = App;