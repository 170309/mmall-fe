/**
 * Created by lucifer on 17-8-4.
 */


'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');
var templete = require('./index.string');

var page = {
    init:function () {
        navSide.init({
            name:'user-center'
        });
        this.onLoad();
    },
    onLoad:function () {
        var userhtml = '';
        _user.getUserInfo(function (res) {
           userhtml =  _mm.renderHtml(templete,res);
           $('.panel-body').html(userhtml);
        },function (err) {
            _mm.errorTips(err)
        });
    }
};


$(function () {
   page.init();
});