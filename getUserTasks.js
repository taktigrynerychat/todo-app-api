const server = require('./server')
const pool = server.getPool();


function getUserTasks(id, req, res) {
    pool.getConnection()
        .then(conn => {
            conn.query(`SELECT * from tasks where user_id = ${id}`)
                .then(rows => {
                    res.write(JSON.stringify(rows));
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

module.exports = getUserTasks;
