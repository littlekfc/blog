
function nano(template, data) {
  return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
    var keys = key.split("."), v = data[keys.shift()];
    for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
    return (typeof v !== "undefined" && v !== null) ? v : "";
  });
}
$(function() {
  var colors = [['#f4f2d2', 'pale'],
                ['#638TIME9', 'darkgreen'],
                ['#81a677', 'lightgreen']];/** can break here
                ['#f4f2d2', 'pale'],
                ['#f25d50', 'lightred'],
                ['#b83f31', 'darkred']];*/
  var index = 0;
  var TIME = 100;
  var TIMEOUT = 1000 * 60;
  var news_content = null;
  var preDate = (new Date()).getTime();
  function get(callback) {
    var curDate = (new Date()).getTime();
    if (!news_content || preDate + TIMEOUT < curDate) {
        $.ajax({url :"./server/news.json",
        }).done(function(data) {
           
           });
    }
  }
  $('.open').click(function() {
     debugger;
    if ($.attr(this, "id") == "open_news")
    {
        get(function(data) {
          var data = eval(data);  
          var content = data.content;
          var html = "";
          for (var i = 0, l = content.length; i < l; i ++) {
            html += nano(['<div class="project">',
		 	'<img src="http://static.zhihu.com/static/img/sticky_header/logo.png" style="width: 35px;">',
			'<img src="http://p2.zhimg.com/91/ff/91ffa6dbe_l.jpg" style="width: 35px;">',
			'<b>赞同了回答</b>',
			'<div style="float:right">5 天前</div>', 
			'<div>论文的idea被别人偷了怎么办？</div>',
			'<div>小菜鸟你好，欢迎来到真实世界。 idea 即使已经写成文章投了出去，只要杂志还没有接收，随时有人会来抢不客气。这是科研人员血的教训。要是没人抢，恭喜来到冷门领域，你的文章就算侥幸发出来（没错冷门领域杂志也不待见）也可能十年没读者。 再说了，idea 是… </div>',
            '</div'].join(""), content);
            
          }
            $(".news_content").html(html);	
        });
    }
    $('.active').removeClass('active');
    $(this).addClass('active');
    var target = right ? '#rightcontent' : '#leftcontent';
    var other = right ? '#leftcontent' : '#rightcontent';
    var div = $(this).attr('id').split('_').pop();

    (function(target, other) {
      $(other + '> div').stop().animate({ opacity: .15 }, 300, function() {
        $(target + '> div').css({ 'pointer-events': 'auto' });
        $(target + ' > div').stop().animate({ opacity: 1.0 }, 300);
        $(other + '> div').css({ 'pointer-events': 'none' });
      });
    })(target, other);
    (function(index, target) {
      $(target).stop().animate({ opacity: .15 }, 300,
        function() {
          $(target).css({ 'backgroundColor': colors[index][0] });
          $(target + ' > div').hide();
          $(target + ' > .' + div).removeClass("pale darkgreen lightgreen").addClass(colors[index][1]).show(); 
          $(target).stop().animate( { opacity: 1.0}, 300);
        }
      );
    })(index, target);
	
    var midbox = $('#middlebox');
    var midborder = $("#midborder");
    if (right) {
      midbox.stop().animate({ left: '50px', scale:0.9}, TIME, function()
	{
		midborder.removeClass();
		midborder.addClass("shadow_mid_right");
		midbox.stop().animate({left: '0px', scale:0.8}, TIME, function()
			{
				midborder.removeClass();
				midbox.stop().animate({left: "-50px", scale: 0.9}, TIME, function()
					{
						midborder.addClass("shadow_mid_left");
						midbox.stop().animate({left: "-100px", scale: 1}, TIME, function()
							{
								midborder.removeClass();
								midborder.addClass("shadow_left");
							});
					});
			});
	});
      right = false;
    } else {
    midbox.stop().animate({ left: '-50px', scale:0.9}, TIME, function()
      {
	      midborder.removeClass();
	      midborder.addClass("shadow_mid_left");
	      midbox.stop().animate({left: '0px', scale:0.8}, TIME, function()
		      {
			      midborder.removeClass();
			      midbox.stop().animate({left: "50px", scale: 0.9}, TIME, function()
				      {
					      midborder.addClass("shadow_mid_right");
					      midbox.stop().animate({left: "100px", scale: 1}, TIME, function()
						      {
							      midborder.removeClass();
							      midborder.addClass("shadow_right");
						      });
				      });
		      });
      });
      right = true;
    }

    index += 1;
    if (index >= colors.length) {
      index = 0;
    }
  });
});
