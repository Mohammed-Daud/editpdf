
exports.addTemplate = function(req, res) {
    res.render('templates/template_add_form.ejs');
};

exports.saveTemplate = function(req, res) {
    res.send('NOT IMPLEMENTED: Author list');
};



exports.viewTemplate = function(req, res) {
    res.render('index.ejs');
};

