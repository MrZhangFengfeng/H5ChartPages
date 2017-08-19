/*
* 内容管理对象
*/
var H5 = function(){
	this.id=('h5_'+Math.random()).replace('0.','');
	this.el = $('<div class="h5" id="'+this.id+'">').hide();
	this.page=[];
	$('body').append( this.el );


	this.addPage = function(name,text){
		var page = $('<div class="h5_page section">');
		if( name ){
			page.addClass('h5_page_'+name);
		}
		if(text){
			page.text(text);
		}
		this.el.append(page);
		this.page.push(page);
		return this;
	}

	this.addComponent = function(name,cfg){
		var cfg  = cfg || {};
		//如果cfg没有type会自动继承
		cfg = $.extend({
			type:'base'
		},cfg);

		//定义一个变量，存储组件元素
		var component;
		switch(cfg.type){
			case 'base':
				component = new H5ComponentBase(name,cfg);
				break;
			//default;
		}
		var currentPage = this.page.slice(-1)[0];
		currentPage.append(component)
		return this;
	}

	// H5对象初始化呈现
	this.loader=function(){
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
	}

	return this;
}