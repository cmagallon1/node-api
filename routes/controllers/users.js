const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const { User } = require('../../db/models/index');

App.use(BodyParser.urlencoded({extended: false}));

App.use(BodyParser.json());

App.get('/', (req, res)=>{
    User.findAll().then(users => {
       return res.json({
           ok: true,
           users
       });
   }).catch(err => {
        return res.status(500).json({
            ok:false,
            error: err
        });
   })
});

App.get('/:id', (req, res) => {
    let id = req.params.id;
    User.findByPk(id).then(user => {
        if(!user) {
            return res.status(400).json({
                ok:false,
                error:{
                    message: "No se encuentra el usuario especificado"
                }
            });
        }
        return res.json({
            ok:true,
            user
        });
    }).catch(err => {
        return res.status(500).json({
            ok:false,
            error: err
        });
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
        return res.json({
            ok:true,
            user
        });
    }).catch(err => {
        return res.status(400).json({
            ok:false,
            err
        });
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
        return res.json({
            ok:true,
            user
        });
    }) .catch(err => {
        return res.status(400).json({
            ok:false,
            error:{
                message: err
            }
        });
    });
});

App.delete('/:id', (req, res) => {
    let id = req.params.id;
    User.destroy({where: {id}}).then(user => {
        return res.json({
            ok:true,
            user
        });
    })
    .catch(err => {
        return res.status(400).json({
            ok:false,
            error:{
                message: err
            }
        });
    });
});


module.exports = App;