const Express = require('express');
const App = Express();
const Users = require('./controllers/Users');

App.use('/users', Users);


module.exports = App;