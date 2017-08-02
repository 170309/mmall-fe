'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

var nav = {
    init: function () {
        this.bindEvent();
        this.loadUserinfo();
        this.loadCartInfo();
        return this;
    },
    bindEvent: function () {

        //登录事件绑定
        $('.js-login').click(function () {
            _mm.doLogin();
        });
        //注册事件绑定
        $('.js-register').click(function () {
            window.location.href = './register.html';
        });
        //退出事件绑定，请求server清除session
        $('.js-loginout').click(function () {
            _user.logout(
                function (res) {
                    //重新请求
                    window.location.reload();
                },
                function (errMsg) {
                    _mm.errorTips(errMsg);
                })
        });
    },

    //加载用户信息
    loadUserinfo: function () {
        _user.checkLogin(
            function (res) {
                $('.user.not-login').hide().siblings('.user.login').show()
                    .find('username').text(res.username);
            },
            function (errMsg) {
                _mm.errorTips(errMsg);
            })
    },
    //加载购物车信息
    loadCartInfo: function () {
        _cart.getCartCount(
            function (res) {
                $('.nav .cart-cont').text(res || 0);
            },
            function (errMsg) {
                $('.nav .cart-cont').text(0);
            }
        );
    }
};

module.exports = nav.init();