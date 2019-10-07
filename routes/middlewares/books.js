const { Author } = require('../../db/models/index');
const { response } = require('../../services/helpers');

const verifyAuthor = (req, res, next) => {
    const body = req.body;
    const { authorId } = body;
    Author.findOne({ where: { id: authorId } }).then(author => {
        if(!author){
            return response(res, `The author with the id ${authorId} does not exists`, 400)
        } 
        next();
    })
    .catch(err => {
        return response(res, err, 400);
    });
}

module.exports = {
    verifyAuthor
}
