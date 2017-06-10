var router = require('koa-router')();

var UserModel = require('../models/UserModel')
 

router.get('/', function (ctx, next) {
  ctx.body = 'this a users response!';
});

router.post('/zhuce',async function (ctx, next) {
  var user = new UserModel({});
  user.email = ctx.request.body['email'];
  user.pwd = ctx.request.body['pwd'];
  user.nicheng = ctx.request.body['nicheng'];
  user.role=1;
  user.createtime=new Date();
  try{
  	let rs = await user.save();
  	ctx.status = 307;  //http重定向状态码
	ctx.redirect('login');  
  	return;
  }catch(err){
  		let errMsg = err.message;
  		if(errMsg.indexOf('$emailuiq')>-1){
	      ctx.body = 2;		//{type:0,msg:'email重复'};
	    }else if(errMsg.indexOf('$nichenguiq')>-1){
	      ctx.body = 3;		//{type:0,msg:'昵称重复'};
	    }else{
	      ctx.body = 0;		//{type:0,msg:'数据库错误'};
	    }
		return;
	}
	
  ctx.body = '注册成功';
});
router.post('/login',async function (ctx, next) {
  var user = {};
  user.email = ctx.request.body['email'];
  user.pwd = ctx.request.body['pwd'];

  	let rs = await UserModel.findOne(user);
  	//console.log(rs);
  	
  	if(rs){
  		let loginbean = {};
	  	loginbean.id=rs._id;
	  	loginbean.nicheng=rs.nicheng;
	  	loginbean.role=rs.role;
	  	ctx.session.loginbean=loginbean;
	  	console.log(ctx.session.loginbean);
  		ctx.body=1;
  	}else{
  		ctx.body=0;
  	}
});

module.exports = router;
