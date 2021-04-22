const mariadb = require("mariadb"),
    url = "127.0.0.1";

const pool = mariadb.createPool({host: url, user: 'root', password: 'password', database: 'project-guid'});

function createTaskComment(req, res) {
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        let comment = JSON.parse(body);

        if (!comment) {
            res.end();
            return;
        }

        pool.getConnection()
            .then(conn => {
                conn.query(`INSERT INTO COMMENTS(id, task_id, text) VALUES(` +
                    `'${comment.id}', '${comment.task_id}','${comment.text}')`)
                    .then(() => {
                        res.end();
                        conn.release();
                    }).catch((err) => {
                    console.log(err);
                    res.statusCode = 400;
                    res.end();
                    conn.release();
                });
            }).catch(err => {
        });
    });
}

module.exports = createTaskComment;
