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
        this.bindEvent();
    },
    bindEvent:function(){
        //因为是动态插入的HTMl所以 不能在一开始就绑定对应的事件方法，
        //所以启用了一个全局的事件监听，来扑捉#save-userinfo的click事件
        $(document).on('click','#save-userinfo',function () {
            var userinfo = {
                username :$.trim($('username').val()),
                phone :$.trim($('phone').val()),
                email :$.trim($('email').val()),
                question :$.trim($('question').val()),
                answer :$.trim($('answer').val())
            };
            var validataResult = this.formValidata(userinfo);
            if(validataResult){
                _mm.updateUserInfo(userinfo,function (res,msg) {
                    _mm.successTips(msg);
                    window.location.href="./user-center.html";
                },function (err) {
                    _mm.errorTips(err)
                })
            }else{
                _mm.errorTips(validataResult.msg);
            }
        })
    },
    onLoad:function () {
        var userhtml = '';
        _user.getUserInfo(function (res) {
            userhtml =  _mm.renderHtml(templete,res);
            $('.panel-body').html(userhtml);
        },function (err) {
            _mm.errorTips(err)
        });
    },
    formValidata: function (formData) {
        var result = {
            status: false,
            msg: ''
        };

        if (!_mm.validata(formData.email, 'email')) {
            result.msg = 'email格式不对';
            return result;
        }

        if (!_mm.validata(formData.phone, 'phone')) {
            result.msg = '电话号码格式不对';
            return result;
        }

        if(formData.question !== formData.answer){
            result.msg = '密码提示问题和答案不能一样';
            return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};


$(function () {
   page.init();
});