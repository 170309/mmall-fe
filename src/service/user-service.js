'use strict';

var _mm = require('util/mm.js');

var _user = {
    logout: function (resolve, reject) {
        _mm.request({
            url: _mm.getURL('/user/logout.do'),
            type: 'post',
            success: resolve,
            error: reject
        })

    },
    register: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getURL('/user/logout.do'),
            type: 'post',
            data: userInfo,
            success: resolve,
            error: reject
        })

    },
    checkUsername: function (username, resolve, reject) {
        _mm.request({
            url: _mm.getURL('/user/logout.do'),
            type: 'post',
            data: {
                str: username,
                type:'username'
            },
            success: resolve,
            error: reject
        })

    },
    login: function (userinfo, resolve, reject) {
        _mm.request({
            url: _mm.getURL('/user/login.do'),
            type: 'post',
            data: userinfo,
            success: resolve,
            error: reject

        })

    },
    checkLogin: function (resolve, reject) {
        _mm.request({
            url: _mm.getURL('/user/get_user_info.do'),
            type: 'post',
            success: resolve,
            error: reject
        })
    }
};


module.exports = _user;