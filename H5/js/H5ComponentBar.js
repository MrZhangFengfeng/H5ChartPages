/*
* 柱状图脚本文件
*/
var H5ComponentBar =function(name,cfg){
  var component = new H5ComponentBase(name,cfg);
  $.each(cfg.data,function(index,item){
    var line = $('<div class="line">');
    var name = $('<div class="name">');
    var rate = $('<div class="rate">');
    var per = $('<div class="per">');

    name.text(item[0]);
    var width = item[1]*100;
    var bgColor;
    if(item[2]){
      //在style里面写的时候不是用驼峰写法！
      bgColor = 'style="background-color:'+item[2]+'"';
    }
    rate.css('width',width);
    rate.html('<div class="bg"'+bgColor+'></div>');
    per.text(item[1]*100+'%');
    line.append(name).append(rate).append(per);
    component.append(line);
  })

  return component;
}