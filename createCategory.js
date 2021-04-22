const server = require('./server')
const pool = server.getPool();

function createCategory(req, res) {
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        let category = JSON.parse(body);

        if (!category) {
            res.end();
            return;
        }

        pool.getConnection()
            .then(conn => {
                conn.query(`INSERT INTO CATEGORIES(id, name, user_id, color) VALUES(` +
                    `"${category.id}","${category.name}",${+category.user_id}, ${category.color ? "'" + category.color + "'" : null})`)
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

module.exports = createCategory;
