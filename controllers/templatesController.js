const {
    knex
} = require("./../config/database");
const {
    insertTemplate,
    deleteTemplates,
    getUserTemplates,
    getTemplateById
} = require("../models/template");
const {
    insertPdf,
    getTemplatesPdfs,
    getTempPdfByTemplateId
} = require("../models/templatePdf");

const {
    insertTemplateInfos
} = require("../models/fillPdfInfo");

exports.addTemplate = function (req, res) {
    res.render('templates/template_add_form.ejs');
};

exports.saveTemplate = async function (req, res, next) {
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

exports.saveTemplateInfo = async function (req, res, next) {
    const x_position = req.body.xposition;
    const y_position = req.body.yposition;
    const pdf_id = req.body.pdfId;
    const label = req.body.label;
    const label_value = req.body.name;
    const pdf_page_no = req.body.page;

    await insertTemplateInfos(x_position, y_position, pdf_id, label, label_value, pdf_page_no);
    console.log(req.body);
    console.log(req.files);
    res.redirect('back');
    res.json(req.body);

    // knex('fill_infos').insert({x_position: req.body.xposition, y_position:req.body.yposition, pdf_id:req.body.pdfId, label: req.body.label, label_value:req.body.name, pdf_page_no:req.body.page})
    // .then(result => {
    //     console.log('result: ', result);
    //     return result;
    // })
    // .catch(err => {
    //     console.log("saveTemplateInfo: err", err);
    //     throw err;
    // })
    // console.log(req.body);
    // res.json(req.body);
};


exports.viewUserTemplates = async function (req, res) {
    Promise.all([getUserTemplates(1), getTemplatesPdfs()])
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

exports.editTemplateInfo = async function (req, res) {
    console.log('req: ', req.params.tempId);

    Promise.all([getTemplateById(req.params.tempId), getTempPdfByTemplateId(req.params.tempId)])
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

exports.deleteTemplate = (req, res) => {
    deleteTemplates(req.params.tempId)
        .then(result => {
            console.log('result: ', result);
            res.redirect('back');
        })
        .catch(err => {
            console.log("getTempPdfByTemplateId: err", err);
            throw err;
        });
}