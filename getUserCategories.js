const server = require('./server')
const pool = server.getPool();


function getUserCategories(id, req, res) {
    pool.getConnection()
        .then(conn => {
            conn.query(`SELECT id, name, color from categories where user_id = ${id} or user_id is null`)
                .then(rows => {
                    !rows.length ? res.statusCode = 404 : res.write(JSON.stringify(rows));
                    res.end();
                    conn.release();
                }).catch((err) => {
                res.statusCode = 400;
                res.end();
                conn.release();
            });
        }).catch(err => {
    });
}

module.exports = getUserCategories;
