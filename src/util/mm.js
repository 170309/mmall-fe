'use strict';

var conf = {
    serverHost: ''
};
var hogan = require('hogan.js');
var _mm = {
    //网络请求
    request: function (param) {
        var _this = this;
        $.ajax({
            type: param.method || 'post',
            url: param.url || '',
            dataType: param.dataType || 'json',
            data: param.data || '',
            success: function (res) {
                if (0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                } else if (10 === res.status) {
                    _this.doLogin();
                } else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //获取URL
    getURL: function (path) {
        return conf.serverHost + path;
    },
    //获取URL内的参数
    getUrlParam: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^|&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    doLogin: function () {
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //渲染HTML模板
    renderHtml: function (htmltemple, data) {
        var templet = hogan.compile(htmltemple),
            result = templet.render(data);
        return result;

    },
    successTips: function (msg) {
        alert(msg || '操作成功');
    },
    errorTips: function (msg) {
        alert('是不是出什么错了');
    },
    //验证输入的字符串是否符合规范，支持非空验证
    validata: function (value, type) {
        var value = $.trim(value);
        if ('require' === type) {
            return !!value;
        }

        if ('username' === type) {
            if (value.length >= 5) {
                return true;
            }
            return false;
        }

        if ('password' === type) {
            if (value.length >= 5) {
                return true;
            }
            return false;
        }

        if ('phone' === type) {
            return /^1\d{10}$/.test(value);
        }

        if ('email' === type) {
            return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value);
        }
    },
    goHome: function () {
        window.location.href = './index.html';
    }
};

module.exports = _mm;
