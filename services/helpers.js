const Sequelize = require('../db/index')

const applyTransaction = (parameters, functionToExecute) => {
    return Sequelize.transaction(transaction => {
        return functionToExecute(...parameters, transaction);
    });
}

const query = queryString => {
    return Sequelize.query(queryString)
    .then(([result, metadata]) => result)
    .catch(err => err)
}

const response = (res, data, status = null) => {
    if(!status) {
        return res.json({
            ok: true,
            data 
        });
    } 
    return res.status(status).json({
        ok: false,
        err: data
    });
}

module.exports = {
    applyTransaction,
    response,
    query
};