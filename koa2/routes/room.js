var router = require('koa-router')();

router.get('/', async function (ctx, next) {
  let loginbean = ctx.session.loginbean;
  console.log('loginbean:'+loginbean);
  if(!loginbean){
  	ctx.body='0';
  	return;
  }
  ctx.body='1';
})
module.exports = router;
