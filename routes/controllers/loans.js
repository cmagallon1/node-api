const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const { Loan, Book } = require('../../db/models/index');
const { response } = require('../../services/helpers');

App.use(BodyParser.urlencoded({extended: false}));

App.use(BodyParser.json());

App.get('/', (req, res) => {
    Loan.findAll().then(loans => {
        return response(res, loans);
    })
    .catch(err => {
        return response(res, err, 500);
    })
});

App.get('/:id', (req, res) => {
    let id = req.params.id;
    Loan.findOne({where: {id}}).then(loan => {
        if(!loan){
            return response(res, { message: "It wasn't found the specified loan" }, 400);
        }
        return response(res, loan);
    })
    .catch(err => {
        return response(res, err, 500);
    })
});

App.post('/', (req, res) => {
    let body = req.body;
    let {userId, limitDate, loanDate, books} = body;
    if(!Array.isArray(books)) {
        return response(res, {message: "The field books has to be an array"}, 400);
    }
    let loan = {
        userId,
        limitDate,
        loanDate
    };    
    Loan.create(loan).then(loan => {
        //Asi se agrega uno a la relacion
        // add agrega las nuevas relaciones a la tabla de relaciones
        // set elimina las anteriores para introducir las nuevas
        return response(res, loan);
    })
    .catch(err => {
        return response(res, err, 400);
    })
});

App.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let {userId, limitDate, releaseDate, books} = body;
    if(!Array.isArray(books)) {
        return response(res, {message: "The field books has to be an array"}, 400);
    }
    let loan = {
        userId,
        limitDate,
        releaseDate
    };    
    Loan.update(loan, {where: {id}}).then(loan => {
        return response(res, loan)
    })
    .catch(err => {
        return response(res, err, 400);
    })
});

App.delete('/:id', (req, res) => {
    let id = req.params.id;
    Loan.destroy({where: {id}}).then(loan => {
        return response(res, loan);
    })
    .catch(err => {
        return response(res, err, 400);
    });
});


module.exports = App;