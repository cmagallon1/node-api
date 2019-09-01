

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

process.env.URL_DB = process.env.NODE_ENV === 'dev' ? '' : process.env.MYSQL_CONNECTION;

process.env.PASSWORD_DB = '12345678';

process.env.PORT = process.env.PORT || 3000 