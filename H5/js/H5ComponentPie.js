/*
* 饼图脚本文件
*/
var H5ComponentPie =function(name,cfg){
	var component = new H5ComponentBase(name,cfg);
	var w = cfg.width;
	var h = cfg.height;

	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex',1);
	component.append(cns);


	/*
	* 绘制底图层
	*/
	var r = w/2;
	ctx.beginPath();
	ctx.fillStyle ='#eee';
	ctx.strokeStyle='#eee';
	ctx.lineWidth=1;
	ctx.arc(r,r,r,0,2*Math.PI);
	ctx.fill();

	/*
	* 绘制数据层
	*/
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex',2);
	component.append(cns);

	//备用颜色
	var colors = ['red','green','orange','grey','blue'];
	//设置起始角度为12点钟方向。(圆此时是顺时针绘制)
	var sAngel = 1.5*Math.PI;
	//设置结束角度为0
	var eAngel = 0;
	//100%的圆
	var aAngel = 2*Math.PI;

	var step = cfg.data.length;
	for(var i=0;i<step;i++){
		var item = cfg.data[i];
		var color = item[2] || (item[2] = colors.pop());

		eAngel = sAngel + aAngel*item[1];

		ctx.beginPath();
		ctx.fillStyle =color;
		ctx.strokeStyle=color;
		ctx.lineWidth=1;
		ctx.moveTo(r,r);
		ctx.arc(r,r,r,sAngel,eAngel);
		ctx.fill();

		sAngel = eAngel;

		/*
		* 加入项目文本及百分比
		*/
		var itemName = $('<div class = "text">')
		itemName.text(cfg.data[i][0]);
		component.append(itemName);
		var per = $('<div class = "per">')
		per.text(cfg.data[i][1]*100 + '%');

		var x = r + Math.sin( .5*Math.PI - sAngel ) * r;
		var y = r + Math.cos( .5*Math.PI - sAngel ) * r;

		if(x>w/2){
			itemName.css('left',x/2)
		}else{
			itemName.css('right',(w-x)/2)
		}

		if(y>h/2){
			itemName.css('top',y/2)
		}else{
			itemName.css('bottom',(h-y)/2)
		}
		if(cfg.data[i][2]){
			itemName.css('color',cfg.data[i][2]);
		}
		itemName.css('opacity',0);
		itemName.append(per);
	}

	/*
	* 加入一个蒙版层
	*/
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex',3);
	component.append(cns);

	ctx.beginPath();
	ctx.fillStyle ='#eee';
	ctx.strokeStyle='#eee';
	ctx.lineWidth=1;
	ctx.moveTo(r,r);
	ctx.arc(r,r,r+1,0,2*Math.PI);
	ctx.fill();


	var draw = function(per){
		ctx.clearRect(0,0,w,h);

		ctx.beginPath();
		ctx.moveTo(r,r);

		if(per<=0){
			ctx.arc(r,r,r+1,0,2*Math.PI);
		}else{
			ctx.arc(r,r,r+1,sAngel,sAngel+2*Math.PI*per,true);
		}
		ctx.fill();
		ctx.stroke();

		if(per>=1){
			component.find('.text').css('opacity',1);
		}else if(per<=0){
			component.find('.text').css('opacity',0);
		}

	}

	component.on('afterLoad',function(){
	  	// 饼图生长
	  	var s = 0;
	  	for(i=0;i<100;i++){
	  		setTimeout(function(){
	  			s+=.01;
	  			draw(s);
	  		},i*10+500);
	  	}
	});
    // component.on('onLeave',function(){
	  	// var s = 1;
	  	// for(i=0;i<100;i++){
	  	// 	setTimeout(function(){
	  	// 		s-=.01;
	  	// 		draw(s);
	  	// 	},i*10+500);
	  	// }
    // });

	return component;
}