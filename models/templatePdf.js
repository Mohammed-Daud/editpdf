
const { knex } = require("../config/database");

const tblName = 'template_pdfs';
/*
Required Param: Int template_id, Array pdfs, Array pdf_sequences.
*/

const insertPdf = (template_id, pdfs, pdf_sequences) => {
    console.log('***insertPdf***');
    console.log('tblName: ', tblName);
    let data = [];
    pdfs.forEach((element,index) => {
        let obj = {};
        obj['temp_id']      = template_id[0];
        obj['pdf_name']     = pdfs[index].originalname;
        obj['pdf_sequence'] = pdf_sequences[index];
        data = [...data, obj];
    });
    console.log('data: ', data);
    return knex(tblName).insert(data).then((result) => {
        console.log('Insert into DB: ', result);
        return result;
    }).catch((err) => {
        console.log('err: ', err);
        throw new Error("Error in inserting PDFs into db.");
    });
}

const getTemplatesPdfs = function () {
    return knex.select(knex.raw("* from " + tblName))
        .debug()
        .then(result => {
            console.log('result: ', result);
            return result;
        })
        .catch(err => {
            console.log("getTemplatesPdfs: err", err);
            throw err;
        })

};


const getTempPdfByTemplateId = (templateId) => {
    return knex.select(knex.raw("* from " + tblName))
        .where("temp_id", templateId)
        .debug()
        .then(result => {
            // console.log('result: ', result);
            return result;
        })
        .catch(err => {
            console.log("getTempPdfByTemplateId: err", err);
            throw new Error("Error in getting PDFs from db.");
        })
}



module.exports = {
    insertPdf,
    getTemplatesPdfs,
    getTempPdfByTemplateId
};