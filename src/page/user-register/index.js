'use strict'
require('./index.css');

require('page/common/layout.css');
require('page/common/nav-simple/index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var formError = {
    show: function (errMsg) {
        $('.error-item').show().find('.error-msg').text(errMsg)
    },
    hide: function (errMsg) {
        $('.error-item').hide().find('.error-msg').text('')
    },
};

var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        $('#username').blur(function () {
            var username = $.trim($(this).val());
            _user.checkUsername(username,function (res) {
                formError.show('用户名:'+username+'可用');
            },function (err) {
                formError.show(err);
            })
        });
        //点击事件绑定
        $('.btn-submit').click(function () {
            _this.submit();
        });
        //回车事件绑定
        $('.user-content').keyup(function (e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        })
    },
    submit: function () {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val()),
            passwordConfim: $.trim($('#password-confim').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val()),
        };
        var validata = this.formValidata(formData);
        if (validata.status) {
            _user.register(formData, function (res) {
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            }, function (errMsg) {
                formError.show(errMsg);
            })
        } else {
            formError.show(validata.msg);
        }

    },

    formValidata: function (formData) {
        var result = {
            status: false,
            msg: ''
        };

        if (!_mm.validata(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }

        if (!_mm.validata(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }

        if (!_mm.validata(formData.username, 'username')) {
            result.msg = '用户名不符合要求，请输入5位以上用户名';
            return result;
        }

        if (!_mm.validata(formData.password, 'password')) {
            result.msg = '用户名不符合要求，请输入5位以上密码';
            return result;
        }

        if (!_mm.validata(formData.email, 'email')) {
            result.msg = 'email格式不对';
            return result;
        }

        if (!_mm.validata(formData.phone, 'phone')) {
            result.msg = '电话号码格式不对';
            return result;
        }

        if(formData.password !== formData.passwordConfim){
            result.msg = '两次输入的密码不一样';
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


