const {
    knex
} = require("../config/database");

const tblName = 'templates';

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
/*
Required Param: int userId
*/
const getUserTemplates = function (userId) {

    console.log('tblName: ', tblName);

    return knex.select(knex.raw("* from templates"))
        .where("user_id", userId)
        .debug()
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log("getUserTemplates: err", err);
            throw new Error("Error in getting templates of user from db.");
        });

}

/*
Required Param: int templateId
*/
const deleteTemplates = function (templateId) {
    
    console.log('templateId: ', templateId);

    console.log('tblName: ', tblName);

    return knex(tblName).where('id', templateId).del().then(function (result) {
        console.log(result);

        return '1';
    }).catch((err) => {
        console.log('err: ', err);
    });



}


module.exports = {
    insertTemplate,
    getUserTemplates,
    deleteTemplates
};