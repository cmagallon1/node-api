const Express = require('express');
const App = Express();
const Users = require('./controllers/users');
const Authors = require('./controllers/authors');

App.use('/users', Users);
App.use('/authors', Authors);

module.exports = App;