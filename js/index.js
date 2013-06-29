
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
  var TIMEOUT = 1000 * 60; //1分钟就过期重拉数据
  var news_content = null;
  var preDate = (new Date()).getTime();
  function get(callback) {
    var curDate = (new Date()).getTime();
    if (!news_content || preDate + TIMEOUT < curDate) {
        $.ajax({url :"./server/news.json",
        }).done(function(data) {
                callback(data);
                preDate = curDate;
           });

    } else
    {
        callback(data);
    }
  }
  $('.open').click(function() {
     debugger;
    if ($.attr(this, "id") == "open_news")
    {
        get(function(data) {
          var content = data.news;
          var html = "";
          for (var i = 0, l = content.length; i < l; i ++) {
            html += nano(
	   ['<a target="_blank" href="{questionurl}">',
            '<div class="newitem">',
                '<img src="' + data.newstypeicon + '" style="width: 35px;">',
                '<img src="' + data.headicon + '" style="width: 35px;">',
                '<b>{type}</b>',
                '<span class="details">{date}</span>', 
                '<div><b style="background: #E7F3F9;opacity: 0.3;border-radius: 4px;">问题：</b>{question}</div>',
                '<div><b style="background: #E7F3F9;opacity: 0.3;border-radius: 4px;">回答：</b>{content}</div>',
            '</div>',
	    '</a>'].join(""), content[i]);
            
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
