
'use strict';

var _mm = require('util/mm.js');

var _user = {
    logout:function (resolve,reject) {
        _mm.request({
            url    :_mm.getURL('/user/logout.do'),
            type   :'POST',
            success:resolve,
            error  :reject
        })
        
    },
    checkLogin:function (resolve,reject) {
        _mm.request({
            url    :_mm.getURL('/user/get_user_info.do'),
            type   :'POST',
            success:resolve,
            error  :reject
        })
    }
};


module.exports = _user;