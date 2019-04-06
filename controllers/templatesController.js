

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
        .catch(err => {
            console.log("viewTemplate: err", err);
            throw err;
        })
};

exports.editTemplateInfo = async function(req, res) {
    console.log('req: ', req.params.tempId);

    Promise.all([getTemplateById(knex, req.params.tempId), getTempPdfByTemplateId(knex, req.params.tempId)])
        .then(([template, templatePdfs]) => {
            console.log('template: ', template);
            console.log('templatePdfs: ', templatePdfs);
            const templateJSON = JSON.stringify(templatePdfs)
            res.render('templates/edit_temp_info.ejs', {
                template:template[0],
                templateJSON,
                templatePdfs
            });
        })
        .catch(err => {
            console.log("viewTemplate: err", err);
            throw err;
        })
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
            console.log('result: ', result);
            return result;
        })
        .catch(err => {
            console.log("getTempPdfs: err", err);
            throw err;
        })

};

const getTemplateById = function(knex, templateId){
    return knex.select(knex.raw("* from templates"))
        .where("id", templateId)
        .debug()
        .then(result => {
            // console.log('result: ', result);
            return result;
        })
        .catch(err => {
            console.log("getTemplateById: err", err);
            throw err;
        })
}

const getTempPdfByTemplateId = (knex, templateId) => {
    return knex.select(knex.raw("* from template_pdfs"))
        .where("temp_id", templateId)
        .debug()
        .then(result => {
            // console.log('result: ', result);
            return result;
        })
        .catch(err => {
            console.log("getTempPdfByTemplateId: err", err);
            throw err;
        })
}