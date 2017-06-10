var router = require('koa-router')();
var redis = require("redis");
var client = redis.createClient();

client.on("error", function(err) {
  console.log("Error " + err);
});

var dayArr=['日','一','二','三','四','五','六'];
//client.on("connect", runSample);

router.get('/getRoomList', async function (ctx, next) {
  let loginbean = ctx.session.loginbean;
  console.log('loginbean:'+loginbean);
  if(!loginbean){
  	ctx.body='登陆过期';
  	return;
  }
  let roomList = [];  //房间列表

  let roomNames = await new Promise(function(resolve,reject){
    client.lrange('room',0,20,function(err,rs){
        resolve(rs);
    });
  })
  let len = roomNames.length;
  for(let i=0;i<len;i++){
    let roomInfo = await new Promise(function(resolve,reject){
      client.hgetall(roomNames[i],function(err,rs){
          resolve(rs);
      })
    })
    if(roomInfo!=null){   //list查询出来后最后一个值是null
      if(roomInfo.pwd==''){
        roomInfo.pwd='无';
      }else{
        roomInfo.pwd='有';
      }
      let time = roomInfo.createtime;
      //roomInfo.createtime = time.getDate();
      roomInfo.room=roomNames[i];
      roomList.push(roomInfo);
    }
  }
  console.log(roomList);
  ctx.body=roomList;
})

router.get('/newroom', async function (ctx, next) {
  let loginbean = ctx.session.loginbean;
  if(!loginbean){
  	ctx.body='登陆过期';
  	return;
  }
  //---------获取房间流水号----------
  let roomid = await new Promise(function(resolve,reject){
    client.hincrby('roomid','id',1,function(err,roomidRS){
          resolve(roomidRS);
    });
  })
  let room = 'room'+roomid;     //房间键
  await client.lpush('room',room);
  let roompwd = ctx.query.roompwd;
  let date = new Date();
  let time = '周'+dayArr[date.getDay()]+' '+(date.getHours())+":"+(date.getMinutes());
  await client.hmset('room'+roomid,'num',1,'start',0,'pwd',roompwd,'createtime',time);
  let msg={};
  msg.id = loginbean.id;
  msg.nicheng = loginbean.nicheng;
  msg.room = room;
  ctx.body=msg;
})


module.exports = router;