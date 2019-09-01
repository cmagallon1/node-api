const Express = require('express');
const App = Express();
const sequelize = require('./db/index');
const Routes = require('./routes/routes');

App.use('/api', Routes);

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
  require('./db/models/users');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

App.listen(process.env.PORT, () => {
  console.log(`Escuchando el en puerto ${process.env.PORT}`);
})