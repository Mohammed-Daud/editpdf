
const { getUserTemplates } = require("../models/template");

exports.index = function (req, res) {
    getUserTemplates(1).then((templates)=>{
        console.log('templates: ', templates);
        /*
        SELECT temp_name,pdf_name,label, label_value, x_position, y_position, pdf_page_no FROM users JOIN templates ON users.id = templates.user_id JOIN template_pdfs ON templates.id = template_pdfs.temp_id JOIN fill_infos ON template_pdfs.id = fill_infos.pdf_id WHERE users.id = 1
        */
        res.render('documents/document_list.ejs',{
            templates
        });
    }).catch((err)=>{
        console.log('err: ', err);
        res.send("Error");
    });
};

