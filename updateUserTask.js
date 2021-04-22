const server = require('./server')
const pool = server.getPool();


function updateUserTask(req, res) {
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        let task = JSON.parse(body);

        if (!task) {
            res.end();
            return;
        }

        pool.getConnection()
            .then(conn => {
                let sql = `UPDATE tasks
                            SET name = "${task.name}",
                            description = "${task.description}",
                            end_date = ${task.end_date ? +new Date(task.end_date) : null},
                            is_done = ${+task.is_done},
                            category_id = ${task.category_id ? "'" + task.category_id + "'" : null}
                            WHERE ID = "${task.id}"`;
                conn.query(sql)
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

module.exports = updateUserTask;
