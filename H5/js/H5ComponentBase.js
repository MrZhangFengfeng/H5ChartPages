/*
* 基本图文组件类
*/
var H5ComponentBase = function(name,cfg){
	var cfg = cfg || {};
	var id = ('h5_c_'+Math.random()).replace('0.','');
	var cls = ' h5_component_'+cfg.type;

	var component = $("<div class='h5_component "+cls+" h5_component_name_"+name+"' id="+id+">");
	cfg.text && component.text(cfg.text);
	cfg.width && component.css('width',cfg.width/2);
	cfg.height && component.css('height',cfg.height/2);
	cfg.bg && component.css('backgroundImage','url('+cfg.bg+')');

	cfg.css && component.css(cfg.css);
	if(cfg.center === true){
		component.css({
			marginLeft: (cfg.css.width/2*(-1))+'px',
			left:'50%'
		});
	}
	component.on('afterLoad',function(){
        component.addClass(cls+'_load').removeClass(cls+'_leave');
        cfg.animateIn && component.animate(cfg.animateIn);
        return false;
    });
    component.on('onLeave',function(){
        component.addClass(cls+'_leave').removeClass(cls+'_load');
        cfg.animateOut && component.animate(cfg.animateOut);
        return false;
    });
	
	return component;
}	