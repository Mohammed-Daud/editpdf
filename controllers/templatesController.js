

const { knex } = require("./../config/database");

exports.addTemplate = function (req, res) {
    res.render('templates/template_add_form.ejs');
};

exports.saveTemplate = function(req, res, next) {
    console.log(req);
    res.json(req.body);
};



exports.viewTemplate = async function (req, res) {
    Promise.all([getTemplates(knex), getTempPdfs(knex)])
        .then(([templates, templatePdfs]) => {
            console.log('templates, templatePdfs: ', templates, templatePdfs);
            res.render('templates/templates_list.ejs', {
                templates,
                templatePdfs
            });
        })
};

exports.editTemplateInfo = function(req, res) {
    console.log('req: ', req.params.tempId);
    return res.send(req.params.tempId);

}

const getTemplates = function (knex) {
    return knex.select(knex.raw("* from templates"))
        .where("user_id", 1)
        .debug()
        .then(result => {
            // console.log('result: ', result);
            return result;
        })
        .catch(err => {
            console.log("getTemlates: err", err);
            throw err;
        })

};

const getTempPdfs = function (knex) {
    return knex.select(knex.raw("* from template_pdfs"))
        .debug()
        .then(result => {
            // console.log('result: ', result);
            return result;
        })
        .catch(err => {
            console.log("getTempPdfs: err", err);
            throw err;
        })

};