'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var templet = require('./index.string');

var navSide = {
    option: {
        name: '',
        sideList: [
            {name: 'user-center', desc: '个人中心', href: 'user-center.html'},
            {name: 'order-list', desc: '我的订单', href: 'order-list.html'},
            {name: 'pass-update', desc: '修改密码', href: 'user-pass-update.html'},
            {name: 'about', desc: '关于MMall', href: 'about.html'}
        ]
    },
    init: function (option) {
        $.extend(this.option, option);
        this.renderSide();
    },
    renderSide: function () {
        for (var i = 0, len = this.option.sideList.length; i < len; i++) {
            if(this.option.sideList[i].name === this.option.name){
                this.option.sideList[i].isActive = true;
            }
        }
        var render = _mm.renderHtml(templet,{
            navList:this.option.sideList
        });

        $('.nav-side').html(render);
    }
};

module.exports = navSide;