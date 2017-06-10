const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
var cors = require('koa-cors');
var session = require('koa-generic-session');

const index = require('./routes/index');
const users = require('./routes/users');
const hall = require('./routes/hall');
const room = require('./routes/room');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;  //初始化
var db = mongoose.connect('mongodb://localhost/doudizhu');

app.keys = ['my secret key'];
app.use(session());

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'jade'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(cors()); //放到route前面

router.use('/', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/hall', hall.routes(), hall.allowedMethods());
router.use('/room', room.routes(), room.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});


module.exports = app;