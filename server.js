const koa = require("koa");
const Router = require("koa-router");
const koaBody = require('koa-body');

const app = new koa();
const router = new Router();

app.use(koaBody());

const { attachDirToRouter } = require("koa-router-with-directory");
const path = require("path");

attachDirToRouter(router, path.join(__dirname, "routes/"))
.then((rrouter) => {
    // console.log("router", router.routes());
    // console.log("rrouter", rrouter.stack);

    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(3000, () => {
        console.log("listeinig");
    });
});
