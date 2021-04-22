const mariadb = require("mariadb"),
  dbUrl = "127.0.0.1";

const poolConfig = {host: dbUrl, user: 'root', password: 'password', database: 'project-guid'};
let pool = mariadb.createPool(poolConfig);

module.exports = {
    getPool: () => {
        if(pool) return pool;
        pool = mariadb.createPool(poolConfig);
        return pool;
    }
};

const login = require('./login');
const signUp = require('./sign-up');
const getUserTasks = require('./getUserTasks');
const createUserTask = require('./createUserTask');
const updateUserTask = require('./updateUserTask');
const createCategory = require('./createCategory');
const getUserCategories = require('./getUserCategories');
const createTaskComment = require('./createTaskComment');
const getTaskComments = require('./getTaskComments');
const getAllTasks = require('./getAllTasks');

const http = require("http"),
    url = require('url');

http.createServer(function (req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.setHeader('Access-Control-Allow-Methods', '*');

    let urlObject = url.parse(req.url, true);
    console.log(urlObject.pathname);
    if (req.method === 'OPTIONS') res.end();

    switch (urlObject.pathname) {
        case '/login':
            if (req.method === 'POST') login(req, res);
            else {
                res.statusCode = 405;
                res.end();
            }
            break;
        case '/sign-up':
            if (req.method === 'POST') signUp(req, res);
            else {
                res.statusCode = 405;
                res.end();
            }
            break;
        case '/getUserTasks':
            if (req.method === 'GET')
                getUserTasks(+urlObject.query.id, req, res);
            else {
                res.statusCode = 405;
                res.end();
            }
            break;
        case '/createUserTask':
            if (req.method === 'POST')
                createUserTask(req, res);
            else {
                res.statusCode = 405;
                res.end();
            }
            break;
        case '/updateUserTask':
            if (req.method === 'POST')
                updateUserTask(req, res);
            else {
                res.statusCode = 405;
                res.end();
            }
            break;
        case '/createCategory':
            if (req.method === 'POST')
                createCategory(req, res);
            else {
                res.statusCode = 405;
                res.end();
            }
            break;
        case '/getUserCategories':
            if (req.method === 'GET')
                getUserCategories(+urlObject.query.id, req, res);
            else {
                res.statusCode = 405;
                res.end();
            }
            break;
        case '/createTaskComment':
            if (req.method === 'POST')
                createTaskComment(req, res);
            else {
                res.statusCode = 405;
                res.end();
            }
            break;
        case '/getTaskComments':
            if (req.method === 'GET')
                getTaskComments(urlObject.query.id, req, res);
            else {
                res.statusCode = 405;
                res.end();
            }
            break;

        case '/getAllTasks':
            if (req.method === 'GET')
                getAllTasks(req, res);
            else {
                res.statusCode = 405;
                res.end();
            }
            break;

        default:
            res.end();
            break;
    }

}).listen(8080);

