const Express = require('express');
const App = Express();
const Users = require('./controllers/users');

App.use('/users', Users);


module.exports = App;