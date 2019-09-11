const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const { Book } = require('../../db/models/index');

App.use(BodyParser.urlencoded({extended: false}));

App.use(BodyParser.json());
//TODO: Add token
//TODO: Add pagination, same in all controllers
App.get('/', (req, res) => {
    Book.findAll().then(books => {
        return res.json({
            ok: true,
            books
        });
    })
    .catch(err => {
        return res.status(500).json({
            ok: false,
            err
        });
    })
});

App.get('/:id', (req, res) => {
    let id = req.params.id;
    Book.findOne({where: {id}}).then(book => {
        if(!book){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "It wasn't found the specified book"
                }
            });
        }
        return res.json({
            ok: true,
            book
        })
    })
    .catch(err => {
        return res.status(500).json({
            ok: false,
            err
        });
    })
});

App.post('/', (req, res) => {
    let body = req.body;
    let book = {
        name: body.name,
        editorial: body.editorial,
        releaseDate: body.releaseDate,
    };
    Book.create(book).then(book => {
        return res.json({
            ok: true,
            book
        });
    })
    .catch(err => {
        return res.status(400).json({
            ok: false,
            err
        });
    })
});

App.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let book = {
        name: body.name,
        editorial: body.editorial,
        releaseDate: body.releaseDate,
    };
    Book.update(book, {where: {id}}).then(book => {
        return res.json({
            ok: true,
            book
        });
    })
    .catch(err => {
        return res.status(400).json({
            ok: false,
            err
        });
    })
});

App.delete('/:id', (req, res) => {
    let id = req.params.id;
    Book.destroy({where: {id}}).then(book => {
        return res.json({
            ok: true,
            book
        });
    })
    .catch(err => {
        return res.status(400).json({
            ok: false,
            err
        });
    });
});

module.exports = App;