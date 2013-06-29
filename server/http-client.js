var jsdom = require('jsdom');
var fs = require("fs");
var jquery = fs.readFileSync("./jquery.js").toString();
jsdom.env({
          html: 'http://www.zhihu.com/people/rao-ji',
          src: [jquery],
          done : function(errors, _){
            var data = {};
            var newsItems = _.$(".zm-profile-section-item.zm-item.clearfix");
            data.headicon = _.$(".zm-profile-header-img.zg-avatar-big.zm-avatar-editor-preview").attr("src");
            data.newstypeicon = "http://www.zhihu.com/favicon.ico";
            data.news = [];
            _.$.each(newsItems, function(obj)
            {
                var item = {};
                var obj = newsItems[obj];
                item.type = _.$(".zg-clear", obj).html();
                if (item.type) item.type = (item.type.search("赞同") >= 0 ?"赞同了回答" :(item.type.search("回答") >= 0 ? "回答了问题" : "关注了问题" ));
                if (!item.type) item.type = "关注了问题";
                item.date = _.$(".zm-profile-setion-time.zg-gray.zg-right", obj).html();
                item.question = _.$(".question_link", obj).html();
                item.questionurl = _.$(".question_link", obj).attr("href");
                _.$(".toggle-expand", obj).remove();
                _.$("img", obj).remove();
                item.content = _.$(".zh-summary.summary.clearfix", obj).html();
                data.news.push(item);
            });
            console.log(JSON.stringify(data));
            fs.writeFileSync("./news.json", JSON.stringify(data),['utf8'], function(err) {
            });
        
        //console.log(_.$("#zh-profile-activity-page-list").html());
        }
    });

