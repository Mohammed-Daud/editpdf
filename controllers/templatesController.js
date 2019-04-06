

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

exports.saveTemplateInfo = function(req, res, next) {
    knex('fill_infos').insert({x_position: req.body.xposition, y_position:req.body.yposition, pdf_id:req.body.pdfId, label: req.body.label, label_value:req.body.name, pdf_page_no:req.body.page})
    .then(result => {
        console.log('result: ', result);
        return result;
    })
    .catch(err => {
        console.log("saveTemplateInfo: err", err);
        throw err;
    })
    console.log(req.body);
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
            var tempData = {};
            tempData['template'] = template[0];
            tempData['templatePdfs'] = templatePdfs;
            const templateJSON = JSON.stringify(tempData)
            res.render('templates/edit_temp_info.ejs', {
                // template:template[0],
                templateJSON,
                // templatePdfs
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