const mariadb = require("mariadb"),
    url = "127.0.0.1";

const pool = mariadb.createPool({host: url, user: 'root', password: 'password', database: 'project-guid'});

function signUp(req, res) {

    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        let bodyObj = JSON.parse(body);

        let login = bodyObj.login;
        let password = bodyObj.password;
        let name = bodyObj.name;

        if (!login || !password || !name) {
            res.end();
            return;
        }

        pool.getConnection()
            .then(conn => {
                conn.query(`CALL signup('${name}','${login}','${password}')`)
                    .then(rows => {
                        res.write(JSON.stringify(rows[0][0]));
                        res.end();
                        conn.release();
                    }).catch((err) => {
                    res.statusCode = 400;
                    res.write(JSON.stringify(err));
                    res.end();
                    conn.release();
                });
            }).catch(err => {
        });
    });
}

module.exports = signUp;
