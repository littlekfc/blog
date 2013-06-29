var jsdom = require('jsdom');

jsdom.env('http://www.zhihu.com/people/rao-ji', ['http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js'], function(errors, window){
        var a = window.$(".zm-profile-section-item.zm-item.clearfix");
        //console.log(window.$("#zh-profile-activity-page-list").html());
    });

