const server = require('./server')
const pool = server.getPool();


function getAllTasks(req, res) {
    pool.getConnection()
        .then(conn => {
            conn.query(`SELECT * from tasks`)
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

module.exports = getAllTasks;
