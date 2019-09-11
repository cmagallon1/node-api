const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const { Role } = require('../../db/models/index');

App.use(BodyParser.urlencoded({extended: false}));

App.use(BodyParser.json());

App.get('/', (req, res) => {
    Role.findAll().then(roles => {
        return res.json({
            ok: true,
            roles
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
    Role.findOne({where: {id}}).then(role => {
        if(!role){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "It wasn't found the specified role"
                }
            });
        }
        return res.json({
            ok: true,
            role
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
    let role = {
        role: body.role,
    };
    Role.create(role).then(role => {
        return res.json({
            ok: true,
            role
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
    let role = {
        role: body.role,
    };
    Role.update(role, {where: {id}}).then(role => {
        return res.json({
            ok: true,
            role
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
    Role.destroy({where: {id}}).then(role => {
        return res.json({
            ok: true,
            role
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