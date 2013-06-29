var jsdom = require('jsdom');
var fs = require("fs");
var jquery = fs.readFileSync("./jquery.js").toString();
jsdom.env({
          html: 'http://www.zhihu.com/people/rao-ji',
          src: [jquery],
          done : function(errors, window){
        var a = window.$(".zm-profile-section-item.zm-item.clearfix");
        var self = window.$(".zm-profile-header-img.zg-avatar-big.zm-avatar-editor-preview").attr("src");
        console.log(self);
        //console.log(window.$("#zh-profile-activity-page-list").html());
        }
    });

