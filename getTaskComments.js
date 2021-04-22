const mariadb = require("mariadb"),
    url = "127.0.0.1";

const pool = mariadb.createPool({host: url, user: 'root', password: 'password', database: 'project-guid'});

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
