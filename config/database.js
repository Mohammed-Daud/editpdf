const knex = require("knex")({
    client: "mysql",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE_NAME
    },
    log: {
        warn(message) {
            console.log("Knex: warn -> message", message);
        },
        error(message) {
            console.log("Knex: error -> message", message);
        },
        deprecate(message) {
            console.log("Knex: deprecate -> message", message);
        },
        debug(message) {
            console.log("Knex: debug -> message", message);
        }
    }
});

module.exports = {
    knex
};