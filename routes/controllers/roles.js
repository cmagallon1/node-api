const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const { Role } = require('../../db/models/index');
const { response } = require('../../services/helpers');

App.use(BodyParser.urlencoded({extended: false}));

App.use(BodyParser.json());

App.get('/', (req, res) => {
    Role.findAll().then(roles => {
        return response(res, roles);
    })
    .catch(err => {
        return response(res, err, 500);
    })
});

App.get('/:id', (req, res) => {
    let id = req.params.id;
    Role.findOne({where: {id}}).then(role => {
        if(!role){
            return response(res, {message: "It wasn't found the specified role"}, 400);
        }
        return response(res, role);
    })
    .catch(err => {
        return response(res, err, 500);
    })
});

App.post('/', (req, res) => {
    let body = req.body;
    let role = {
        role: body.role,
    };
    Role.create(role).then(role => {
        return response(res, role);
    })
    .catch(err => {
        return response(res, err, 400);
    })
});

App.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let role = {
        role: body.role,
    };
    Role.update(role, {where: {id}}).then(role => {
        return response(res, role);
    })
    .catch(err => {
        return response(res, err, 400);
    })
});

App.delete('/:id', (req, res) => {
    let id = req.params.id;
    Role.destroy({where: {id}}).then(role => {
        return response(res, role);
    })
    .catch(err => {
       return response(res, err, 400)
    });
});

module.exports = App;