const sequelize = require('./db/index');
sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
  require('./db/models/users');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});
