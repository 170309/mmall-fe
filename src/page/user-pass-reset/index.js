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
    data:{
        username:'',
        question:'',
        token:'',
        password:''
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function () {
        this.onLoadUsername();
    },
    bindEvent: function () {
        var _this = this;
        //点击事件绑定
        $('#submit-username').click(function () {
            var username = $.trim($('#username').val());
            if(username){
                _user.getQuestion(username,function (res) {
                    _this.data.username=username;
                    _this.data.question = res.data;
                    _this.onLoadQuestion();
                },function (err) {
                    formError.show(err);
                })
            }else{
                formError.show('请输入用户名');
            }
        });
        $('#submit-question').click(function () {
            var answer = $.trim($('#answer').val());
            if(answer){
                _user.checkAnswer({
                    username:this.data.username,
                    question:this.data.question,
                    answer:answer
                },function (res) {
                    _this.data.answer=answer;
                    _this.data.token = res.data;
                    _this.onLoadPassword();
                },function (err) {
                    formError.show(err);
                })
            }else{
                formError.show('请输入密码提示问题答案');
            }
        });
        $('#submit-password').click(function () {
            var password = $.trim($('#password').val());
            if(password && password.length >= 5){
                _user.updatePassword({
                    username:this.data.username,
                    forgetToken:this.data.token,
                    passwordNew:password
                },function (res) {
                    window.location.href='./result.html?type=updatepassword'
                },function (err) {
                    formError.show(err);
                })
            }else{
                formError.show('请输入不少于5位新密码');
            }
        });

    },
    onLoadUsername:function () {
        $('.step-username').show();
    },
    onLoadQuestion:function () {
        formError.hide();
        $('.step-username').hide().siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },
    onLoadPassword:function () {
        formError.hide();
        $('.step-question').hide().siblings('.step-password').show();
    }

};

$(function () {
    page.init();
});


