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

var page = {
    init:function () {
        navSide.init({
            name:'pass-update'
        });
        this.onLoad();
        this.bindEvent();
    },
    bindEvent:function(){
        //因为是动态插入的HTMl所以 不能在一开始就绑定对应的事件方法，
        //所以启用了一个全局的事件监听，来扑捉#save-userinfo的click事件
        $(document).on('click','#save-userinfo',function () {
            var userinfo = {
                password :$.trim($('#password').val()),
                passwordNew :$.trim($('#password-new').val()),
                passwordConfim :$.trim($('#password-confim').val())
            };
            var validataResult = this.formValidata(userinfo);
            if(validataResult){
                _mm.updateUserInfo({
                    passwordOld:userinfo.password,
                    passwordNew:userinfo.passwordNew
                },function (res,msg) {
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
    formValidata: function (formData) {
        var result = {
            status: false,
            msg: ''
        };

        if (!_mm.validata(formData.passwordOld, 'require')) {
            result.msg = '原密码不能为空';
            return result;
        }

        if (!formData.passwordNew || formData.passwordNew.length >= 5) {
            result.msg = '请输入大于6位的密码';
            return result;
        }

        if (formData.passwordNew !== formData.passwordConfim) {
            result.msg = '两次输入的密码不一致';
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