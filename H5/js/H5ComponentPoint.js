/*
* 散点图脚本文件
*/
var H5ComponentPoint =function(name,cfg){
	var component = new H5ComponentBase( name , cfg );
	var base = cfg.data[0][1]//以第一个数据的比例大小的100%
	$.each(cfg.data,function(index,item){
		var point = $('<div class="point point_'+index+' ">');

		var name = $('<div class="name">'+item[0]+'</div>');
		var rate = $('<div class="rate">'+(item[1]*100)+'%'+'</div>');
		name.append(rate);
		point.append(name);

		var per = (item[1]/base)*100+'%';

		point.width(per).height(per);
		if(item[2]){
			point.css('backgroundColor',item[2])
		}
		if(item[3] !==null  && item[4] !==null){
			point.css('left',item[3]).css('top',item[4]);
		}

		component.append(point);
	})
	return component;
}