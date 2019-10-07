const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const { User } = require('../../db/models/index');
const { response } = require('../../services/helpers');

App.use(BodyParser.urlencoded({extended: false}));

App.use(BodyParser.json());

App.get('/', (req, res)=>{
    User.findAll().then(users => {
       return response(res, users);
   }).catch(err => {
       return response(res, err, 500);
   })
});

App.get('/:id', (req, res) => {
    let id = req.params.id;
    User.findOne({where: {id}}).then(user => {
        if(!user) {
            return response(res, { message: "It wasn't found the specified user" }, 400);
        }
        return response(res, user);
    }).catch(err => {
        return response(res, err, 500);
    });
});

App.post('/', (req, res) => {
    let body = req.body;
    let user = {
        name: body.name,
        firstSurname: body.firstSurname,
        secondSurname: body.secondSurname,
        phone: body.phone,
        email: body.email,
        password: body.password,
        roleId: body.roleId,
    };
    User.create(user).then(user => {
        return response(res, user);
    }).catch(err => {
        return response(res, err, 400);
    });
});

App.put('/:id', (req, res) => {
    let body = req.body;
    let id = req.params.id;
    let user = {
        name: body.name,
        firstSurname: body.firstSurname,
        secondSurname: body.secondSurname,
        phone: body.phone,
        email: body.email,
        password: body.password,
        roleId: body.roleId,
    };
    User.update(user, {where: {id}}).then(user => {
        return response(res, user);
    }) .catch(err => {
        return response(res, err, 400);
    });
});

App.delete('/:id', (req, res) => {
    let id = req.params.id;
    User.destroy({where: {id}}).then(user => {
        return response(res, user);
    })
    .catch(err => {
        return response(res, err, 400);
    });
});


module.exports = App;