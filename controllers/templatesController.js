

const { knex } = require("./../config/database");
const { insertTemplate } = require("../models/template");
const { insertPdf } = require("../models/templatePdf");

exports.addTemplate = function (req, res) {
    res.render('templates/template_add_form.ejs');
};

exports.saveTemplate = async function(req, res, next) {
    const temp_name = req.body.temp_name;
    const pdfs = req.files;
    const pdf_sequences = req.body.pdf_sequence;
    const template_id = await insertTemplate(temp_name);
    await insertPdf(template_id, pdfs, pdf_sequences);
    console.log(req.body);
    console.log(req.files);
    res.redirect('back');
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