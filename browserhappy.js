/*浏览器版本检测提示升级*/
(function (w) {
    "use strict";
    var n = w.navigator,d = w.document;

    /*内部使用变量*/
    var r = [];
    r.isIE = ("number" == typeof d.documentMode)?d.documentMode:false;
    r.moden = ("WebSocket"in w&&2===w.WebSocket.CLOSING);
    r.url = 'http://browsehappy.osfipin.com/';

    /*默认配置*/
    var c = {
        ie:666,
        debug:false,
        type:'top',
        show:['360','chrome'],
        tip:'\u60a8\u7684\u6d4f\u89c8\u5668\u7248\u672c\u8fc7\u4f4e\u3002\u8bf7\u0020',
        div:''
    };

    r.down = {
        '360':'360\u6d4f\u89c8\u5668',
        'chrome':'\u8c37\u6b4c\u6d4f\u89c8\u5668',
        'firefox':'\u706b\u72d0\u6d4f\u89c8\u5668',
        'ie11':'IE11',
        'opera':'Opera\u6d4f\u89c8\u5668',
        'qq':'QQ\u6d4f\u89c8\u5668'
    };

    /*重定义配置*/
    if( 'object' == typeof w.browsehappy_config)
    {
        for(var z in w.browsehappy_config)
        {
            if("undefined" != typeof c[z])
            {
                c[z] = w.browsehappy_config[z];
            }
        }
    }

    /*是否调试*/
    if(c.debug == false)
    {
        if(c.ie == 666 && r.moden){
            /*ie默认配置*/
            return;
        }

        if( r.isIE == false || c.ie < r.isIE){
            /*ie版本*/
            return;
        }
    }
    
    /*显示内容*/
    r.show = function(back)
    {
        var u = d.createElement("div");
        u.className = "browsehappy";
        u.innerHTML = c.div;
        var f = function() {
            var s = d.getElementsByTagName("body")[0];
            if ("undefined" == typeof(s)) {
                setTimeout(f, 10)
                console.log('null');
            } else {
                s.insertBefore(u, s.firstChild);
                back(u);
            }
        };
        f();
    };

    /*操作*/
    if(c.type == 'top')
    {
        /*默认div*/
        if("" == c.div){
            c.div = '<div style="width:100%;height:100px;font-size:20px;line-height:100px;text-align:center;background-color:#f8efb4;color:#000;margin-bottom:40px;border-bottom:1px solid #eed8a6">'+c.tip+'<a target="_blank" href="'+r.url+'" style="background-color:#47b902;text-decoration: none;padding:2px 12px;background-image:none;border:none;border-radius:4px;color:#fff;">\u7acb\u5373\u5347\u7ea7</a></div>';
        }
        r.show(function(u){
            console.log(u.clientWidth);
        });
    }else if(c.type == 'box'){
        if("" == c.div){
            var t = '';
            if( 'object' == typeof c.show)
            {
                var t = '<div style="text-align:center;line-height:50px;color:#000;font-size:16px;">\u6216\u76f4\u63a5\u4e0b\u8f7d</div><div style="text-align:center;">';
                for (var x in c.show)
                {
                    if(r.down.hasOwnProperty(c.show[x]))
                    {
                        t += '<a target="_blank" href="'+r.url+'down/win/'+c.show[x]+'.html" style="background-color:#1E9FFF;text-decoration: none;padding:2px 4px;background-image:none;border:none;border-radius:4px;color:#fff;">'+r.down[c.show[x]]+'</a> ';
                    }
                }
                t += '</div>';
            }
            c.div = '<div style="font-size:20px;line-height:50px;color:#000;text-align:center;font-weight:bold;">'+c.tip+'</div><div style="text-align:center;"><a target="_blank" href="'+r.url+'" style="background-color:#47b902;text-decoration: none;padding:6px 12px;background-image:none;border:none;border-radius:4px;color:#fff;font-size:20px;">\u7acb\u5373\u5347\u7ea7</a></div>'+t;
        }
        /*需要静止滚动条'overflow','hidden'*/
        c.div = '<div style="text-align:center;z-index:19890612;background-color: #000;opacity:0.7;filter:alpha(opacity=70);top:0;left:0;width:100%;height:100%;position:fixed;_position:absolute;"></div><div style="z-index:19891029;position: fixed;background:#fff;_position:absolute;padding:20px;border-radius:4px;">'+c.div+'</div>';
        r.show(function(u){
            var t = u.children[1];
            /*当前宽高*/
            var wt= w.innerWidth || d.documentElement.clientWidth || d.body.clientWidth;
            var ht= w.innerHeight || d.documentElement.clientHeight || d.body.clientHeight;
            /*定义宽高*/
            t.style.top = (ht - t.clientHeight)/2 +'px';
            t.style.left = (wt - t.clientWidth)/2+'px';

            d.body.style.overflow="hidden";
        });
    }else if(c.type == 'jump'){
        w.location.href = r.url;
    }
})("undefined"!=typeof window?window:this);
