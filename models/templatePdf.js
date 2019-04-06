
const { knex } = require("../config/database");

const tblName = 'template_pdfs';
const fillInfoTableName = 'fill_infos';

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

const insertTemplateInfos = (x_position, y_position, pdf_id, label, label_value, pdf_page_no) => {
    console.log('***insertPdf***');
    console.log('tblName: ', fillInfoTableName);
    let data = [];
    pdf_id.forEach((element,index) => {
        let obj = {};
        obj['pdf_id']      = pdf_id[index];
        obj['x_position']     = x_position[index];
        obj['y_position'] = y_position[index];
        obj['label'] = label[index];
        obj['label_value'] = label_value[index];
        obj['pdf_page_no'] = pdf_page_no[index];
        data = [...data, obj];
    });
    console.log('data: ', data);
    return knex(fillInfoTableName).insert(data).then((result) => {
        console.log('Insert into DB: ', result);
        return result;
    }).catch((err) => {
        console.log('err: ', err);
        throw new Error("Error in inserting PDFs into db.");
    });
}



module.exports = {
    insertPdf,
    insertTemplateInfos
};