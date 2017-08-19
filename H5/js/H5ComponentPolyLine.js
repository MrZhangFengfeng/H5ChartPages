/*
* 折线图脚本文件
*/
var H5ComponentPolyLine =function(name,cfg){
  var component = new H5ComponentBase(name,cfg);
  // 绘制网格线(背景层)
  var w = cfg.width;
  var h = cfg.height;

  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
  cns.width = ctx.width = w;
  cns.height = ctx.height = h;

  //水平网格线 10份(参考线)
  var step =cfg.stepY;
  ctx.beginPath();
  ctx.lineWidth=2;
  ctx.strokeStyle = '#AAAAAA';
  // 注入到全局变量
  window.ctx = ctx;
  for(var i=0;i<step+1;i++){
  	ctx.moveTo(0,(h/step)*i);
  	ctx.lineTo(w,(h/step)*i);
  }
  ctx.stroke();
  //垂直网格线 多少份 根据项目的个数来分
  // 为什么多加2  因为图表的点是在线上的 ，加上左右两侧的线  所以要加二
  var stepX = cfg.data.length+1;

  // 项目名称div的宽度
  //>> 0  除去小数
  var itemNameWidth = (w/stepX).toFixed(2);

  for(var i=0;i<stepX+1;i++){
  	ctx.moveTo((w/stepX)*i,0);
  	ctx.lineTo((w/stepX)*i,h);

  	if(cfg.data[i]){
  		var itemName = $('<div class = "text"></div>');
  		itemName.text(cfg.data[i][0]);
  		//因为画布是被除以2大小的   所以下面都除以2
  		//没在页面上显示的时候，查看是否添加到DOM上去了！
  		component.append(itemName);
  		itemName.css('width',itemNameWidth/2).css('left',(w/stepX)*i/2 + itemNameWidth/4);
  	} 	
  }
	  ctx.stroke();
	  component.append(cns);


  /*
  *绘制折线及对应的数据和阴影
  * per : 0-1之间，根据该数据绘制最终对应的中间状态。per为0.5的时候  %40会显示20%；
  */

  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
  cns.width = ctx.width = w;
  cns.height = ctx.height = h;
  var draw = function(per){
  	ctx.clearRect(0,0,w,h)
    ctx.beginPath();
    ctx.lineWidth=3;
    ctx.strokeStyle = '#ff8878';

  var x=0;
  var y=0;

  //画点
  for(i in cfg.data){
  	var item = cfg.data[i];
  	x = (w/(cfg.data.length+1))*(parseInt(i)+1);
  	y = h-(item[1]*h*per);
  	ctx.moveTo(x,y);
  	ctx.arc(x,y,5,0,2*Math.PI);
    ctx.fillStyle = 'red';
  }
  ctx.moveTo(w/(cfg.data.length+1),h-(cfg.data[0][1]*h*per));

  // 画线
  for(i in cfg.data){
		var item = cfg.data[i];
		x = (w/(cfg.data.length+1))*(parseInt(i)+1);
  		y = h-(item[1]*h*per);
		ctx.lineTo(x,y);
  }
  ctx.stroke();

  //画阴影
	ctx.lineWidth=3;
	ctx.strokeStyle ="rgba(255,255,255,0)";

	ctx.lineTo(x,h);
	ctx.lineTo(w/(cfg.data.length+1),h);
	// ctx.lineTo(0,h);

	//fillStyle 是属性  不是方法
	ctx.fillStyle = "rgba(255,136,120,.2)";
	ctx.fill();
  //填写数据
  for(i in cfg.data){
		var item = cfg.data[i];
		x = (w/(cfg.data.length+1))*(parseInt(i)+1);
  		y = h-(item[1]*h*per);
  		ctx.fillStyle = item[2] ? item[2] : '#595959';
		// ctx.fillText(((item[1]*100)>>0)+'%',x-20,y-20);
		ctx.fillText((item[1]*100)+'%',x-20,y-20);
  }
  ctx.stroke();

 }
 // draw(.5);
  //折线生长动画
  component.on('afterLoad',function(){
  	var s = 0;
  	for(i=0;i<100;i++){
  		setTimeout(function(){
  			s+=.01;
  			draw(s);
  		},i*10+500);
  	}
  });
  component.on('onLeave',function(){
  	var s = 1;
  	for(i=0;i<100;i++){
  		setTimeout(function(){
  			s-=.01;
  			draw(s);
  		},i*10+500);
  	}
  });

  component.append(cns);
  return component;
}