
const { knex } = require("../config/database");

const tblName = 'fill_infos';

/*
Required Param: VarChar temp_name
*/

const insertTemplate = function (temp_name) {

    console.log('tblName: ', tblName);

    return knex(tblName).returning('id').insert({
        temp_name: temp_name,
        user_id: '1'
    }).then((result) => {
        console.log('result: ', result);
        return result;
    }).catch((err) => {
        console.log('err: ', err);
        throw new Error("Error in inserting template into db.");
    });


}

module.exports = {
    insertTemplate,
    getUserTemplates,
    deleteTemplates
};