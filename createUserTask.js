const mariadb = require("mariadb"),
    url = "127.0.0.1";

const pool = mariadb.createPool({host: url, user: 'root', password: 'password', database: 'project-guid'});

function createUserTask(req, res) {
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
                const endDate =
                    conn.query(`INSERT INTO TASKS(id, user_id, name, description, end_date, category_id) VALUES(` +
                        `"${task.id}",${+task.user_id},"${task.name}","${task.description}",${task.end_date ? +new Date(task.end_date) : null},${task.category_id ? "'" + task.category_id + "'" : null})`)
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

module.exports = createUserTask;
