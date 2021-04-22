const server = require('./server')
const pool = server.getPool();


function getTaskComments(id, req, res) {
    pool.getConnection()
        .then(conn => {
            conn.query(`SELECT * from COMMENTS where task_id = '${id}'`)
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

module.exports = getTaskComments;
