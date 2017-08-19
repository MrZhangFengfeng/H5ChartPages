/*
* 雷达图脚本文件
*/
var H5ComponentRadar =function(name,cfg){
	var component = new H5ComponentBase(name,cfg);
	// 绘制网格线(背景层)
	var w = cfg.width;
	var h = cfg.height;

	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);

	var r = w/2;
	var step = cfg.data.length;

	// ctx.beginPath();
	// ctx.arc(r,r,5,0,2*Math.PI);
	// ctx.stroke();

	// var r = w/2;
	// ctx.beginPath();
	// ctx.arc(r,r,r,0,2*Math.PI);
	// ctx.stroke();

	/*
	* 计算圆周上的坐标（计算多边形的顶点坐标）;
	* 已知圆心坐标(a,b) 半径r 角度deg;
	* rad = ( 2*Math.PI/360 )*( 360/step )*i
	* x = a + Math.sin( rad )*r;
	* y = b + Math.cos( rad )*r;
	*/

	// 绘制网格背景(分面绘制，分为6份)
	var isBlue = false;
	for(var s=6;s>0;s--){
		ctx.beginPath();
		for(var i=0;i<step;i++){
			var rad = ( 2*Math.PI / 360 ) * ( 360/step ) * i;
			var x = r + Math.sin( rad )*(r/6*s);
			var y = r + Math.cos( rad )*(r/6*s);
		
			ctx.lineTo(x,y);
		}
		ctx.closePath(x,y);
		ctx.fillStyle = (isBlue = !isBlue) ? "#99c0ff" : "#f1f9ff";
		ctx.fill()
	}
	

	// 绘制伞骨
	for(var i=0;i<step;i++){
		var rad = ( 2*Math.PI / 360 ) * ( 360/step ) * i;
		var x = r + Math.sin( rad )*r;
		var y = r + Math.cos( rad )*r;
		
		ctx.moveTo(r,r);
		ctx.lineTo(x,y);

		//输出项目名称
		var itemName = $('<div class="text"></div>');
		itemName.text(cfg.data[i][0]);
		if(cfg.order){
			itemName.css('transition','all .5s '+i*.1+'s');
		}		

		component.append(itemName);

		//这里除以2 是因为Retina屏幕
		//+5 是样式微调
		if(x>w/2){
			itemName.css('left',x/2+5);
		}else{
			itemName.css('right',(w-x)/2+5);
		}

		if(y>w/2){
			itemName.css('top',y/2+5);
		}else{
			itemName.css('bottom',(h-y)/2+5);
		}

		if(cfg.data[i][2]){
			itemName.css('color',cfg.data[i][2]);
		}
		itemName.css('opacity',0);
		
	}
	ctx.strokeStyle="#e0e0e0";
	ctx.stroke();

	
	//数据层开发
	//加入一个画布
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;


	var draw = function(per){
		ctx.clearRect(0,0,w,h);
		if(per>=1){
			component.find('.text').css('opacity',1);
		}
		if(per<=0){
			component.find('.text').css('opacity',0);
		}
		ctx.strokeStyle="red";
	  	ctx.lineWidth=3;

	  	//输出数据的折线
	  	for(var i=0;i<step;i++){
			var rad = ( 2*Math.PI / 360 ) * ( 360/step ) * i;
			var rate = cfg.data[i][1]*per;
			var x = r + Math.sin( rad )*r*rate;
			var y = r + Math.cos( rad )*r*rate;
			
			ctx.lineTo(x,y);
	  	}
	  	ctx.closePath(x,y);
		ctx.stroke();

		//输出数据的点
		for(var i=0;i<step;i++){
			var rad = ( 2*Math.PI / 360 ) * ( 360/step ) * i;
			var rate = cfg.data[i][1]*per;
			var x = r + Math.sin( rad )*r*rate;
			var y = r + Math.cos( rad )*r*rate;

			ctx.beginPath();
			ctx.arc(x,y,5,0,2*Math.PI);
			ctx.fillStyle="red";
			ctx.fill();
			ctx.closePath();
	  	}
	}


	//draw(.61);
  component.on('afterLoad',function(){
  	// 雷达图生长
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