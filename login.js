const mariadb = require("mariadb"),
    url = "127.0.0.1";

const pool = mariadb.createPool({host: url, user: 'root', password: 'password', database: 'project-guid'});

function login(req, res) {

    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        let bodyObj = JSON.parse(body);

        let login = bodyObj.login;
        let password = bodyObj.password;

        if (!login || !password) {
            res.end();
            return;
        }

        pool.getConnection()
            .then(conn => {
                conn.query(`SELECT id, name, login, role from users where login = '${login}' and password = '${password}'`)
                    .then(rows => {
                        !rows.length ? res.statusCode = 401 : res.write(JSON.stringify(rows[0]));
                        res.end();
                        conn.release();
                    }).catch((err) => {
                    res.statusCode = 400;
                    res.end();
                    conn.release();
                });
            }).catch(err => {
        });
    });
}

module.exports = login;
