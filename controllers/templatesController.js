const {
    knex
} = require("./../config/database");

exports.addTemplate = function (req, res) {
    res.send('NOT IMPLEMENTED: Author list');
};



exports.viewTemplate = function (req, res) {
    knex.select(knex.raw("* from templates t"))
    .knex.raw("* from template_pdfs tp")
        .debug()
        .then(result => {
            console.log('result: ', result);
            res.render('templates/templates_list', {
                teplates: result
            })
        })
        .catch(err => {
            console.log("TCL: err", err);
            throw err;
        })    
};