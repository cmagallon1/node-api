const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const { Book } = require('../../db/models/index');
const { verifyAuthor } = require('../middlewares/books');
const { applyTransaction, response, query } = require('../../services/helpers');

App.use(BodyParser.urlencoded({ extended: false }));

App.use(BodyParser.json());
//TODO: Add token
//TODO: Add pagination, same in all controllers
App.get('/', (req, res) => {
    Book.findAll().then(books => {
        return response(res, books);
    })
    .catch(err => {
        return response(res, err, 500);
    })
});

App.get('/:id', (req, res) => {
    let id = req.params.id;
    Book.findOne({where: {id}}).then(book => {
        if(!book){
            return response(res, { message: "It wasn't found the specified book" }, 400);
        }
        return response(res, book);
    })
    .catch(err => {
        return response(res, err, 500);
    })
});

const createBook = (book, authorId, transaction) => {
    return Book.create(book, { transaction }).then( book => {
        return book.addAuthor(authorId, { through: 'BookAuthor', transaction})
        .then(data => data)
        .catch(err => err)
    })
}

App.post('/', verifyAuthor, (req, res) => {
    let body = req.body;
    const { name, editorial, releaseDate, authorId } = body;
    let book = {
        name,
        editorial,
        releaseDate,
    };
    applyTransaction([book, authorId], createBook)
    .then(data => {
        return response(res, data)
    })
    .catch(err => {
        return response(res, err, 400)
    })
});

const updateBook = (data, transaction) => {
    const { book, id, authorId } = data;
    return Book.update(book, { where: { id }, transaction }).then(book => {
        return Book.findOne({ where:{ id }, transaction }).then( result => {
            return result.setAuthors(authorId, { through: 'BookAuthor', transaction}).then(updated => book)
                .catch(err => err)
        })
        .catch(err => err)
    })
}

App.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    const { name, editorial, releaseDate, authorId } = body;
    let book = {
        name,
        editorial,
        releaseDate
    };
    applyTransaction([{book, id, authorId}], updateBook)
    .then(data => {
        return response(res, data)
    })
    .catch(err => {
        return response(res, err, 400)
    })
});

//TODO:Stablish actions in tables
App.delete('/:id', (req, res) => {
    let id = req.params.id;
    Book.destroy({where: {id}}).then(book => {
        return response(res, book);
    })
    .catch(err => {
        return response(res, err, 400);
    });
});

module.exports = App;