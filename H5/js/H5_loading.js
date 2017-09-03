var H5_loading = function(imgs,firstPage){
	var id = this.id;
	if(this.imgs == undefined){//第一次载入
		this.imgs = (imgs || []).length;
		this.loaded = 0;

		//把当前对象存储到全局，用来进行某个图片加载后进行的回调
		window[id] = this;
		for(i in imgs){
			var item = 	imgs[i];
			//JS中new一个图片的方法
			var img = new Image;
			img.onload = function(){
				window[id].loader();
			}
			img.src = item;
		}
		$('#rate').text('0%');
		return this;
	}else{
		this.loaded++;
		$('#rate').text((this.loaded / this.imgs*100) +'%');
		if(this.loaded < this.imgs){			
			return this;
		}
	}
	window[id] = null;



	this.el.fullpage({
		onLeave:function(index,nextIndex,direction){
			$(this).find('.h5_component').trigger('onLeave');
		},
		afterLoad:function(anchorLink,index){
			$(this).find('.h5_component').trigger('afterLoad');
		}
	});
	//首页触发load事件
	this.page[0].find('.h5_component').trigger('afterLoad');
	this.el.show();
	if(firstPage){
		$.fn.fullpage.moveTo(firstPage);
	}
}