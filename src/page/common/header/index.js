'use strict';
require('./index.css');
var _mm = require('util/mm.js');

var header = {

    init: function () {
        this.bindEvent();
        this.onLoad();
    },
    //事件绑定
    bindEvent: function () {
        var _this = this;
        //搜索按钮事件绑定
        $('#search-btn').click(function () {
            _this.searchSubmit();
        });

        $('#search-input').keyup(function (e) {
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });

    },
    //搜索的提交
    searchSubmit: function () {
        var keyword = $.trim($('#search-input').val());
        if (keyword) {
            window.location.href = './list.html?keyword=' + keyword;
        }else{
            //如果提交的时候没有keyword 跳转首页
            _mm.goHome();
        }
    },
    //关键字回填
    onLoad: function () {
        var keyword = _mm.getUrlParam('keyword');
        if (keyword) {
            $('#search-input').val(keyword);
        }
    }
};

header.init();
