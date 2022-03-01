// const KoaRouter = require('koa-router');
// const router = new KoaRouter();
// const info = require("../service/info")
// // const contactController = require('../controllers/ContactController');
//
// router
//     .get('/', async ctx => (ctx.body = 'Welcome to the contacts API!'))
//     .get('/info', async ctx => ctx.body = await info())
//     .post('/save', async ctx => ctx.body = await info())
//     // .get('/contact/:id', contactController.show)
//     // .put('/contact/:id', contactController.update)
//     // .delete('/contact/:id', contactController.destroy);
//
// module.exports = router;

const { query } = require('../utils/async-db')

exports.get = async function (req){

    let sql = `SELECT * FROM fund`;

    let sResult = await query(sql);

    req.body = sResult
}

exports.post = function (req) {

    let result = {
        status: true,
        data: {}
    }
    // console.log(req)

    req.body = result;
}