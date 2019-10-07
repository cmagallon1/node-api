const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const { Author } = require('../../db/models/index');
const { response } = require('../../services/helpers');

App.use(BodyParser.urlencoded({extended: false}));

App.use(BodyParser.json());

App.get('/', (req, res) => {
    Author.findAll().then(authors => {
        return response(res, authors);
    })
    .catch(err => {
        return response(res, err, 500)
    })
});

App.get('/:id', (req, res) => {
    let id = req.params.id;
    Author.findOne({where: {id}}).then(author => {
        if(!author){
            return response(res, { message: "It wasn't found the specified author" }, 400);
        }
        return response(res, author);
    })
    .catch(err => {
        return response(res, err, 500);
    })
});

App.post('/', (req, res) => {
    let body = req.body;
    let author = {
        name: body.name,
        lastname: body.lastname
    };
    Author.create(author).then(author => {
        return response(res, author);
    })
    .catch(err => {
        return response(res, err, 400);
    })
});

App.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let author = {
        name: body.name,
        lastname: body.lastname
    };
    Author.update(author, {where: {id}}).then(author => {
        return response(res, author);
    })
    .catch(err => {
        return response(res, err, 400);
    })
});

App.delete('/:id', (req, res) => {
    let id = req.params.id;
    Author.destroy({where: {id}}).then(author => {
        return response(res, author);
    })
    .catch(err => {
        return response(res, err, 400);
    });
});

module.exports = App;