const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const { Author } = require('../../db/models/index');

App.use(BodyParser.urlencoded({extended: false}));

App.use(BodyParser.json());

App.get('/', (req, res) => {
    Author.findAll().then(authors => {
        return res.json({
            ok: true,
            authors
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
    Author.findOne({where: {id}}).then(author => {
        if(!author){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "It wasn't found the specified author"
                }
            });
        }
        return res.json({
            ok: false,
            author
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
    let author = {
        name: body.name,
        lastname: body.lastname
    };
    Author.create(author).then(author => {
        return res.json({
            ok: true,
            author
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
    let author = {
        name: body.name,
        lastname: body.lastname
    };
    Author.update(author, {where: {id}}).then(author => {
        return res.json({
            ok: true,
            author
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
    Author.destroy({where: {id}}).then(author => {
        return res.json({
            ok: true,
            author
        })
    })
    .catch(err => {
        return res.status(400).json({
            ok: false,
            err
        });
    });
});

module.exports = App;